import { ApiResponseMeta } from '@/lib/customer-insights/types';
import isEmpty from '@/services/shared/helpers/is-empty';
import { useState } from 'react';

function usePaginate() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [count, setCount] = useState(0);

  const updateState = (meta: ApiResponseMeta, more: boolean = true) => {
    setHasMore(!isEmpty(meta.next) && more);
    setPage(meta.page + 1);
    setCount(meta.count);
  };

  return {
    page,
    loading,
    hasMore,
    count,
    updateState,
    setLoading,
  };
}

export default usePaginate;
