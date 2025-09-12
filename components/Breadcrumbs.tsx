import Link from 'next/link';
import type { ReactNode } from 'react';

type Crumb = {
  label: string;
  href?: string;
  icon?: ReactNode;
};

export function Breadcrumbs({ items, className = '' }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <div className="text-sm text-gray-700 flex items-center gap-2">
        {items.map((item, idx) => (
          <span key={idx} className="flex items-center gap-2">
            {idx > 0 && <span className="text-gray-400">/</span>}
            {item.href ? (
              <Link href={item.href} className="hover:text-red-600 inline-flex items-center gap-1">
                {item.icon}
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-600 inline-flex items-center gap-1">
                {item.icon}
                {item.label}
              </span>
            )}
          </span>
        ))}
      </div>
    </nav>
  );
}

