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
  "bombeiro-militar-punicao-disciplinar-defesa": ["bombeiro-militar-punicao-disciplinar", "punicao-disciplinar-militar", "processo-administrativo-militar"],
  "policial-militar-punicao-disciplinar-recurso": ["policial-militar-punicao-disciplinar", "punicao-disciplinar-militar", "processo-administrativo-militar"],
  "reintegracao-militar-quando-buscar": ["reintegracao-militar", "licenciamento-indevido-militar", "militar-temporario-licenciado"],
  "advogado-criminal-militar-como-atuar": ["advogado-criminal-militar", "direito-penal-militar", "defesa-em-ipm"],
  "conselho-de-justificacao-como-funciona": ["conselho-de-justificacao", "conselho-de-disciplina-militar", "processo-administrativo-militar"],
  "concurso-militar-exame-medico-investigacao-social": ["concurso-militar-eliminacao", "junta-medica-militar", "advogado-direito-militar"],
  "militar-temporario-licenciado-tratamento-saude": ["militar-temporario-licenciado", "licenciamento-indevido-militar", "reforma-militar-por-invalidez"],
  "sindicancia-militar-prazo-defesa-documentos": ["sindicancia-militar", "processo-administrativo-militar", "punicao-disciplinar-militar"],
  "conselho-de-disciplina-militar-como-se-defender": ["conselho-de-disciplina-militar", "processo-administrativo-militar", "exclusao-das-forcas-armadas"],
  "junta-medica-militar-como-contestar": ["junta-medica-militar", "reforma-militar-por-invalidez", "licenciamento-indevido-militar"],
  "desercao-militar-consequencias-direitos": ["desercao-militar", "direito-penal-militar", "defesa-em-ipm"],
  "reforma-codigo-penal-militar": ["direito-penal-militar", "defesa-em-ipm", "processo-administrativo-militar"],
  "pensao-militar-direitos-dependentes": ["pensao-militar", "abate-teto-pensao-militar", "advogado-direito-militar"],
  "transgressoes-disciplinares-ampla-defesa": ["punicao-disciplinar-militar", "processo-administrativo-militar", "exclusao-das-forcas-armadas"],
};

const relatedServiceRules = [
  { slug: "punicao-disciplinar-militar", terms: ["punicao", "disciplinar", "transgressao", "tac", "termo de ajuste", "pmmg"] },
  { slug: "processo-administrativo-militar", terms: ["processo administrativo", "sindicancia", "conselho", "defesa administrativa", "tac", "pmmg"] },
  { slug: "sindicancia-militar", terms: ["sindicancia militar", "sindicancia", "notificacao", "prazo"] },
  { slug: "conselho-de-disciplina-militar", terms: ["conselho de disciplina", "conselho", "disciplina militar"] },
  { slug: "conselho-de-justificacao", terms: ["conselho de justificacao", "justificacao", "oficial"] },
  { slug: "advogado-criminal-militar", terms: ["advogado criminal militar", "advogado penal militar", "defesa penal", "crime militar advogado"] },
  { slug: "defesa-em-ipm", terms: ["ipm", "inquerito", "oitiva", "depoimento", "investigacao"] },
  { slug: "direito-penal-militar", terms: ["penal", "crime", "codigo penal", "desercao", "acusado"] },
  { slug: "desercao-militar", terms: ["desercao", "crime de desercao", "ausencia", "acusado"] },
  { slug: "exclusao-das-forcas-armadas", terms: ["exclusao", "desligamento", "forcas armadas"] },
  { slug: "licenciamento-indevido-militar", terms: ["licenciamento", "reintegracao", "temporario"] },
  { slug: "militar-temporario-licenciado", terms: ["militar temporario", "temporario", "licenciado durante tratamento", "licenciamento temporario"] },
  { slug: "concurso-militar-eliminacao", terms: ["concurso militar", "exame medico", "investigacao social", "eliminacao", "edital"] },
  { slug: "reintegracao-militar", terms: ["reintegracao militar", "retorno ao servico", "reintegracao", "retorno militar"] },
  { slug: "policial-militar-punicao-disciplinar", terms: ["policial militar", "punicao disciplinar policial", "recurso policial militar"] },
  { slug: "bombeiro-militar-punicao-disciplinar", terms: ["bombeiro militar", "punicao disciplinar bombeiro", "recurso bombeiro militar"] },
  { slug: "junta-medica-militar", terms: ["junta medica", "inspecao de saude", "laudo", "apto", "incapacidade"] },
  { slug: "reforma-militar-por-invalidez", terms: ["reforma", "invalidez", "incapacidade", "junta medica", "saude"] },
  { slug: "pensao-militar", terms: ["pensao", "dependente", "previdenciario", "beneficio"] },
  { slug: "abate-teto-pensao-militar", terms: ["abate-teto", "desconto", "teto constitucional"] },
  { slug: "promocao-militar-preterida", terms: ["promocao", "preterida", "pretericao", "antiguidade"] },
  { slug: "advogado-direito-militar", terms: ["advogado militar", "direito militar", "defesa militar", "pmmg", "policial militar", "bombeiro"] },
];

