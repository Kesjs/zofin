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
    <nav
      aria-label="Breadcrumb"
      className="w-full fixed top-0 left-0 bg-yellow-100 border-b border-gray-200 py-4 pt-20" // Ajout du pt-20 pour décaler sous le header
      style={{ position: 'relative', zIndex: 20 }}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-20 flex justify-center">
        <ol className="flex flex-wrap items-center space-x-2" role="list">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={index} className="flex items-center">
                {index !== 0 && (
                  <span
                    className="mx-2 select-none text-gray-400"
                    aria-hidden="true"
                  >
                    {/* Chevron SVG separator */}
                    <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                )}

                {item.path && !isLast ? (
                  <Link
                    to={item.path}
                    className="hover:text-yellow-600 capitalize font-medium focus:outline-none focus:underline transition-colors"
                    rel="nofollow"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className="text-gray-500 capitalize font-semibold"
                    aria-current={isLast ? 'page' : undefined}
                    tabIndex={-1}
                  >
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;