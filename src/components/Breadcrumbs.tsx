import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps): JSX.Element {
  return (
    <div className="container mx-auto px-4">
      <nav className="py-4 text-sm text-gray-500" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-primary-600">
          Home
        </Link>
        {items.map((item) => (
          <span key={item.label}>
            <span className="mx-2">/</span>
            {item.href ? (
              <Link to={item.href} className="hover:text-primary-600">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-gray-900">
                {item.label}
              </span>
            )}
          </span>
        ))}
      </nav>
    </div>
  );
}
