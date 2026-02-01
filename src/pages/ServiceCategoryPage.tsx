import Breadcrumbs from '@/components/Breadcrumbs';
import ServicePageHeader from '@/components/ServicePageHeader';
import { getCategoryContent } from '@/data/categoriesContent';
import { usePageMeta } from '@/hooks/usePageMeta';
import { Link, Navigate, useParams } from 'react-router-dom';

export default function ServiceCategoryPage() {
  const { category } = useParams<{ category: string }>();
  const categoryContent = getCategoryContent(category || '');

  usePageMeta({
    title: categoryContent?.name || 'Service Category',
    description: categoryContent?.description,
  });

  if (!categoryContent) {
    return <Navigate to="/services" replace />;
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Services', href: '/services' },
          { label: categoryContent.name },
        ]}
      />

      <ServicePageHeader
        badgeIcon={categoryContent.icon}
        badgeText={categoryContent.badgeText}
        title={categoryContent.name}
        description={categoryContent.description}
      />

      {/* Services Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryContent.services.map((service) => {
              const CardContent = (
                <>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <i className={`bi ${service.icon} text-primary-600`} />{' '}
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {service.description}
                  </p>
                  <div className="flex gap-4 text-sm text-gray-600">
                    <span>
                      <strong>Fee:</strong> {service.fee}
                    </span>
                    <span>
                      <strong>Time:</strong> {service.time}
                    </span>
                  </div>
                </>
              );

              if (service.link) {
                return (
                  <Link
                    key={service.id}
                    to={service.link}
                    className="block p-6 bg-white border border-gray-200 rounded-xl no-underline transition-all duration-200 hover:border-primary-500 hover:shadow-lg"
                  >
                    {CardContent}
                  </Link>
                );
              }

              return (
                <div
                  key={service.id}
                  className="p-6 bg-white border border-gray-200 rounded-xl"
                >
                  {CardContent}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Responsible Offices */}
      {categoryContent.offices.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Responsible Offices
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryContent.offices.map((office) => (
                <Link
                  key={office.title}
                  to={office.link}
                  className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl no-underline transition-all duration-200 hover:border-primary-500 hover:shadow-md"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-primary-50 rounded-xl text-primary-600 text-xl shrink-0">
                    <i className={`bi ${office.icon}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900">
                      {office.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {office.description}
                    </p>
                  </div>
                  <i className="bi bi-arrow-right text-gray-400" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
