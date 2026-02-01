import SearchAutocomplete from '@/components/SearchAutocomplete';

interface ServicePageHeaderProps {
  badgeIcon: string;
  badgeText: string;
  title: string;
  description: string;
  searchPlaceholder?: string;
}

export default function ServicePageHeader({
  badgeIcon,
  badgeText,
  title,
  description,
  searchPlaceholder = 'Search services (e.g., birth certificate, business permit)',
}: ServicePageHeaderProps): JSX.Element {
  return (
    <section className="bg-linear-to-br from-primary-600 to-primary-700 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <i className={`bi ${badgeIcon}`} /> {badgeText}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {title}
          </h1>
          <p className="text-lg text-white/90 mb-8">{description}</p>
          {/* Search Box */}
          <div className="max-w-xl mx-auto">
            <div className="relative flex items-center">
              <i className="bi bi-search absolute left-4 text-gray-400 z-10 pointer-events-none" />
              <SearchAutocomplete
                placeholder={searchPlaceholder}
                className="w-full [&_input]:pl-12 [&_input]:pr-4 [&_input]:py-4 [&_input]:rounded-xl [&_input]:text-base [&_input]:border-0 [&_input]:shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
