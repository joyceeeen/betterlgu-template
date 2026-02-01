import { useClickOutside } from '@/hooks/useClickOutside';
import { highlightMatch, useSearch } from '@/hooks/useSearch';
import { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface SearchAutocompleteProps {
  placeholder?: string;
  className?: string;
  onResultClick?: () => void;
  initialQuery?: string;
}

const CATEGORIES = [
  { id: '', label: 'All' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'business', label: 'Business' },
  { id: 'social-services', label: 'Social' },
  { id: 'health', label: 'Health' },
  { id: 'tax-payments', label: 'Taxation' },
] as const;

export default function SearchAutocomplete({
  placeholder = 'Search services (e.g., birth certificate, business permit)',
  className = '',
  onResultClick,
  initialQuery = '',
}: SearchAutocompleteProps): JSX.Element {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    query,
    setQuery,
    category,
    setCategory,
    results,
    suggestions,
    isOpen,
    setIsOpen,
    selectedIndex,
    handleKeyDown,
    handleSuggestionClick,
    clearRecentSearches,
    addRecentSearch,
    pendingNavigation,
    clearPendingNavigation,
  } = useSearch(initialQuery);

  const closeDropdown = useCallback(() => setIsOpen(false), [setIsOpen]);
  useClickOutside([inputRef, dropdownRef], closeDropdown);

  // Handle pending navigation from keyboard events
  useEffect(() => {
    if (pendingNavigation) {
      setIsOpen(false);
      onResultClick?.();
      navigate(
        pendingNavigation.startsWith('/')
          ? pendingNavigation
          : `/${pendingNavigation}`,
      );
      clearPendingNavigation();
    }
  }, [pendingNavigation, navigate, setIsOpen, onResultClick, clearPendingNavigation]);

  function handleResultClick(url: string): void {
    addRecentSearch(query);
    setIsOpen(false);
    onResultClick?.();
    navigate(url.startsWith('/') ? url : `/${url}`);
  }

  const showDropdown =
    isOpen &&
    (results.length > 0 ||
      suggestions.suggestions.length > 0 ||
      suggestions.recent.length > 0 ||
      suggestions.popular.length > 0);

  return (
    <div className={`relative w-full flex-1 ${className}`}>
      <input
        ref={inputRef}
        type="search"
        className="w-full px-5 py-4 pl-12 border-2 border-transparent rounded-full text-base bg-white shadow-lg transition-all duration-200 focus:outline-none focus:border-blue-700 focus:shadow-xl placeholder:text-gray-400"
        placeholder={placeholder}
        aria-label="Search services"
        autoComplete="off"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
      />

      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 bg-white border border-blue-100 rounded-2xl shadow-2xl max-h-[480px] overflow-y-auto z-50 mt-2 animate-in fade-in slide-in-from-top-2 duration-200"
          aria-label="Search suggestions"
        >
          {/* Category Filter Tabs */}
          <CategoryTabs
            categories={CATEGORIES}
            selected={category}
            onSelect={setCategory}
          />

          {/* Recent Searches */}
          {query.length < 2 && suggestions.recent.length > 0 && (
            <SuggestionSection
              title="Recent Searches"
              icon="bi-clock-history"
              items={suggestions.recent}
              baseIndex={0}
              selectedIndex={selectedIndex}
              onItemClick={handleSuggestionClick}
              itemIcon="bi-arrow-counterclockwise"
              onClear={() => {
                clearRecentSearches();
                setIsOpen(false);
              }}
            />
          )}

          {/* Popular Searches */}
          {query.length < 2 && suggestions.popular.length > 0 && (
            <SuggestionSection
              title="Popular Searches"
              icon="bi-fire"
              items={suggestions.popular}
              baseIndex={suggestions.recent.length}
              selectedIndex={selectedIndex}
              onItemClick={handleSuggestionClick}
              itemIcon="bi-search"
            />
          )}

          {/* Autocomplete Suggestions */}
          {query.length >= 2 &&
            suggestions.suggestions.length > 0 &&
            results.length === 0 && (
              <SuggestionSection
                title="Did you mean?"
                icon="bi-lightbulb"
                items={suggestions.suggestions.slice(0, 5)}
                baseIndex={0}
                selectedIndex={selectedIndex}
                onItemClick={handleSuggestionClick}
                itemIcon="bi-search"
              />
            )}

          {/* No Results */}
          {query.length >= 2 &&
            results.length === 0 &&
            suggestions.suggestions.length === 0 && (
              <div className="py-8 px-6 text-center text-gray-500">
                <i className="bi bi-search text-4xl text-blue-200 mb-3 block" />
                <p className="m-0 mb-1.5 font-semibold text-gray-700">
                  No services found
                </p>
                <small className="text-gray-400 text-sm">
                  Try different keywords or check spelling
                </small>
              </div>
            )}

          {/* Search Results */}
          {results.map((result, index) => (
            <SearchResultItem
              key={result.id}
              result={result}
              query={query}
              isSelected={selectedIndex === index}
              onClick={() => handleResultClick(result.url)}
            />
          ))}

          {/* Footer */}
          {results.length > 0 && <SearchFooter count={results.length} />}
        </div>
      )}
    </div>
  );
}

