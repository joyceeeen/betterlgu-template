import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSiteConfig } from '@/contexts/SiteConfigContext';
import { usePageMeta } from '@/hooks/usePageMeta';

// Helper to interpolate template variables in FAQ content
function interpolateFAQContent(
  content: string,
  vars: Record<string, string>,
): string {
  return Object.entries(vars).reduce(
    (text, [key, value]) => text.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value),
    content,
  );
}

export default function FAQPage() {
  const { t } = useLanguage();
  const { lguName, getSiteTitle, getVolunteerEmail, getHallName, faq } =
    useSiteConfig();
  const siteTitle = getSiteTitle();
  const volunteerEmail = getVolunteerEmail();
  const hallName = getHallName();
  usePageMeta({ title: 'FAQ' });

  // Template variables for interpolation
  const templateVars: Record<string, string> = {
    hallName,
    lguName,
    siteTitle,
    volunteerEmail,
  };

  // Map FAQ categories from config with template variable interpolation
  const faqCategories = faq.categories.map((category) => ({
    id: category.id,
    icon: category.icon,
    title: t(category.titleKey) || category.titleFallback,
    items: category.items.map((item) => ({
      id: item.id,
      q: interpolateFAQContent(item.question, templateVars),
      a: interpolateFAQContent(item.answer, templateVars),
    })),
  }));

  return (
    <>
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4">
        <nav className="py-4 text-sm text-gray-500" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-primary-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span aria-current="page" className="text-gray-900">
            FAQ
          </span>
        </nav>
      </div>

      {/* Page Header */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              <i className="bi bi-question-circle-fill" /> FAQ
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('faq-title') || 'Frequently Asked Questions'}
            </h1>
            <p className="text-lg text-white/90">
              {t('faq-subtitle') ||
                'Find answers to common questions about municipal services'}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-8">
            {faqCategories.map((category) => (
              <div
                key={category.id}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden"
              >
                <div className="flex items-center gap-3 p-6 border-b border-gray-200 bg-gray-50">
                  <i
                    className={`bi ${category.icon} text-2xl text-primary-600`}
                  />
                  <h2 className="text-xl font-bold text-gray-900 m-0">
                    {category.title}
                  </h2>
                </div>
                <div className="divide-y divide-gray-100">
                  {category.items.map((item) => (
                    <details key={item.id} className="group">
                      <summary className="flex items-center justify-between cursor-pointer p-6 text-left font-medium text-gray-900 hover:bg-gray-50 transition-colors">
                        <span>{item.q}</span>
                        <i className="bi bi-chevron-down text-gray-400 transition-transform group-open:rotate-180" />
                      </summary>
                      <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                        <div
                          // biome-ignore lint/security/noDangerouslySetInnerHtml: FAQ answers contain safe HTML links
                          dangerouslySetInnerHTML={{ __html: item.a }}
                        />
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}

            {/* Still Have Questions */}
            <div className="bg-primary-50 border border-primary-200 rounded-2xl p-8 text-center">
              <i className="bi bi-chat-dots-fill text-4xl text-primary-600 mb-4 block" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t('faq-still-questions') || 'Still have questions?'}
              </h3>
              <p className="text-gray-600 mb-6">
                {t('faq-contact-help') ||
                  "If you didn't find the answer you were looking for, please don't hesitate to contact us."}
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:bg-primary-700"
              >
                Contact Us <i className="bi bi-arrow-right" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
