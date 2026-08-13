/**
 * Proxy document HTML from Express for crawlers only, so social/search bots
 * on the Vercel domain get DB-driven SEO tags.
 *
 * Real browsers always get Vercel’s own index.html + matching /assets hashes.
 * Proxying every request caused blank screens after deploy whenever API’s
 * synced index.html lagged behind the Vercel build.
 *
 * Env (optional): SEO_ORIGIN=https://api.dater.social
 */
const SEO_ORIGIN = (process.env.SEO_ORIGIN || "https://api.dater.social").replace(/\/$/, "");

const STATIC_FILE =
  /\.(js|css|map|ico|png|jpe?g|gif|svg|webp|woff2?|ttf|eot|txt|xml|json|webmanifest)$/i;

/** Crawlers / link-preview bots that need server-injected meta (not the SPA shell alone). */
const CRAWLER_UA =
  /facebookexternalhit|Facebot|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|TelegramBot|SkypeUriPreview|Applebot|Googlebot|bingbot|Baiduspider|YandexBot|DuckDuckBot|Slurp|Embedly|Quora Link Preview|Showyoubot|outbrain|pinterest|redditbot|vkShare|W3C_Validator|google-inspectiontool|Storebot-Google|Google-Extended/i;

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

  const ua = request.headers.get("user-agent") || "";
  if (!CRAWLER_UA.test(ua)) {
    // Browser / app: serve Vercel static SPA (correct hashed assets).
    return;
  }

  const target = `${SEO_ORIGIN}${pathname}${url.search}`;

  try {
    const upstream = await fetch(target, {
      method: request.method,
      headers: {
        "user-agent": ua || "vercel-seo-proxy",
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
