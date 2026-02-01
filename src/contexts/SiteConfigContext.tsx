import {
  configHelpers,
  getBudgetConfig,
  getFAQConfig,
  getFullLocation,
  getHistoryConfig,
  getHotlinesConfig,
  getLGUName,
  getLGUTypeLabels,
  getLegislativeConfig,
  getNewsConfig,
  getOfficialsConfig,
  getSiteConfig,
  getStatisticsConfig,
  getStatisticsDetailedConfig,
  getSubdivisionsConfig,
  getTourismConfig,
} from '@/lib/config';
import type {
  BudgetConfig,
  FAQConfig,
  HistoryConfig,
  HotlinesConfig,
  LGUType,
  LGUTypeLabels,
  LegislativeConfig,
  NewsConfig,
  OfficialsConfig,
  SiteConfig,
  StatisticsConfig,
  StatisticsDetailedConfig,
  SubdivisionsConfig,
  TourismConfig,
} from '@/types/config';
import { type ReactNode, createContext, useContext, useMemo } from 'react';

interface SiteConfigContextType {
  // Raw configs
  site: SiteConfig;
  officials: OfficialsConfig;
  subdivisions: SubdivisionsConfig;
  hotlines: HotlinesConfig;
  history: HistoryConfig;
  statistics: StatisticsConfig;
  statisticsDetailed: StatisticsDetailedConfig;
  news: NewsConfig;
  faq: FAQConfig;
  budget: BudgetConfig;
  legislative: LegislativeConfig;
  tourism: TourismConfig;

  // Derived values
  lguType: LGUType;
  lguName: string;
  fullLocation: string;
  labels: LGUTypeLabels;

  // Utility functions
  getSiteTitle: () => string;
  getFullSiteTitle: (_pageTitle?: string) => string;
  getSiteDescription: () => string;
  getVolunteerEmail: () => string;
  getOpenGraphUrl: () => string;
  getMapEmbedUrl: () => string;
  formatPhoneLink: (_phone: string) => string;
}

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(
  undefined,
);

export function SiteConfigProvider({ children }: { children: ReactNode }) {
  const contextValue = useMemo(() => {
    const site = getSiteConfig();
    const officials = getOfficialsConfig();
    const subdivisions = getSubdivisionsConfig();
    const hotlines = getHotlinesConfig();
    const history = getHistoryConfig();
    const statistics = getStatisticsConfig();
    const statisticsDetailed = getStatisticsDetailedConfig();
    const news = getNewsConfig();
    const faq = getFAQConfig();
    const budget = getBudgetConfig();
    const legislative = getLegislativeConfig();
    const tourism = getTourismConfig();
    const labels = getLGUTypeLabels(site.lguType);
    const lguName = getLGUName(site);
    const fullLocation = getFullLocation(site);

    return {
      // Raw configs
      site,
      officials,
      subdivisions,
      hotlines,
      history,
      statistics,
      statisticsDetailed,
      news,
      faq,
      budget,
      legislative,
      tourism,

      // Derived values
      lguType: site.lguType,
      lguName,
      fullLocation,
      labels,

      // Utility functions
      getSiteTitle: () => configHelpers.getSiteTitle(site),
      getFullSiteTitle: (pageTitle?: string) =>
        configHelpers.getFullSiteTitle(site, pageTitle),
      getSiteDescription: () => configHelpers.getSiteDescription(site),
      getVolunteerEmail: () => configHelpers.getVolunteerEmail(site),
      getOpenGraphUrl: () => configHelpers.getOpenGraphUrl(site),
      getMapEmbedUrl: () => configHelpers.getMapEmbedUrl(site),
      formatPhoneLink: configHelpers.formatPhoneLink,
    };
  }, []);

  return (
    <SiteConfigContext.Provider value={contextValue}>
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig() {
  const context = useContext(SiteConfigContext);
  if (context === undefined) {
    throw new Error('useSiteConfig must be used within a SiteConfigProvider');
  }
  return context;
}

// Export a hook for getting just the labels
export function useLGULabels() {
  const { labels } = useSiteConfig();
  return labels;
}

// Export a hook for getting just the site config
export function useSite() {
  const { site } = useSiteConfig();
  return site;
}

// Export a hook for getting the LGU name and type
export function useLGU() {
  const { lguName, lguType, fullLocation, labels } = useSiteConfig();
  return { lguName, lguType, fullLocation, lguTypeLabel: labels.lguTypeLabel };
}