const getRelatedServiceSlugsForPost = (post) => {
  if (relatedServicesByPost[post.slug]) return relatedServicesByPost[post.slug];

  const text = stripAccents(
    [
      post.slug,
      post.category,
      post.title,
      post.excerpt,
      post.seoTitle || "",
      post.seoDescription || "",
      ...(post.keywords || []),
    ].join(" ").toLowerCase(),
  );

  const matches = relatedServiceRules
    .map((rule) => ({
      slug: rule.slug,
      score: rule.terms.filter((term) => text.includes(stripAccents(term.toLowerCase()))).length,
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.slug);

  return Array.from(new Set([...matches, "advogado-direito-militar", "advogado-militar-brasilia"])).slice(0, 3);
};

const relatedPostsByService = {
  "advogado-criminal-militar": ["advogado-criminal-militar-como-atuar"],
  "reintegracao-militar": ["reintegracao-militar-quando-buscar"],
  "policial-militar-punicao-disciplinar": ["policial-militar-punicao-disciplinar-recurso"],
  "bombeiro-militar-punicao-disciplinar": ["bombeiro-militar-punicao-disciplinar-defesa"],
  "conselho-de-justificacao": ["conselho-de-justificacao-como-funciona"],
  "concurso-militar-eliminacao": ["concurso-militar-exame-medico-investigacao-social"],
  "militar-temporario-licenciado": ["militar-temporario-licenciado-tratamento-saude"],
  "sindicancia-militar": ["sindicancia-militar-prazo-defesa-documentos"],
  "conselho-de-disciplina-militar": ["conselho-de-disciplina-militar-como-se-defender"],
  "junta-medica-militar": ["junta-medica-militar-como-contestar"],
  "desercao-militar": ["desercao-militar-consequencias-direitos"],
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

const readGeoCoverage = () => {
  const filePath = path.join(rootDir, "src", "data", "geoCoverage.ts");
  const source = fs.readFileSync(filePath, "utf8");
  const statesMatch = source.match(/export const geoStates: GeoState\[\] = (\[[\s\S]*?\]);/);
  const citiesMatch = source.match(/export const geoCities: GeoCity\[\] = (\[[\s\S]*?\]);/);
  const hubMatch = source.match(/export const geoCoverageHub = (\{[\s\S]*?\});/);

  if (!statesMatch || !citiesMatch || !hubMatch) {
    throw new Error("Nao foi possivel localizar geoCoverage em geoCoverage.ts");
  }

  return {
    states: vm.runInNewContext(statesMatch[1], {}),
    cities: vm.runInNewContext(citiesMatch[1], {}),
    hub: vm.runInNewContext(`(${hubMatch[1]})`, {}),
  };
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
  const relatedServices = getRelatedServiceSlugsForPost(post)
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
      <h1>Artigos separados por forca, tema e estado</h1>
      <p>Encontre orientacoes para Forcas Federais, Forcas Estaduais, IPM, punicoes, carreira, pensao e beneficios militares.</p>
    </section>
    <section>
      <h2>Forcas Federais</h2>
      <ul>
        <li>Exercito</li>
        <li>Marinha</li>
        <li>Aeronautica</li>
        <li>Policia Federal</li>
        <li>Policia Rodoviaria Federal</li>
        <li>Outros servidores federais</li>
      </ul>
      <h2>Forcas Estaduais</h2>
      <ul>
        <li>Policiais militares</li>
        <li>Bombeiros militares</li>
        <li>Filtro preparado para artigos por estado</li>
      </ul>
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

const geoHubBody = (hub, states) => `
  <main>
    <section>
      <p>Atendimento nacional</p>
      <h1>${escapeHtml(hub.title)}</h1>
      <p>${escapeHtml(hub.description)}</p>
    </section>
    <section>
      <h2>Estados prioritarios</h2>
      <ul>
        ${states
          .map(
            (state) =>
              `<li><a href="/atendimento-militar/${state.slug}/">Atendimento em Direito Militar em ${escapeHtml(state.name)}</a> - ${escapeHtml(
                state.summary,
              )}</li>`,
          )
          .join("")}
      </ul>
    </section>
  </main>`;

const geoStateBody = (state, cities, services, posts) => `
  <main>
    <section>
      <p>${escapeHtml(state.region)} - ${escapeHtml(state.code)}</p>
      <h1>Atendimento em Direito Militar em ${escapeHtml(state.name)}</h1>
      <p>${escapeHtml(state.summary)}</p>
      <p>${escapeHtml(state.localAngle)}</p>
    </section>
    <section>
      <h2>Servicos juridicos relacionados</h2>
      <ul>${services.map((page) => `<li><a href="/${page.slug}/">${escapeHtml(page.title)}</a></li>`).join("")}</ul>
      ${
        cities.length
          ? `<h2>Cidades prioritarias</h2><ul>${cities
              .map(
                (city) =>
                  `<li><a href="/atendimento-militar/${state.slug}/${city.slug}/">Atendimento em ${escapeHtml(city.name)}/${escapeHtml(
                    state.code,
                  )}</a></li>`,
              )
              .join("")}</ul>`
          : ""
      }
      ${
        posts.length
          ? `<h2>Leituras relacionadas</h2><ul>${posts
              .map((post) => `<li><a href="/blog/${post.slug}/">${escapeHtml(post.title)}</a></li>`)
              .join("")}</ul>`
          : ""
      }
    </section>
  </main>`;

const geoCityBody = (state, city, services, posts) => `
  <main>
    <section>
      <p>${escapeHtml(city.name)} - ${escapeHtml(state.code)}</p>
      <h1>Atendimento em Direito Militar em ${escapeHtml(city.name)}/${escapeHtml(state.code)}</h1>
      <p>${escapeHtml(city.summary)}</p>
      <p>${escapeHtml(city.localAngle)}</p>
    </section>
    <section>
      <h2>Servico juridico conectado a esta cidade</h2>
      <ul>${services.map((page) => `<li><a href="/${page.slug}/">${escapeHtml(page.title)}</a></li>`).join("")}</ul>
      <h2>Voltar para a cobertura estadual</h2>
      <p><a href="/atendimento-militar/${state.slug}/">Atendimento em Direito Militar em ${escapeHtml(state.name)}</a></p>
      ${
        posts.length
          ? `<h2>Leituras relacionadas</h2><ul>${posts
              .map((post) => `<li><a href="/blog/${post.slug}/">${escapeHtml(post.title)}</a></li>`)
              .join("")}</ul>`
          : ""
      }
    </section>
  </main>`;

const writeRoute = (route) => {
  const template = fs.readFileSync(path.join(distDir, "index.html"), "utf8");
  const html = applySeo(template, route);
  const outDir = path.join(distDir, route.path.replace(/^\//, ""));
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), html);
};

const writeSitemap = (routes) => {
  const lastmod = new Date().toISOString().slice(0, 10);
  const entries = routes.map(({ path, changefreq, priority }) => {
    const canonicalPath = path === "/" || path.endsWith("/") ? path : `${path}/`;
    return `  <url>\n    <loc>${siteUrl}${canonicalPath}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  });
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join("\n")}\n</urlset>\n`;

  fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemap);
  fs.writeFileSync(path.join(rootDir, "public", "sitemap.xml"), sitemap);
};

const servicePages = readServicePages();
const blogPosts = JSON.parse(fs.readFileSync(path.join(rootDir, "src", "data", "blogPosts.json"), "utf8"));
const serviceGuides = JSON.parse(fs.readFileSync(path.join(rootDir, "src", "data", "servicePageGuides.json"), "utf8"));
const geoCoverage = readGeoCoverage();

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
    founder: {
      "@type": "Person",
      name: "Carlos Filgueiras",
      url: `${siteUrl}/#fundador`,
      jobTitle: "Advogado especializado em Direito Militar",
      sameAs: [
        "https://www.instagram.com/carlosfilgueiras.adv",
        "https://www.linkedin.com/in/carlos-filgueiras-992396154/",
        "https://www.facebook.com/carlosfilgueiras.adv",
      ],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Setor B Norte, CNB 3, Lote 12",
      addressLocality: "Brasilia",
      addressRegion: "DF",
      postalCode: "72115-035",
      addressCountry: "BR",
    },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: page.title, item: `${siteUrl}/${page.slug}/` },
    ],
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
    jsonLd: faqSchema ? [legalServiceSchema, breadcrumbSchema, faqSchema] : [legalServiceSchema, breadcrumbSchema],
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

writeRoute({
  path: "/atendimento-militar",
  title: "Atendimento em Direito Militar por estado e cidade | Aguiar Filgueiras Advocacia",
  description: geoCoverage.hub.description,
  keywords: [
    "advogado militar por estado",
    "atendimento direito militar",
    "advogado militar por cidade",
    "direito militar brasil",
  ],
  body: geoHubBody(
    geoCoverage.hub,
    geoCoverage.states.filter((state) => geoCoverage.hub.featuredStateSlugs.includes(state.slug)),
  ),
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: geoCoverage.hub.title,
      url: `${siteUrl}/atendimento-militar/`,
      description: geoCoverage.hub.description,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: `${siteUrl}/` },
        {
          "@type": "ListItem",
          position: 2,
          name: "Atendimento por estado e cidade",
          item: `${siteUrl}/atendimento-militar/`,
        },
      ],
    },
  ],
});

