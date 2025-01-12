export const isValidUrl = (s: string) => {
  try {
    new URL(s);
    return true;
  } catch {
    return false;
  }
};
