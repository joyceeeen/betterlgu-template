import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSiteConfig } from '@/contexts/SiteConfigContext';
import { usePageMeta } from '@/hooks/usePageMeta';

// Badge color mapping
const badgeColorMap: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-700',
  green: 'bg-green-100 text-green-700',
  yellow: 'bg-yellow-100 text-yellow-700',
  red: 'bg-red-100 text-red-700',
  purple: 'bg-purple-100 text-purple-700',
};

export default function NewsPage() {
  const { t } = useLanguage();
  const { lguName, labels, news } = useSiteConfig();
  usePageMeta({ title: 'News & Announcements' });

  // Map news articles from config with template variable interpolation
  const newsItems = news.articles.map((article) => ({
    id: article.id,
    title: article.title,
    date: article.date,
    badge: article.badge,
    badgeColor: badgeColorMap[article.badgeColor] || badgeColorMap.blue,
    description: article.description
      .replace(/\{\{deptPrefix\}\}/g, labels.deptPrefix)
      .replace(/\{\{lguName\}\}/g, lguName),
    slug: article.slug,
  }));

  return (
    <>
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4">
        <nav className="py-4 text-sm text-gray-500" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-primary-600">
            {t('nav-home')}
          </Link>
          <span className="mx-2">/</span>
          <span aria-current="page" className="text-gray-900">
            News &amp; Announcements
          </span>
        </nav>
      </div>

      {/* Page Header */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              <i className="bi bi-newspaper" /> News
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              News &amp; Announcements
            </h1>
            <p className="text-lg text-white/90">
              Stay updated with the latest news and announcements from the{' '}
              {labels.lguTypeLabel} of {lguName}
            </p>
          </div>
        </div>
      </section>

      {/* News List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-6">
            {newsItems.map((item) => (
              <article
                key={item.id}
                className="bg-white border border-gray-200 rounded-xl p-6 transition-all duration-200 hover:border-primary-500 hover:shadow-lg"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                  <span className="text-gray-400 text-sm flex items-center gap-1">
                    <i className="bi bi-calendar3" /> {item.date}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {item.description}
                </p>
                <Link
                  to={`/news/${item.slug}`}
                  className="text-primary-600 font-medium flex items-center gap-1 hover:gap-2 transition-all"
                >
                  Read More <i className="bi bi-arrow-right" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
