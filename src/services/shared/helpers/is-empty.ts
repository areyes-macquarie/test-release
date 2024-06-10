import { hasValue } from './has-value';

/**
 * Returns true if the input is [], {}, "", null, undefined
 */
function isEmpty(
  input: undefined | null | string | unknown[] | Record<string, unknown>
): boolean {
  return !hasValue(input);
}

export default isEmpty;
