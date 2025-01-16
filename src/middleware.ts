import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { getLinkBySlug, updateLinkCount } from "./services/links";

const redirrectionMiddleware = async (req: NextRequest) => {
  const pathname = decodeURIComponent(req.nextUrl.pathname);
  if (pathname === "/") return NextResponse.next();
  const pathSegements = pathname.split("/");
  if (pathSegements.length > 2) return NextResponse.next();
  const slug = pathSegements[1];
  const link = await getLinkBySlug(slug);
  if (!link) return NextResponse.next();
  await updateLinkCount(link.id, link.visitCount + 1);
  return NextResponse.redirect(decodeURIComponent(link.link));
};

export default clerkMiddleware(async (auth, req) => {
  return await redirrectionMiddleware(req);
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
