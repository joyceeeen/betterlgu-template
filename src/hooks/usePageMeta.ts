import { useSiteConfig } from '@/contexts/SiteConfigContext';
import { useEffect } from 'react';

interface PageMetaOptions {
  title?: string;
  description?: string;
}

/**
 * Hook to set page title and meta description dynamically
 */
export function usePageMeta({ title, description }: PageMetaOptions = {}) {
  const { getSiteTitle, getSiteDescription } = useSiteConfig();

  useEffect(() => {
    // Set document title
    const siteTitle = getSiteTitle();
    document.title = title
      ? `${title} | ${siteTitle}`
      : `${siteTitle} | Official Portal`;

    // Set meta description
    const desc = description || getSiteDescription();
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', desc);

    // Cleanup - restore default on unmount
    return () => {
      document.title = `${siteTitle} | Official Portal`;
    };
  }, [title, description, getSiteTitle, getSiteDescription]);
}
