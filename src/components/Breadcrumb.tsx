import React from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="text-sm text-gray-600   pt-32 px-6 md:px-20">
      <ol className="flex flex-wrap items-center space-x-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center">
              {index !== 0 && <span className="mx-2">&gt;</span>}
              {item.path && !isLast ? (
                <Link to={item.path} className="hover:text-yellow-600 capitalize font-medium">
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-500 capitalize">{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
