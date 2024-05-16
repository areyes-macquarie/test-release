'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function usePageParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [hasUpdate, setUpdate] = useState(searchParams.toString());
  const pageParams = new URLSearchParams(searchParams.toString());

  const push = (): void => {
    router.push(`${pathname}?${pageParams.toString()}`);
  };

  const refresh = (): void => {
    router.refresh();
  };

  const replace = (): void => {
    router.replace(`${pathname}?${pageParams.toString()}`);
  };

  useEffect(() => {
    if (pageParams.toString() === searchParams.toString()) {
      return;
    }

    setUpdate(pageParams.toString());
  }, [pageParams]);

  return {
    pageParams,
    push,
    refresh,
    replace,
    hasUpdate,
  };
}

export default usePageParams;
