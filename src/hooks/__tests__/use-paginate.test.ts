import { cleanup, renderHook } from '@testing-library/react';
import usePaginate from '../use-paginate';

const mockMeta = {
  count: 100,
  next: '/next',
  page: 2,
};

describe('usePaginate', () => {
  beforeEach(() => {
    cleanup();
  });

  test('should have a default values', () => {
    const {
      result: { current },
    } = renderHook(() => usePaginate());

    const { page, loading, hasMore, count } = current;

    expect(page).toEqual(1);
    expect(loading).toEqual(false);
    expect(hasMore).toEqual(true);
    expect(count).toEqual(0);
  });

  test('should be able to load  more pages', () => {
    const {
      result: { current },
    } = renderHook(() => usePaginate());
    const { hasMore, updateState } = current;

    updateState(mockMeta, true);

    expect(hasMore).toEqual(true);
  });

  test('should not be able to load  more pages', () => {
    const { result, rerender } = renderHook(() => usePaginate());
    const { updateState } = result.current;
    updateState(mockMeta, false);
    rerender(true);

    expect(result.current.hasMore).toEqual(false);
  });
});
