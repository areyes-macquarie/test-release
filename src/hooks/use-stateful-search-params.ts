'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function usePageParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
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

  return {
    pageParams,
    push,
    refresh,
    replace,
  };
}

export default usePageParams;
