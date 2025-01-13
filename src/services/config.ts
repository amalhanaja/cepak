"use server";

export const getBaseUrl = async (): Promise<string> => {
  const cepakUrl = process.env.CEPAK_URL;
  if (cepakUrl) {
    return cepakUrl;
  }
  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) {
    return `https://${vercelUrl}`;
  }
  return "http://localhost:3000";
};
