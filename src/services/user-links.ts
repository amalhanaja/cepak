import { LinkType } from "@/db/schema";
import { getUserCookieId, getUserId } from "./users";
import { getLinksByUserId, updateLinkOwnership } from "./links";

export const getUserLinks = async (): Promise<LinkType[]> => {
  const userId = await getUserId();
  const cookieId = await getUserCookieId();
  const links = await getLinksByUserId(userId ?? "");
  if (userId === cookieId) {
    return links;
  }
  if (!cookieId) {
    return links;
  }
  const linksByCookieId = await getLinksByUserId(cookieId);
  if (linksByCookieId.length > 0 && userId) {
    await updateLinkOwnership(cookieId, userId);
    return [...links, ...linksByCookieId].sort((a, b) => a.id - b.id);
  }
  return links;
};
