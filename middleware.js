/**
 * Proxy document HTML from Express so crawlers on the Vercel domain get
 * DB-driven SEO tags. Static assets (/assets/*, images, fonts) stay on Vercel.
 *
 * Env (optional): SEO_ORIGIN=https://api.dater.social
 */
const SEO_ORIGIN = (process.env.SEO_ORIGIN || "https://api.dater.social").replace(/\/$/, "");

const STATIC_FILE =
  /\.(js|css|map|ico|png|jpe?g|gif|svg|webp|woff2?|ttf|eot|txt|xml|json|webmanifest)$/i;

export const config = {
  matcher: ["/((?!api/).*)"],
};

export default async function middleware(request) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return;
  }

  const url = new URL(request.url);
  const { pathname } = url;

  if (pathname.startsWith("/assets/")) {
    return;
  }
  if (STATIC_FILE.test(pathname)) {
    return;
  }

  const target = `${SEO_ORIGIN}${pathname}${url.search}`;

  try {
    const upstream = await fetch(target, {
      method: request.method,
      headers: {
        "user-agent": request.headers.get("user-agent") || "vercel-seo-proxy",
        accept: "text/html",
      },
      redirect: "manual",
    });

    // If API is down or returns non-HTML, fall through to static SPA.
    const contentType = upstream.headers.get("content-type") || "";
    if (!upstream.ok || !contentType.includes("text/html")) {
      return;
    }

    const body = await upstream.arrayBuffer();
    const headers = new Headers();
    headers.set("content-type", contentType);
    headers.set("cache-control", "no-store");
    const slug = upstream.headers.get("x-landing-seo-slug");
    if (slug) {
      headers.set("x-landing-seo-slug", slug);
    }

    return new Response(body, {
      status: upstream.status,
      headers,
    });
  } catch {
    return;
  }
}
