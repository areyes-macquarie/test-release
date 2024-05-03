export function isStaleContact(date: string) {
  if (!date) {
    return false;
  }

  const now = new Date();
  const lastUpdate = new Date(date);
  const halfYearInMs = 1000 * 60 * 60 * 24 * 182;
  return Number(now) - Number(lastUpdate) >= halfYearInMs;
}
