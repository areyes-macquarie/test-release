import isEmpty from '@/services/shared/helpers/is-empty';

describe('isEmpty', () => {
  test('should return true if value is []', () => {
    expect(isEmpty([])).toBeTruthy();
  });

  test('should return false if value is []', () => {
    expect(isEmpty(['Apple', 'Orange'])).toBeFalsy();
  });

  test('should return true if value is {}', () => {
    expect(isEmpty({})).toBeTruthy();
  });

  test('should return false if value is not an empty object', () => {
    expect(isEmpty({ id: 1 })).toBeFalsy();
  });

  test('should return true if value is empty string', () => {
    expect(isEmpty('')).toBeTruthy();
  });

  test('should return false if value is not empty string', () => {
    expect(isEmpty('John Doe')).toBeFalsy();
  });

  test('should return true if value is null or undefined', () => {
    expect(isEmpty(null)).toBeTruthy();
    expect(isEmpty(undefined)).toBeTruthy();
  });
});
