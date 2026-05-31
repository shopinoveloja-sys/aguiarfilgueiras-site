import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const rootDir = process.cwd();
const distDir = path.join(rootDir, "dist");
const siteUrl = "https://aguiarfilgueiras.com.br";
const defaultImage = `${siteUrl}/og-image.jpg`;

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const stripAccents = (value = "") =>
  String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const relatedServicesByPost = {
  "reforma-codigo-penal-militar": ["direito-penal-militar", "defesa-em-ipm", "processo-administrativo-militar"],
  "pensao-militar-direitos-dependentes": ["pensao-militar", "abate-teto-pensao-militar", "advogado-direito-militar"],
  "transgressoes-disciplinares-ampla-defesa": ["punicao-disciplinar-militar", "processo-administrativo-militar", "exclusao-das-forcas-armadas"],
};

const relatedPostsByService = {
  "direito-penal-militar": ["reforma-codigo-penal-militar"],
  "defesa-em-ipm": ["reforma-codigo-penal-militar"],
  "punicao-disciplinar-militar": ["transgressoes-disciplinares-ampla-defesa"],
  "processo-administrativo-militar": ["transgressoes-disciplinares-ampla-defesa"],
  "pensao-militar": ["pensao-militar-direitos-dependentes"],
  "abate-teto-pensao-militar": ["pensao-militar-direitos-dependentes"],
};

const readServicePages = () => {
  const filePath = path.join(rootDir, "src", "data", "servicePages.ts");
  const source = fs.readFileSync(filePath, "utf8");
  const match = source.match(/export const servicePages: ServicePage\[\] = (\[[\s\S]*?\]);/);
  if (!match) {
    throw new Error("Nao foi possivel localizar servicePages em servicePages.ts");
  }

  return vm.runInNewContext(match[1], {});
};

const setOrCreateMeta = (html, selector, tag) => {
  const [regex, marker] = selector;
  if (regex.test(html)) {
    return html.replace(regex, tag);
  }
  return html.replace("</head>", `  ${tag}\n  ${marker}\n</head>`);
};

