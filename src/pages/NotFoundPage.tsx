import { Link } from 'react-router-dom';
import { usePageMeta } from '@/hooks/usePageMeta';

export default function NotFoundPage() {
  usePageMeta({ title: 'Page Not Found' });

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-primary-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
        >
          <i className="bi bi-house" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