// Sub-components for better organization

interface CategoryTabsProps {
  categories: readonly { id: string; label: string }[];
  selected: string;
  onSelect: (id: string) => void;
}

function CategoryTabs({
  categories,
  selected,
  onSelect,
}: CategoryTabsProps): JSX.Element {
  return (
    <div className="flex gap-1.5 px-3 py-3 pb-2.5 border-b border-blue-50 flex-nowrap justify-start bg-linear-to-b from-gray-50 to-white rounded-t-2xl overflow-x-auto">
      {categories.map((cat) => (
        <button
          key={cat.id}
          type="button"
          onClick={() => onSelect(cat.id)}
          className={`px-3 py-1.5 border-2 rounded-full text-xs font-medium cursor-pointer whitespace-nowrap flex-shrink-0 transition-all ${
            selected === cat.id
              ? 'border-blue-700 bg-blue-700 text-white shadow-md'
              : 'border-blue-200 bg-white text-gray-600 hover:border-blue-700 hover:text-blue-700 hover:bg-blue-50'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}

interface SuggestionSectionProps {
  title: string;
  icon: string;
  items: string[];
  baseIndex: number;
  selectedIndex: number;
  onItemClick: (item: string) => void;
  itemIcon: string;
  onClear?: () => void;
}

function SuggestionSection({
  title,
  icon,
  items,
  baseIndex,
  selectedIndex,
  onItemClick,
  itemIcon,
  onClear,
}: SuggestionSectionProps): JSX.Element {
  return (
    <div className="border-b border-blue-50 last:border-b-0">
      <div className="flex justify-between items-center px-4 pt-3 pb-2 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
        <span className="flex items-center gap-1.5">
          <i className={`bi ${icon} text-blue-700`} />
          {title}
        </span>
        {onClear && (
          <button
            className="bg-transparent border-none text-blue-700 text-[11px] font-medium cursor-pointer px-2 py-1 rounded hover:bg-blue-50 transition-colors"
            type="button"
            onClick={onClear}
          >
            Clear
          </button>
        )}
      </div>
      {items.map((item, idx) => (
        <button
          key={`${title}-${item}`}
          className={`flex items-center w-full py-3 px-4 text-sm text-gray-700 text-left border-none bg-transparent border-l-[3px] border-l-transparent cursor-pointer transition-all hover:bg-linear-to-r hover:from-blue-50 hover:to-transparent hover:border-l-blue-700 hover:text-blue-700 ${
            selectedIndex === baseIndex + idx
              ? 'bg-linear-to-r from-blue-50 to-transparent border-l-blue-700 text-blue-700'
              : ''
          }`}
          onClick={() => onItemClick(item)}
          type="button"
        >
          <i className={`bi ${itemIcon} text-gray-400 mr-2.5 text-sm`} />
          {item}
        </button>
      ))}
    </div>
  );
}

interface SearchResultItemProps {
  result: {
    id: string;
    title: string;
    category: string;
    fee?: string;
    processingTime?: string;
    office?: string;
    description?: string;
  };
  query: string;
  isSelected: boolean;
  onClick: () => void;
}

function SearchResultItem({
  result,
  query,
  isSelected,
  onClick,
}: SearchResultItemProps): JSX.Element {
  const isFast = result.processingTime?.toLowerCase().includes('same day');
  // highlightMatch returns sanitized HTML with only <mark> tags for highlighting
  const highlightedTitle = highlightMatch(result.title, query);

  return (
    <button
      className={`block w-full py-3.5 px-4 text-gray-900 border-b border-blue-50 last:border-b-0 text-left border-l-[3px] border-l-transparent bg-transparent cursor-pointer transition-all hover:bg-linear-to-r hover:from-blue-50 hover:to-transparent hover:border-l-blue-700 ${
        isSelected
          ? 'bg-linear-to-r from-blue-50 to-transparent border-l-blue-700'
          : ''
      }`}
      onClick={onClick}
      type="button"
    >
      <div className="font-semibold text-blue-700 mb-1.5 text-[15px] flex items-center gap-2">
        <span
          // biome-ignore lint/security/noDangerouslySetInnerHtml: highlightMatch only inserts <mark> tags for search highlighting
          dangerouslySetInnerHTML={{ __html: highlightedTitle }}
        />
        {isFast && (
          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-600 uppercase tracking-wide">
            Fast
          </span>
        )}
      </div>
      <div className="flex flex-wrap gap-3 text-xs mb-1.5">
        <span className="inline-flex items-center gap-1 text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
          <i className="bi bi-folder text-[11px] opacity-80" />
          {result.category}
        </span>
        {result.fee && (
          <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
            <i className="bi bi-cash text-[11px] opacity-80" />
            {result.fee}
          </span>
        )}
        {result.processingTime && (
          <span className="inline-flex items-center gap-1 text-blue-600">
            <i className="bi bi-clock text-[11px] opacity-80" />
            {result.processingTime}
          </span>
        )}
      </div>
      {result.office && (
        <div className="text-xs text-gray-500 mb-1 flex items-center">
          <i className="bi bi-building mr-1.5 text-[11px] text-blue-700" />
          {result.office}
        </div>
      )}
      {result.description && (
        <div className="text-sm text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis leading-relaxed">
          {result.description}
        </div>
      )}
    </button>
  );
}

interface SearchFooterProps {
  count: number;
}

function SearchFooter({ count }: SearchFooterProps): JSX.Element {
  return (
    <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 border-t border-blue-50 text-xs text-gray-400 rounded-b-2xl">
      <span className="font-medium">
        {count} service{count !== 1 ? 's' : ''} found
      </span>
      <span className="hidden sm:flex items-center gap-4">
        <KeyboardHint keys={['up', 'down']} label="Navigate" />
        <KeyboardHint keys={['Enter']} label="Select" />
        <KeyboardHint keys={['Esc']} label="Close" />
      </span>
    </div>
  );
}

interface KeyboardHintProps {
  keys: string[];
  label: string;
}

function KeyboardHint({ keys, label }: KeyboardHintProps): JSX.Element {
  return (
    <span className="flex items-center gap-1">
      {keys.map((key) => (
        <kbd
          key={key}
          className="inline-flex items-center justify-center min-w-[20px] h-5 px-1 bg-white border border-gray-300 rounded text-[10px] font-semibold text-gray-600 shadow-sm"
        >
          {key}
        </kbd>
      ))}
      <span className="ml-1">{label}</span>
    </span>
  );
}
