import { getServicesConfig } from '@/lib/config';
import Fuse, { type IFuseOptions } from 'fuse.js';
import { useCallback, useEffect, useMemo, useState } from 'react';

interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  categoryId?: string;
  keywords: string[];
  office?: string;
  fee?: string;
  processingTime?: string;
  url: string;
}

interface SearchResult extends Service {
  score: number;
  _query: string;
}

interface SearchSuggestions {
  popular: string[];
  recent: string[];
  suggestions: string[];
}

const RECENT_SEARCHES_KEY = 'betterlgu_recent_searches';
const MAX_RECENT_SEARCHES = 10;

const CURATED_POPULAR = [
  'birth certificate',
  'business permit',
  'cedula',
  'real property tax',
  'senior citizen id',
  'pwd id',
  'barangay clearance',
  'building permit',
  'marriage certificate',
  'death certificate',
  'tricycle franchise',
  'property declaration',
  'online payment',
  'mswdo',
  'slaughterhouse',
];

// Fuse.js configuration for fuzzy search
const FUSE_OPTIONS: IFuseOptions<Service> = {
  keys: [
    { name: 'title', weight: 0.4 },
    { name: 'keywords', weight: 0.3 },
    { name: 'category', weight: 0.1 },
    { name: 'description', weight: 0.1 },
    { name: 'office', weight: 0.1 },
  ],
  threshold: 0.4,
  includeScore: true,
  ignoreLocation: true,
  minMatchCharLength: 2,
};

function getRecentSearches(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveRecentSearch(query: string): void {
  if (typeof window === 'undefined' || !query || query.length < 2) return;

  try {
    let recent = getRecentSearches();
    recent = recent.filter((q) => q.toLowerCase() !== query.toLowerCase());
    recent.unshift(query);
    recent = recent.slice(0, MAX_RECENT_SEARCHES);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(recent));
  } catch {
    // localStorage not available
  }
}

function clearStoredRecentSearches(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  } catch {
    // localStorage not available
  }
}

export function useSearch(initialQuery = '') {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<SearchSuggestions>({
    popular: [],
    recent: [],
    suggestions: [],
  });
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(
    null,
  );

  const services = useMemo(() => getServicesConfig().services as Service[], []);

  // Create Fuse instance for fuzzy search
  const fuse = useMemo(() => new Fuse(services, FUSE_OPTIONS), [services]);

  // Create Fuse instance for suggestion matching
  const suggestionFuse = useMemo(
    () =>
      new Fuse(
        [...services.map((s) => s.title), ...CURATED_POPULAR].map((text) => ({
          text,
        })),
        { keys: ['text'], threshold: 0.4, includeScore: true },
      ),
    [services],
  );

  const search = useCallback(
    (searchQuery: string, categoryFilter?: string): SearchResult[] => {
      if (!searchQuery || searchQuery.length < 2) {
        setResults([]);
        return [];
      }

      let fuseResults = fuse.search(searchQuery);

      // Apply category filter
      if (categoryFilter) {
        fuseResults = fuseResults.filter((result) => {
          const service = result.item;
          return (
            service.categoryId === categoryFilter ||
            service.category.toLowerCase().includes(categoryFilter.toLowerCase())
          );
        });
      }

      const searchResults: SearchResult[] = fuseResults
        .slice(0, 10)
        .map((result) => ({
          ...result.item,
          score: 1 - (result.score ?? 0), // Convert Fuse score (0 = perfect) to higher-is-better
          _query: searchQuery,
        }));

      setResults(searchResults);
      return searchResults;
    },
    [fuse],
  );

  const getSuggestions = useCallback(
    (searchQuery: string): SearchSuggestions => {
      if (!searchQuery || searchQuery.length < 1) {
        return {
          popular: CURATED_POPULAR.slice(0, 4),
          recent: getRecentSearches().slice(0, 3),
          suggestions: [],
        };
      }

      const fuseResults = suggestionFuse.search(searchQuery);
      const uniqueSuggestions = [
        ...new Set(fuseResults.slice(0, 8).map((r) => r.item.text)),
      ];

      return {
        popular: [],
        recent: [],
        suggestions: uniqueSuggestions,
      };
    },
    [suggestionFuse],
  );

  // Update suggestions when query changes
  useEffect(() => {
    setSuggestions(getSuggestions(query));
  }, [query, getSuggestions]);

  // Trigger initial search if mounted with a query (mount-only effect)
  // biome-ignore lint/correctness/useExhaustiveDependencies: Intentionally runs only on mount
  useEffect(() => {
    if (initialQuery && initialQuery.length >= 2) {
      search(initialQuery, category);
      setIsOpen(true);
    }
  }, []);

  const handleQueryChange = useCallback(
    (newQuery: string) => {
      setQuery(newQuery);
      setSelectedIndex(-1);

      if (newQuery.length >= 2) {
        search(newQuery, category);
      } else {
        setResults([]);
      }
    },
    [search, category],
  );

  const handleCategoryChange = useCallback(
    (newCategory: string) => {
      setCategory(newCategory);
      setSelectedIndex(-1);

      if (query.length >= 2) {
        search(query, newCategory);
      }
    },
    [search, query],
  );

  const handleSubmit = useCallback(
    (searchQuery?: string) => {
      const q = searchQuery || query;
      if (q.length >= 2) {
        saveRecentSearch(q);
        search(q);
      }
    },
    [query, search],
  );

  const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      setQuery(suggestion);
      search(suggestion);
      saveRecentSearch(suggestion);
    },
    [search],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent): string | null => {
      const totalItems =
        results.length +
        suggestions.suggestions.length +
        suggestions.recent.length +
        suggestions.popular.length;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => Math.min(prev + 1, totalItems - 1));
          break;

        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, -1));
          break;

        case 'Enter': {
          const hasSelection = selectedIndex >= 0;
          const targetIndex = hasSelection ? selectedIndex : 0;

          if (results.length > 0 && targetIndex < results.length) {
            e.preventDefault();
            saveRecentSearch(query);
            const url = results[targetIndex].url;
            setPendingNavigation(url);
            return url;
          }
          break;
        }

        case 'Escape':
          setIsOpen(false);
          setSelectedIndex(-1);
          break;
      }

      return null;
    },
    [results, suggestions, selectedIndex, query],
  );

  const clearPendingNavigation = useCallback(() => {
    setPendingNavigation(null);
  }, []);

  const clearRecentSearches = useCallback(() => {
    clearStoredRecentSearches();
    setSuggestions((prev) => ({ ...prev, recent: [] }));
  }, []);

  const addRecentSearch = useCallback((q: string) => {
    saveRecentSearch(q);
  }, []);

  return {
    query,
    setQuery: handleQueryChange,
    category,
    setCategory: handleCategoryChange,
    results,
    suggestions,
    isOpen,
    setIsOpen,
    selectedIndex,
    setSelectedIndex,
    search,
    handleSubmit,
    handleSuggestionClick,
    handleKeyDown,
    clearRecentSearches,
    addRecentSearch,
    pendingNavigation,
    clearPendingNavigation,
  };
}

// Highlight matching text using Fuse.js-compatible approach
export function highlightMatch(text: string, query: string): string {
  if (!query || query.length < 2) return text;

  const terms = query
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length >= 2);

  let result = text;
  for (const term of terms) {
    const regex = new RegExp(
      `(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
      'gi',
    );
    result = result.replace(regex, '<mark>$1</mark>');
  }

  return result;
}
