import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSiteConfig } from '@/contexts/SiteConfigContext';
import { usePageMeta } from '@/hooks/usePageMeta';

export default function TourismPage() {
  const { lguName, tourism, labels } = useSiteConfig();
  const [activeCategory, setActiveCategory] = useState('all');
  usePageMeta({ title: 'Tourism' });

  // Filter attractions by category
  const filteredAttractions =
    activeCategory === 'all'
      ? tourism.attractions
      : tourism.attractions.filter((a) => a.category === activeCategory);

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
            Tourism
          </span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              <i className="bi bi-geo-alt-fill" /> Explore
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Discover {lguName}
            </h1>
            <p className="text-lg text-white/90">
              Explore the beauty, culture, and hospitality of our{' '}
              {labels.lguTypeLabel.toLowerCase()}
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {tourism.categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
                  activeCategory === category.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-white border border-gray-200 text-gray-700 hover:border-primary-500'
                }`}
              >
                <i className={`bi ${category.icon}`} />
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Attractions Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium mb-2">
              <i className="bi bi-pin-map-fill" /> Places to Visit
            </span>
            <h2 className="text-2xl font-bold text-gray-900">
              Tourist Attractions
            </h2>
          </div>

          {filteredAttractions.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <i className="bi bi-geo-alt text-4xl mb-4 block opacity-50" />
              <p>No attractions found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAttractions.map((attraction) => {
                const category = tourism.categories.find(
                  (c) => c.id === attraction.category,
                );
                return (
                  <div
                    key={attraction.id}
                    className="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-200 hover:border-primary-500 hover:shadow-lg"
                  >
                    {/* Image or Placeholder */}
                    <div className="h-48 bg-gray-100 flex items-center justify-center">
                      {attraction.image ? (
                        <img
                          src={attraction.image}
                          alt={attraction.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center text-gray-400">
                          <i
                            className={`bi ${category?.icon || 'bi-image'} text-5xl`}
                          />
                          <p className="text-sm mt-2">No image</p>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-flex items-center gap-1 bg-primary-50 text-primary-700 px-2 py-1 rounded text-xs font-medium">
                          <i className={`bi ${category?.icon || 'bi-geo'}`} />
                          {category?.label || 'Other'}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {attraction.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {attraction.description}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <i className="bi bi-geo-alt" /> {attraction.location}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Events Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium mb-2">
              <i className="bi bi-calendar-event-fill" /> Celebrations
            </span>
            <h2 className="text-2xl font-bold text-gray-900">
              Events &amp; Fiestas
            </h2>
            <p className="text-gray-500 mt-2">
              Experience the vibrant culture and traditions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {tourism.events.map((event) => (
              <div
                key={event.id}
                className="bg-white border border-gray-200 rounded-xl p-6 transition-all duration-200 hover:border-primary-500 hover:shadow-md"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-primary-50 text-primary-600 rounded-xl text-xl mb-4">
                  <i className="bi bi-calendar-heart" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {event.name}
                </h3>
                <p className="text-primary-600 font-medium text-sm mb-3">
                  <i className="bi bi-calendar3 mr-1" /> {event.date}
                </p>
                <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <i className="bi bi-geo-alt" /> {event.location}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Info Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium mb-2">
              <i className="bi bi-info-circle-fill" /> Plan Your Visit
            </span>
            <h2 className="text-2xl font-bold text-gray-900">
              Travel Information
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* How to Get There */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-50 text-blue-600 rounded-xl text-xl mb-4">
                <i className="bi bi-signpost-split" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                How to Get There
              </h3>
              <p className="text-gray-600 text-sm">
                {tourism.travelInfo.howToGetThere}
              </p>
            </div>

            {/* Best Time to Visit */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="w-12 h-12 flex items-center justify-center bg-green-50 text-green-600 rounded-xl text-xl mb-4">
                <i className="bi bi-sun" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Best Time to Visit
              </h3>
              <p className="text-gray-600 text-sm">
                {tourism.travelInfo.bestTimeToVisit}
              </p>
            </div>

            {/* Travel Tips */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="w-12 h-12 flex items-center justify-center bg-yellow-50 text-yellow-600 rounded-xl text-xl mb-4">
                <i className="bi bi-lightbulb" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Travel Tips
              </h3>
              <ul className="text-gray-600 text-sm space-y-2">
                {tourism.travelInfo.tips.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <i className="bi bi-check-circle-fill text-green-500 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-primary-50">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Ready to explore {lguName}?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Contact our local tourism office for more information and
            assistance in planning your visit.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:bg-primary-700"
          >
            Contact Us <i className="bi bi-arrow-right" />
          </Link>
        </div>
      </section>
    </>
  );
}