for (const state of geoCoverage.states) {
  const stateServices = state.serviceSlugs
    .map((slug) => servicePages.find((page) => page.slug === slug))
    .filter(Boolean);
  const stateCities = geoCoverage.cities.filter((city) => city.stateSlug === state.slug);
  const statePosts = blogPosts
    .filter((post) => getRelatedServiceSlugsForPost(post).some((slug) => state.serviceSlugs.includes(slug)))
    .slice(0, 6);

  writeRoute({
    path: `/atendimento-militar/${state.slug}`,
    title: `Atendimento em Direito Militar em ${state.name} | Aguiar Filgueiras Advocacia`,
    description: `${state.summary} ${state.localAngle}`,
    keywords: [
      `advogado militar ${state.code.toLowerCase()}`,
      `direito militar ${stripAccents(state.name.toLowerCase())}`,
      `atendimento militar ${state.code.toLowerCase()}`,
    ],
    body: geoStateBody(state, stateCities, stateServices, statePosts),
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "LegalService",
        name: "Aguiar Filgueiras Advocacia",
        url: `${siteUrl}/atendimento-militar/${state.slug}/`,
        description: `${state.summary} ${state.localAngle}`,
        serviceType: "Direito Militar",
        areaServed: {
          "@type": "AdministrativeArea",
          name: state.name,
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: `${siteUrl}/` },
          {
            "@type": "ListItem",
            position: 2,
            name: "Atendimento por estado e cidade",
            item: `${siteUrl}/atendimento-militar/`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: state.name,
            item: `${siteUrl}/atendimento-militar/${state.slug}/`,
          },
        ],
      },
    ],
  });
}

