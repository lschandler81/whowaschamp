'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-LH31MCLV58';

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Fire page_view on route changes
    const url = `${pathname}${searchParams?.toString() ? `?${searchParams.toString()}` : ''}`;
    if (typeof window !== 'undefined' && (window as any).gtag && GA_MEASUREMENT_ID) {
      (window as any).gtag('config', GA_MEASUREMENT_ID, {
        page_path: url,
      });
    }
  }, [pathname, searchParams]);

  return null;
}

