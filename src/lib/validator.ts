export const isValidUrl = (s: string) => {
  try {
    new URL(s);
    return true;
  } catch {
    return false;
  }
};

export const isValidSlug = (s: string | undefined) => {
  if (!s) return true;
  const regex = /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/;
  return regex.test(s);
};