for (const city of geoCoverage.cities) {
  const state = geoCoverage.states.find((entry) => entry.slug === city.stateSlug);
  if (!state) continue;

  const cityServices = city.serviceSlugs
    .map((slug) => servicePages.find((page) => page.slug === slug))
    .filter(Boolean);
  const cityPosts = blogPosts
    .filter((post) => getRelatedServiceSlugsForPost(post).some((slug) => city.serviceSlugs.includes(slug)))
    .slice(0, 5);

  writeRoute({
    path: `/atendimento-militar/${state.slug}/${city.slug}`,
    title: `Atendimento em Direito Militar em ${city.name}/${state.code} | Aguiar Filgueiras Advocacia`,
    description: `${city.summary} ${city.localAngle}`,
    keywords: [
      `advogado militar ${stripAccents(city.name.toLowerCase())}`,
      `direito militar ${stripAccents(city.name.toLowerCase())}`,
      `advogado militar ${state.code.toLowerCase()}`,
    ],
    body: geoCityBody(state, city, cityServices, cityPosts),
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "LegalService",
        name: "Aguiar Filgueiras Advocacia",
        url: `${siteUrl}/atendimento-militar/${state.slug}/${city.slug}/`,
        description: `${city.summary} ${city.localAngle}`,
        serviceType: "Direito Militar",
        areaServed: [
          { "@type": "City", name: city.name },
          { "@type": "AdministrativeArea", name: state.name },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: `${siteUrl}/` },
          {
            "@type": "ListItem",
            position: 2,
            name: "Atendimento por estado e cidade",
            item: `${siteUrl}/atendimento-militar/`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: state.name,
            item: `${siteUrl}/atendimento-militar/${state.slug}/`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: city.name,
            item: `${siteUrl}/atendimento-militar/${state.slug}/${city.slug}/`,
          },
        ],
      },
    ],
  });
}

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
        url: `${siteUrl}/#fundador`,
        jobTitle: "Advogado especializado em Direito Militar",
        sameAs: [
          "https://www.instagram.com/carlosfilgueiras.adv",
          "https://www.linkedin.com/in/carlos-filgueiras-992396154/",
          "https://www.facebook.com/carlosfilgueiras.adv",
        ],
      },
      publisher: {
        "@type": "LegalService",
        name: "Aguiar Filgueiras Advocacia",
        url: siteUrl,
      },
    },
  });
}

writeSitemap([
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/blog", changefreq: "weekly", priority: "0.8" },
  { path: "/atendimento-militar", changefreq: "weekly", priority: "0.85" },
  ...geoCoverage.states.map((state) => ({
    path: `/atendimento-militar/${state.slug}`,
    changefreq: "monthly",
    priority: "0.75",
  })),
  ...geoCoverage.cities.map((city) => ({
    path: `/atendimento-militar/${city.stateSlug}/${city.slug}`,
    changefreq: "monthly",
    priority: "0.7",
  })),
  ...servicePages.map((page) => ({ path: `/${page.slug}`, changefreq: "monthly", priority: "0.9" })),
  ...blogPosts.map((post) => ({ path: `/blog/${post.slug}`, changefreq: "monthly", priority: "0.8" })),
]);

console.log(
  `Pre-render SEO concluido: ${
    servicePages.length + blogPosts.length + geoCoverage.states.length + geoCoverage.cities.length + 2
  } rotas.`,
);
