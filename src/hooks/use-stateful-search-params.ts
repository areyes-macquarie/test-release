'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function usePageParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [hasUpdate, setUpdate] = useState(searchParams.toString());
  const pageParams = new URLSearchParams(searchParams.toString());

  const applyParams = (): void => {
    router.push(`${pathname}?${pageParams.toString()}`);
  };

  useEffect(() => {
    if (pageParams.toString() === searchParams.toString()) {
      return;
    }

    setUpdate(pageParams.toString());
  }, [pageParams]);

  return {
    pageParams,
    applyParams,
    hasUpdate,
  };
}

export default usePageParams;
