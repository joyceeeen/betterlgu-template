import { Link } from 'react-router-dom';
import { useSiteConfig } from '@/contexts/SiteConfigContext';
import { usePageMeta } from '@/hooks/usePageMeta';

export default function ResolutionFrameworkPage() {
  const { lguName, labels, legislative } = useSiteConfig();
  usePageMeta({ title: 'Resolution Framework' });

  // Get resolution types and items from config
  const resolutionTypes = legislative.resolutions.types;
  const sampleResolutions = legislative.resolutions.items.map((res) => ({
    no: res.number,
    title: res.title,
    date: res.date,
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
          <Link to="/legislative" className="hover:text-primary-600">
            Legislative
          </Link>
          <span className="mx-2">/</span>
          <span aria-current="page" className="text-gray-900">
            Resolution Framework
          </span>
        </nav>
      </div>

      {/* Page Header */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              <i className="bi bi-file-earmark-text" /> Legislative
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Resolution Framework
            </h1>
            <p className="text-lg text-white/90">
              Resolutions passed by the {labels.legislativeBody} ng {lguName}
            </p>
          </div>
        </div>
      </section>

      {/* About Resolutions */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-xl p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 flex items-center justify-center bg-primary-50 rounded-xl text-primary-600 text-xl shrink-0">
                <i className="bi bi-info-circle" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What is a Resolution?
                </h3>
                <p className="text-gray-600 mb-4">
                  A resolution is a formal expression of the opinion or will of
                  the {labels.legislativeBody}. Unlike ordinances, resolutions
                  do not have the force and effect of law but serve as official
                  statements of the legislative body.
                </p>
                <p className="text-gray-600">
                  Resolutions are commonly used for: commendations, requests to
                  higher government agencies, expressions of support or
                  opposition, and administrative matters of the{' '}
                  {labels.legislativeBody}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resolution Types */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Types of Resolutions
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            {resolutionTypes.map((type) => (
              <div
                key={type.id}
                className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 rounded-full"
              >
                <i className={`bi ${type.icon} text-primary-600`} />{' '}
                <span className="text-sm font-medium text-gray-700">
                  {type.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Resolutions Table */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Sample Resolutions
            </h2>
            <p className="text-gray-500">
              Sample resolutions — replace with actual data from your{' '}
              {labels.legislativeBody}
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full bg-white border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-sm font-semibold text-gray-900"
                    style={{ width: '130px' }}
                  >
                    Resolution No.
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-sm font-semibold text-gray-900"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-sm font-semibold text-gray-900"
                    style={{ width: '120px' }}
                  >
                    Session Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sampleResolutions.map((res) => (
                  <tr key={res.no} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {res.no}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {res.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {res.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
              <i className="bi bi-info-circle" /> Update this section with
              actual resolutions from your LGU's {labels.legislativeBody}{' '}
              website.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
