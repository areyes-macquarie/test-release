import hasValue, { isObjectEmpty } from '@/services/shared/helpers/has-value';

describe('hasValue', () => {
  test('should return true if value is []', () => {
    expect(hasValue([])).toBeFalsy();
  });

  test('should return false if value is []', () => {
    expect(hasValue(['Apple', 'Orange'])).toBeTruthy();
  });

  test('should return true if value is {}', () => {
    expect(hasValue({})).toBeFalsy();
  });

  test('should return false if value is not an empty object', () => {
    expect(hasValue({ id: 1 })).toBeTruthy();
  });

  test('should return true if value is empty string', () => {
    expect(hasValue('')).toBeFalsy();
  });

  test('should return false if value is not empty string', () => {
    expect(hasValue('John Doe')).toBeTruthy();
  });

  test('should return true if value is null or undefined', () => {
    expect(hasValue(null)).toBeFalsy();
    expect(hasValue(undefined)).toBeFalsy();
  });
});

describe('isObjectEmpty', () => {
  test('should return true if value is {}', () => {
    expect(isObjectEmpty({})).toBeTruthy();
  });

  test('should return false if value is not an empty object', () => {
    expect(isObjectEmpty({ id: 1 })).toBeFalsy();
  });
});