const applySeo = (template, route) => {
  let html = template;
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);
  const keywords = escapeHtml(route.keywords?.join(", ") || "");
  const canonicalPath = route.path === "/" || route.path.endsWith("/") ? route.path : `${route.path}/`;
  const canonical = `${siteUrl}${canonicalPath}`;

  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
  html = setOrCreateMeta(html, [/<meta name="description" content="[^"]*"\s*\/?>/i, ""], `<meta name="description" content="${description}">`);
  html = setOrCreateMeta(html, [/<meta name="keywords" content="[^"]*"\s*\/?>/i, ""], `<meta name="keywords" content="${keywords}">`);
  html = setOrCreateMeta(html, [/<link rel="canonical" href="[^"]*"\s*\/?>/i, ""], `<link rel="canonical" href="${canonical}">`);
  html = setOrCreateMeta(html, [/<meta property="og:type" content="[^"]*"\s*\/?>/i, ""], `<meta property="og:type" content="${route.ogType || "website"}">`);
  html = setOrCreateMeta(html, [/<meta property="og:title" content="[^"]*"\s*\/?>/i, ""], `<meta property="og:title" content="${title}">`);
  html = setOrCreateMeta(html, [/<meta property="og:description" content="[^"]*"\s*\/?>/i, ""], `<meta property="og:description" content="${description}">`);
  html = setOrCreateMeta(html, [/<meta property="og:url" content="[^"]*"\s*\/?>/i, ""], `<meta property="og:url" content="${canonical}">`);
  html = setOrCreateMeta(html, [/<meta property="og:image" content="[^"]*"\s*\/?>/i, ""], `<meta property="og:image" content="${defaultImage}">`);
  html = setOrCreateMeta(html, [/<meta name="twitter:title" content="[^"]*"\s*\/?>/i, ""], `<meta name="twitter:title" content="${title}">`);
  html = setOrCreateMeta(html, [/<meta name="twitter:description" content="[^"]*"\s*\/?>/i, ""], `<meta name="twitter:description" content="${description}">`);
  html = setOrCreateMeta(html, [/<meta name="twitter:image" content="[^"]*"\s*\/?>/i, ""], `<meta name="twitter:image" content="${defaultImage}">`);

  const jsonLd = JSON.stringify(route.jsonLd);
  html = html.replace("</head>", `  <script type="application/ld+json">${jsonLd}</script>\n</head>`);
  html = html.replace('<div id="root"></div>', `<div id="root">${route.body}</div>`);
  return html;
};

const serviceBody = (page, blogPosts, serviceGuides) => {
  const guide = serviceGuides[page.slug];
  const relatedPosts = (relatedPostsByService[page.slug] || [])
    .map((slug) => blogPosts.find((post) => post.slug === slug))
    .filter(Boolean);

  return `
  <main>
    <section>
      <p>${escapeHtml(page.eyebrow)}</p>
      <h1>${escapeHtml(page.title)}</h1>
      <p>${escapeHtml(page.intro)}</p>
      <a href="https://wa.me/5561981833328">Falar com advogado militar</a>
    </section>
    <section>
      <h2>Quando procurar orientacao juridica</h2>
      <ul>${page.problems.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      <h2>Como conduzimos a defesa</h2>
      <ol>${page.approach.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ol>
      <h2>Documentos uteis</h2>
      <ul>${page.documents.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      ${
        guide
          ? `
      <h2>Prazos e primeiros passos</h2>
      <p>${escapeHtml(guide.deadline)}</p>
      <h2>Riscos de agir sem orientacao</h2>
      <ul>${guide.risks.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      <h2>Quando falar com advogado</h2>
      <ul>${guide.whenToCall.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      <h2>${escapeHtml(guide.ctaTitle)}</h2>
      <p>${escapeHtml(guide.ctaText)}</p>
      <h2>Duvidas frequentes</h2>
      ${guide.faqs.map((faq) => `<h3>${escapeHtml(faq.question)}</h3><p>${escapeHtml(faq.answer)}</p>`).join("")}`
          : ""
      }
      ${relatedPosts.length ? `<h2>Artigos relacionados</h2><ul>${relatedPosts.map((post) => `<li><a href="/blog/${post.slug}">${escapeHtml(post.title)}</a></li>`).join("")}</ul>` : ""}
    </section>
  </main>`;
};

const blogBody = (post, servicePages) => {
  const relatedServices = (relatedServicesByPost[post.slug] || ["advogado-direito-militar"])
    .map((slug) => servicePages.find((page) => page.slug === slug))
    .filter(Boolean);

  return `
  <main>
    <article>
      <p>${escapeHtml(post.category)} - ${escapeHtml(post.date)}</p>
      <h1>${escapeHtml(post.title)}</h1>
      <p>${escapeHtml(post.excerpt)}</p>
      <blockquote>${escapeHtml(post.carlosComment)}</blockquote>
      ${post.content.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
      ${relatedServices.length ? `<h2>Orientacoes relacionadas</h2><ul>${relatedServices.map((page) => `<li><a href="/${page.slug}">${escapeHtml(page.title)}</a></li>`).join("")}</ul>` : ""}
    </article>
  </main>`;
};

const blogIndexBody = (posts, servicePages) => `
  <main>
    <section>
      <p>Biblioteca de Direito Militar</p>
      <h1>Artigos organizados por tema para militares e familiares</h1>
      <p>Encontre orientacoes sobre IPM, punicoes, carreira, pensao e beneficios militares.</p>
    </section>
    <section>
      <h2>Topicos do blog</h2>
      <ul>
        <li>Penal militar e IPM</li>
        <li>Disciplina e punicoes</li>
        <li>Carreira militar</li>
        <li>Saude, pensao e beneficios</li>
        <li>Policiais e bombeiros militares</li>
      </ul>
      <h2>Publicacoes</h2>
      <ul>${posts.map((post) => `<li><a href="/blog/${post.slug}/">${escapeHtml(post.title)}</a> - ${escapeHtml(post.category)}</li>`).join("")}</ul>
      <h2>Areas relacionadas</h2>
      <ul>${servicePages.map((page) => `<li><a href="/${page.slug}/">${escapeHtml(page.title)}</a></li>`).join("")}</ul>
    </section>
  </main>`;

const writeRoute = (route) => {
  const template = fs.readFileSync(path.join(distDir, "index.html"), "utf8");
  const html = applySeo(template, route);
  const outDir = path.join(distDir, route.path.replace(/^\//, ""));
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), html);
};

const servicePages = readServicePages();
const blogPosts = JSON.parse(fs.readFileSync(path.join(rootDir, "src", "data", "blogPosts.json"), "utf8"));
const serviceGuides = JSON.parse(fs.readFileSync(path.join(rootDir, "src", "data", "servicePageGuides.json"), "utf8"));

for (const page of servicePages) {
  const guide = serviceGuides[page.slug];
  const legalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: "Aguiar Filgueiras Advocacia",
    url: `${siteUrl}/${page.slug}/`,
    description: page.seoDescription,
    areaServed: "Brasil",
    serviceType: stripAccents(page.title),
    telephone: "+55-61-98183-3328",
  };
  const faqSchema = guide?.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: guide.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }
    : null;

  writeRoute({
    path: `/${page.slug}`,
    title: page.seoTitle,
    description: page.seoDescription,
    keywords: page.keywords,
    body: serviceBody(page, blogPosts, serviceGuides),
    jsonLd: faqSchema ? [legalServiceSchema, faqSchema] : legalServiceSchema,
  });
}

writeRoute({
  path: "/blog",
  title: "Blog de Direito Militar | Aguiar Filgueiras Advocacia",
  description:
    "Artigos, guias e analises sobre Direito Militar, IPM, punicoes disciplinares, carreira, pensao e beneficios militares.",
  keywords: ["blog direito militar", "artigos direito militar", "advogado militar", "IPM", "punicao disciplinar militar"],
  body: blogIndexBody(blogPosts, servicePages),
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog de Direito Militar - Aguiar Filgueiras Advocacia",
    url: `${siteUrl}/blog/`,
    description:
      "Artigos, guias e analises sobre Direito Militar, IPM, punicoes disciplinares, carreira, pensao e beneficios militares.",
    publisher: {
      "@type": "LegalService",
      name: "Aguiar Filgueiras Advocacia",
      url: siteUrl,
    },
    blogPost: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${siteUrl}/blog/${post.slug}/`,
      datePublished: post.date,
      articleSection: post.category,
    })),
  },
});

for (const post of blogPosts) {
  writeRoute({
    path: `/blog/${post.slug}`,
    title: post.seoTitle || `${post.title} | Aguiar Filgueiras Advocacia`,
    description: post.seoDescription || post.excerpt,
    keywords: post.keywords || [post.category, "direito militar", "advogado militar"],
    ogType: "article",
    body: blogBody(post, servicePages),
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.seoDescription || post.excerpt,
      mainEntityOfPage: `${siteUrl}/blog/${post.slug}/`,
      url: `${siteUrl}/blog/${post.slug}/`,
      datePublished: post.date,
      dateModified: post.date,
      articleSection: post.category,
      keywords: post.keywords || [post.category, "direito militar", "advogado militar"],
      author: {
        "@type": "Person",
        name: "Carlos Filgueiras",
      },
      publisher: {
        "@type": "LegalService",
        name: "Aguiar Filgueiras Advocacia",
        url: siteUrl,
      },
    },
  });
}

console.log(`Pre-render SEO concluido: ${servicePages.length + blogPosts.length + 1} rotas.`);
