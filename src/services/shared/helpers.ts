export async function copyToClipboard(input: string) {
  await navigator.clipboard.writeText(input);
}

/**
 * Returns true if the input is not [], {}, "", null, undefined
 */
export function hasValue(
  input: undefined | null | string | unknown[] | Record<string, unknown>
): boolean {
  if (input === null || input === undefined) {
    return false;
  }

  if (typeof input === 'string') {
    return input.trim() !== '';
  }

  if (Array.isArray(input)) {
    return input.length > 0;
  }

  if (
    typeof input === 'object' &&
    Object.keys(input).length > 0 &&
    !isObjectEmpty(input)
  ) {
    return true;
  }

  return false;
}

/**
 * Returns true if the input is [], {}, "", null, undefined
 */
export function isEmpty(
  input: undefined | null | string | unknown[] | Record<string, unknown>
): boolean {
  return !hasValue(input);
}

function isObjectEmpty(obj: Record<string, unknown>): boolean {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}
