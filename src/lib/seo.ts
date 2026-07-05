type SeoOptions = {
  title: string;
  description: string;
  canonicalUrl: string;
  keywords?: string;
  ogType?: "website" | "article" | "profile";
  image?: string;
  robots?: string;
};

const ensureMeta = (selector: string, attrs: Record<string, string>) => {
  let element = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;

  if (!element) {
    element = selector.startsWith("link") ? document.createElement("link") : document.createElement("meta");
    Object.entries(attrs).forEach(([key, value]) => element!.setAttribute(key, value));
    document.head.appendChild(element);
  }

  return element;
};

export const applySeo = ({
  title,
  description,
  canonicalUrl,
  keywords,
  ogType = "website",
  image,
  robots = "index, follow",
}: SeoOptions) => {
  document.title = title;

  ensureMeta("meta[name='description']", { name: "description" }).setAttribute("content", description);
  ensureMeta("meta[name='robots']", { name: "robots" }).setAttribute("content", robots);
  ensureMeta("link[rel='canonical']", { rel: "canonical" }).setAttribute("href", canonicalUrl);
  ensureMeta("meta[property='og:type']", { property: "og:type" }).setAttribute("content", ogType);
  ensureMeta("meta[property='og:title']", { property: "og:title" }).setAttribute("content", title);
  ensureMeta("meta[property='og:description']", { property: "og:description" }).setAttribute("content", description);
  ensureMeta("meta[property='og:url']", { property: "og:url" }).setAttribute("content", canonicalUrl);
  ensureMeta("meta[name='twitter:card']", { name: "twitter:card" }).setAttribute("content", "summary_large_image");
  ensureMeta("meta[name='twitter:title']", { name: "twitter:title" }).setAttribute("content", title);
  ensureMeta("meta[name='twitter:description']", { name: "twitter:description" }).setAttribute("content", description);

  if (keywords) {
    ensureMeta("meta[name='keywords']", { name: "keywords" }).setAttribute("content", keywords);
  }

  if (image) {
    ensureMeta("meta[property='og:image']", { property: "og:image" }).setAttribute("content", image);
    ensureMeta("meta[name='twitter:image']", { name: "twitter:image" }).setAttribute("content", image);
  }
};

export const setJsonLd = (id: string, payload: unknown) => {
  let script = document.getElementById(id) as HTMLScriptElement | null;

  if (!script) {
    script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(payload);
};
