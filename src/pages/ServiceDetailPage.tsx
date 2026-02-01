import { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { getServiceDetail } from '@/data/serviceDetailsContent';
import { usePageMeta } from '@/hooks/usePageMeta';

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = getServiceDetail(slug || '');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  usePageMeta({
    title: service?.title || 'Service Details',
    description: service?.description,
  });

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  return (
    <>
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4">
        <nav className="py-4 text-sm text-gray-500" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-primary-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to="/services" className="hover:text-primary-600">
            Services
          </Link>
          <span className="mx-2">/</span>
          <Link to={service.categoryLink} className="hover:text-primary-600">
            {service.category}
          </Link>
          <span className="mx-2">/</span>
          <span aria-current="page" className="text-gray-900">
            {service.title}
          </span>
        </nav>
      </div>

      {/* Page Header */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              <i className={`bi ${service.badgeIcon}`} /> {service.badgeText}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {service.fullTitle}
            </h1>
            <p className="text-lg text-white/90">{service.description}</p>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {service.quickStats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white border border-gray-200 rounded-xl p-4 text-center"
              >
                <i
                  className={`bi ${stat.icon} text-2xl text-primary-600 mb-2 block`}
                />
                <h4 className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                  {stat.label}
                </h4>
                <p className="font-semibold text-gray-900">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step-by-Step Process */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-gray-900 flex items-center justify-center gap-2">
              <i className="bi bi-list-ol text-primary-600" /> Step-by-Step
              Process
            </h2>
            <p className="text-gray-500">
              Follow these steps to complete this service
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {service.processSteps.map((step, stepIndex) => (
              <div
                key={step.title}
                className={`relative bg-white border rounded-xl p-6 ${step.isFinal ? 'border-green-300 bg-green-50' : 'border-gray-200'}`}
              >
                <span
                  className={`absolute -top-3 -left-3 w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ${step.isFinal ? 'bg-green-600 text-white' : 'bg-primary-600 text-white'}`}
                >
                  {stepIndex + 1}
                </span>
                <h4 className="font-semibold text-gray-900 mb-2">
                  {step.title}
                </h4>
                <p className="text-sm text-gray-500">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements & Info */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="lg:col-span-2 space-y-6">
              {/* Requirements */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="bi bi-clipboard-check text-primary-600" />{' '}
                  Requirements
                </h2>
                {service.requirements.map((req) => (
                  <div
                    key={req.title}
                    className="bg-white border border-gray-200 rounded-xl p-4 mb-4"
                  >
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <i className={`bi ${req.icon} text-primary-600`} />{' '}
                      {req.title}
                    </h4>
                    <ul className="space-y-2">
                      {req.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm text-gray-600"
                        >
                          <i className="bi bi-check-circle-fill text-primary-600 mt-0.5" />{' '}
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* FAQs */}
              {service.faqs.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <i className="bi bi-question-circle text-primary-600" />{' '}
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-2">
                    {service.faqs.map((faq, faqIndex) => (
                      <div
                        key={faq.question}
                        className="bg-white border border-gray-200 rounded-xl overflow-hidden"
                      >
                        <button
                          type="button"
                          className="w-full p-4 text-left font-medium text-gray-900 flex items-center justify-between hover:bg-gray-50"
                          onClick={() =>
                            setOpenFaq(openFaq === faqIndex ? null : faqIndex)
                          }
                        >
                          <span>{faq.question}</span>
                          <i
                            className={`bi bi-chevron-down transition-transform ${openFaq === faqIndex ? 'rotate-180' : ''}`}
                          />
                        </button>
                        {openFaq === faqIndex && (
                          <div className="px-4 pb-4 text-sm text-gray-600">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="bi bi-building text-primary-600" /> Office
                  Information
                </h4>
                <p className="font-medium text-gray-900">
                  {service.office.name}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  {service.office.location}
                </p>
                <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
                  <i className="bi bi-telephone" /> {service.office.phone}
                </p>
                <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
                  <i className="bi bi-clock" /> {service.office.hours}
                </p>
              </div>

              {service.relatedServices.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <i className="bi bi-link-45deg text-primary-600" /> Related
                    Services
                  </h4>
                  <ul className="space-y-2">
                    {service.relatedServices.map((related) => (
                      <li key={related.title}>
                        <Link
                          to={related.link}
                          className="text-primary-600 hover:underline text-sm"
                        >
                          {related.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="bi bi-info-circle text-primary-600" /> Need
                  Help?
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  Contact us for assistance with this service.
                </p>
                <Link
                  to="/contact"
                  className="block w-full text-center bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
