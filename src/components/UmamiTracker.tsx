'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

function UmamiTrackerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.umami === 'undefined') return;

    const url = searchParams.toString()
      ? `${pathname}?${searchParams.toString()}`
      : pathname;

    window.umami.track({ url });
  }, [pathname, searchParams]);

  return null;
}

export default function UmamiTracker() {
  return (
    <Suspense fallback={null}>
      <UmamiTrackerInner />
    </Suspense>
  );
}
