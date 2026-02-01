import { useSiteConfig } from '@/contexts/SiteConfigContext';
import { usePageMeta } from '@/hooks/usePageMeta';
import { Link } from 'react-router-dom';

export default function OrdinanceFrameworkPage() {
  const { lguName, labels, legislative } = useSiteConfig();
  usePageMeta({ title: 'Ordinance Framework' });

  // Get ordinance categories and items from config
  const ordinanceCategories = legislative.ordinances.categories;
  const sampleOrdinances = legislative.ordinances.items.map((ord) => ({
    no: ord.number,
    title: ord.title,
    date: ord.date,
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
            Ordinance Framework
          </span>
        </nav>
      </div>

      {/* Page Header */}
      <section className="bg-linear-to-br from-primary-600 to-primary-700 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              <i className="bi bi-journal-text" /> Legislative
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ordinance Framework
            </h1>
            <p className="text-lg text-white/90">
              {labels.deptPrefix} ordinances enacted by the{' '}
              {labels.legislativeBody} ng {lguName}
            </p>
          </div>
        </div>
      </section>

      {/* About Ordinances */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-xl p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 flex items-center justify-center bg-primary-50 rounded-xl text-primary-600 text-xl shrink-0">
                <i className="bi bi-info-circle" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What is an Ordinance?
                </h3>
                <p className="text-gray-600 mb-4">
                  A {labels.lguTypeLabel.toLowerCase()} ordinance is a local law
                  enacted by the {labels.legislativeBody} (
                  {labels.legislativeBodyAbbr}) that governs the{' '}
                  {labels.lguTypeLabel.toLowerCase()} and its residents.
                  Ordinances have the force and effect of law within the
                  territorial jurisdiction of the{' '}
                  {labels.lguTypeLabel.toLowerCase()}.
                </p>
                <p className="text-gray-600">
                  Ordinances may cover various subjects including but not
                  limited to: taxation, business regulations, public safety,
                  environmental protection, traffic management, and zoning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ordinance Categories */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Ordinance Categories
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {ordinanceCategories.map((cat) => (
              <div
                key={cat.id}
                className="flex items-center gap-2 p-4 bg-white border border-gray-200 rounded-xl text-center justify-center"
              >
                <i className={`bi ${cat.icon} text-primary-600`} />{' '}
                <span className="text-sm font-medium text-gray-700">
                  {cat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Ordinances Table */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Sample Ordinances
            </h2>
            <p className="text-gray-500">
              Sample ordinances — replace with actual data from your{' '}
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
                    style={{ width: '120px' }}
                  >
                    Ordinance No.
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
                {sampleOrdinances.map((ord) => (
                  <tr key={ord.no} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {ord.no}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {ord.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {ord.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
              <i className="bi bi-info-circle" /> Update this section with
              actual ordinances from your LGU's {labels.legislativeBody}{' '}
              website.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
