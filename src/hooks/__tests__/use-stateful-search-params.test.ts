import { renderHook } from '@testing-library/react';
import usePageParams from '../use-stateful-search-params';

const pushMock = jest.fn();
const refreshMock = jest.fn();
const replaceMock = jest.fn();
const pathname = '/test';
const SEARCH_KEYWORD_PARAM_NAME = 'filter';

jest.mock('next/navigation', () => ({
  usePathname: () => '/test',
  useRouter: () => ({
    push: pushMock,
    replace: replaceMock,
    prefetch: jest.fn(),
    refresh: refreshMock,
  }),
  useSearchParams: () => ({
    toString: () => '' as string,
  }),
}));

describe('usePageParams', () => {
  test('should call useRouter push on push', () => {
    const {
      result: { current },
    } = renderHook(usePageParams);
    const { push, pageParams } = current;
    pageParams.set(SEARCH_KEYWORD_PARAM_NAME, 'name');

    push();
    expect(pushMock).toHaveBeenCalled();
    expect(pushMock).toHaveBeenCalledWith(
      `${pathname}?${SEARCH_KEYWORD_PARAM_NAME}=name`
    );
  });

  test('should call useRouter refresh', () => {
    const {
      result: { current },
    } = renderHook(usePageParams);
    const { refresh } = current;

    refresh();
    expect(refreshMock).toHaveBeenCalled();
  });

  test('should call useRouter replace', () => {
    const {
      result: { current },
    } = renderHook(usePageParams);
    const { replace, pageParams } = current;

    pageParams.set(SEARCH_KEYWORD_PARAM_NAME, 'name');
    replace();

    expect(replaceMock).toHaveBeenCalled();
    expect(replaceMock).toHaveBeenCalledWith(
      `${pathname}?${SEARCH_KEYWORD_PARAM_NAME}=name`
    );
  });
});
