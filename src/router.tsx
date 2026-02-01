import { Suspense, lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';

// Lazy load all pages for code splitting
const HomePage = lazy(() => import('@/pages/HomePage'));
const ServicesPage = lazy(() => import('@/pages/ServicesPage'));
const ServiceCategoryPage = lazy(() => import('@/pages/ServiceCategoryPage'));
const ServiceDetailPage = lazy(() => import('@/pages/ServiceDetailPage'));
const GovernmentPage = lazy(() => import('@/pages/GovernmentPage'));
const StatisticsPage = lazy(() => import('@/pages/StatisticsPage'));
const LegislativePage = lazy(() => import('@/pages/LegislativePage'));
const OrdinanceFrameworkPage = lazy(
  () => import('@/pages/OrdinanceFrameworkPage'),
);
const ResolutionFrameworkPage = lazy(
  () => import('@/pages/ResolutionFrameworkPage'),
);
const BudgetPage = lazy(() => import('@/pages/BudgetPage'));
const TourismPage = lazy(() => import('@/pages/TourismPage'));
const NewsPage = lazy(() => import('@/pages/NewsPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const FAQPage = lazy(() => import('@/pages/FAQPage'));
const AccessibilityPage = lazy(() => import('@/pages/AccessibilityPage'));
const PrivacyPage = lazy(() => import('@/pages/PrivacyPage'));
const TermsPage = lazy(() => import('@/pages/TermsPage'));
const SitemapPage = lazy(() => import('@/pages/SitemapPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

// Loading component
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto" />
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

// Wrap page with Suspense
function withSuspense(Component: React.ComponentType) {
  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: withSuspense(HomePage) },
      { path: 'services', element: withSuspense(ServicesPage) },
      {
        path: 'services/:category',
        element: withSuspense(ServiceCategoryPage),
      },
      {
        path: 'service-details/:slug',
        element: withSuspense(ServiceDetailPage),
      },
      { path: 'government', element: withSuspense(GovernmentPage) },
      { path: 'statistics', element: withSuspense(StatisticsPage) },
      { path: 'legislative', element: withSuspense(LegislativePage) },
      {
        path: 'legislative/ordinance-framework',
        element: withSuspense(OrdinanceFrameworkPage),
      },
      {
        path: 'legislative/resolution-framework',
        element: withSuspense(ResolutionFrameworkPage),
      },
      { path: 'budget', element: withSuspense(BudgetPage) },
      { path: 'tourism', element: withSuspense(TourismPage) },
      { path: 'news', element: withSuspense(NewsPage) },
      { path: 'contact', element: withSuspense(ContactPage) },
      { path: 'faq', element: withSuspense(FAQPage) },
      { path: 'accessibility', element: withSuspense(AccessibilityPage) },
      { path: 'privacy', element: withSuspense(PrivacyPage) },
      { path: 'terms', element: withSuspense(TermsPage) },
      { path: 'sitemap-page', element: withSuspense(SitemapPage) },
      { path: '*', element: withSuspense(NotFoundPage) },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
