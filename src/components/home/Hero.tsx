import SearchAutocomplete from '@/components/SearchAutocomplete';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="bg-linear-to-br from-primary-600 to-primary-700 py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="lg:text-left text-center">
            <h1 className="text-[2.5rem] md:text-4xl text-white mb-4 leading-tight font-bold">
              {t('hero-welcome')}
            </h1>
            <p className="text-lg text-white/90 mb-8 leading-relaxed">
              {t('hero-subtitle')}
            </p>
            <div className="flex gap-4 flex-wrap lg:justify-start justify-center">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:bg-gray-100"
              >
                Browse Services <i className="bi bi-arrow-right" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:bg-white/15"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Search Box */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-primary-500/10 transition-all duration-300 focus-within:shadow-xl focus-within:border-primary-500/20">
            <h2 className="text-base text-gray-800 mb-6 flex items-center gap-2 font-semibold">
              <i className="bi bi-search text-primary-600" /> Find a Service
            </h2>
            <div className="relative">
              <i className="bi bi-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10 pointer-events-none" />
              <SearchAutocomplete
                placeholder="e.g., birth certificate, business permit"
                className="[&_input]:pl-11 [&_input]:pr-4 [&_input]:py-3.5 [&_input]:border-2 [&_input]:border-gray-200 [&_input]:rounded-lg [&_input]:shadow-none [&_input]:bg-gray-50 hover:[&_input]:border-gray-300 hover:[&_input]:bg-white focus:[&_input]:border-primary-500 focus:[&_input]:ring-4 focus:[&_input]:ring-primary-500/10"
              />
            </div>
            <div className="mt-4 flex items-center gap-2 flex-wrap text-[0.8125rem]">
              <span className="text-gray-500 font-medium">Popular:</span>
              <Link
                to="/service-details/birth-certificate"
                className="text-primary-600 bg-primary-500/5 px-3 py-1.5 rounded-full no-underline transition-all duration-200 font-medium border border-transparent hover:bg-primary-500/10 hover:border-primary-500/15"
              >
                Birth Certificate
              </Link>
              <Link
                to="/service-details/business-permits-licensing"
                className="text-primary-600 bg-primary-500/5 px-3 py-1.5 rounded-full no-underline transition-all duration-200 font-medium border border-transparent hover:bg-primary-500/10 hover:border-primary-500/15"
              >
                Business Permit
              </Link>
              <Link
                to="/service-details/municipal-treasurer"
                className="text-primary-600 bg-primary-500/5 px-3 py-1.5 rounded-full no-underline transition-all duration-200 font-medium border border-transparent hover:bg-primary-500/10 hover:border-primary-500/15"
              >
                Real Property Tax
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
