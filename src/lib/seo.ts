const SITE_NAME = "Aguiar Filgueiras Advocacia";

export const SEO = {
  siteName: SITE_NAME,
  siteUrl: "https://aguiarfilgueiras.com.br",
  defaultImage: "https://aguiarfilgueiras.com.br/og-image.jpg",
  logoUrl: "https://aguiarfilgueiras.com.br/apple-touch-icon-v2.png?v=2",
  phone: "+55-61-98183-3328",
  email: "contato@aguiarfilgueiras.com.br",
  socialProfiles: [
    "https://www.instagram.com/carlosfilgueiras.adv",
    "https://www.linkedin.com/in/carlos-filgueiras-992396154/",
    "https://www.facebook.com/carlosfilgueiras.adv",
  ],
} as const;

type SeoOptions = {
  title: string;
  description: string;
  canonicalUrl: string;
  keywords?: string;
  ogType?: "website" | "article" | "profile";
  image?: string;
  robots?: string;
};

type SeoMetaOptions = {
  title: string;
  description: string;
  canonicalPath: string;
  keywords?: string[];
  ogType?: "website" | "article";
  image?: string;
  imageAlt?: string;
  noindex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  articleSection?: string;
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

const setMetaValue = (selector: string, attrs: Record<string, string>, attribute: "content" | "href", value: string) => {
  ensureMeta(selector, attrs).setAttribute(attribute, value);
};

const stripTrailingSlash = (value: string) => (value.endsWith("/") && value !== "/" ? value.slice(0, -1) : value);

export const buildCanonicalUrl = (path: string) => {
  const normalizedPath = path === "/" ? "/" : `${stripTrailingSlash(path)}/`;
  return `${SEO.siteUrl}${normalizedPath}`;
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

export const applySeoMeta = ({
  title,
  description,
  canonicalPath,
  keywords = [],
  ogType = "website",
  image = SEO.defaultImage,
  imageAlt = title,
  noindex = false,
  publishedTime,
  modifiedTime,
  articleSection,
}: SeoMetaOptions) => {
  const canonicalUrl = buildCanonicalUrl(canonicalPath);
  const robots = noindex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  document.title = title;

  setMetaValue("meta[name='description']", { name: "description" }, "content", description);
  setMetaValue("meta[name='keywords']", { name: "keywords" }, "content", keywords.join(", "));
  setMetaValue("meta[name='author']", { name: "author" }, "content", SEO.siteName);
  setMetaValue("meta[name='robots']", { name: "robots" }, "content", robots);
  setMetaValue("link[rel='canonical']", { rel: "canonical" }, "href", canonicalUrl);
  setMetaValue("meta[property='og:type']", { property: "og:type" }, "content", ogType);
  setMetaValue("meta[property='og:locale']", { property: "og:locale" }, "content", "pt_BR");
  setMetaValue("meta[property='og:site_name']", { property: "og:site_name" }, "content", SEO.siteName);
  setMetaValue("meta[property='og:title']", { property: "og:title" }, "content", title);
  setMetaValue("meta[property='og:description']", { property: "og:description" }, "content", description);
  setMetaValue("meta[property='og:url']", { property: "og:url" }, "content", canonicalUrl);
  setMetaValue("meta[property='og:image']", { property: "og:image" }, "content", image);
  setMetaValue("meta[property='og:image:alt']", { property: "og:image:alt" }, "content", imageAlt);
  setMetaValue("meta[name='twitter:card']", { name: "twitter:card" }, "content", "summary_large_image");
  setMetaValue("meta[name='twitter:title']", { name: "twitter:title" }, "content", title);
  setMetaValue("meta[name='twitter:description']", { name: "twitter:description" }, "content", description);
  setMetaValue("meta[name='twitter:image']", { name: "twitter:image" }, "content", image);
  setMetaValue("meta[name='twitter:image:alt']", { name: "twitter:image:alt" }, "content", imageAlt);

  if (ogType === "article") {
    if (publishedTime) {
      setMetaValue("meta[property='article:published_time']", { property: "article:published_time" }, "content", publishedTime);
    }
    if (modifiedTime) {
      setMetaValue("meta[property='article:modified_time']", { property: "article:modified_time" }, "content", modifiedTime);
    }
    if (articleSection) {
      setMetaValue("meta[property='article:section']", { property: "article:section" }, "content", articleSection);
    }
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

export const applyJsonLd = setJsonLd;
