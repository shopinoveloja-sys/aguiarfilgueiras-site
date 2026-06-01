import posts from "./blogPosts.json";

export type BlogPost = {
  id: number;
  slug: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
  carlosComment: string;
  content: string[];
};

export const blogPosts = posts as BlogPost[];

export const getBlogPostBySlug = (slug: string | undefined) =>
  blogPosts.find((post) => post.slug === slug);

const manualRelatedServices: Record<string, string[]> = {
  "reforma-codigo-penal-militar": ["direito-penal-militar", "defesa-em-ipm", "processo-administrativo-militar"],
  "pensao-militar-direitos-dependentes": ["pensao-militar", "abate-teto-pensao-militar", "advogado-direito-militar"],
  "transgressoes-disciplinares-ampla-defesa": [
    "punicao-disciplinar-militar",
    "processo-administrativo-militar",
    "exclusao-das-forcas-armadas",
  ],
};

const relatedServiceRules = [
  { slug: "punicao-disciplinar-militar", terms: ["punicao", "disciplinar", "transgressao", "tac", "termo de ajuste", "pmmg"] },
  { slug: "processo-administrativo-militar", terms: ["processo administrativo", "sindicancia", "conselho", "defesa administrativa", "tac", "pmmg"] },
  { slug: "defesa-em-ipm", terms: ["ipm", "inquerito", "oitiva", "depoimento", "investigacao"] },
  { slug: "direito-penal-militar", terms: ["penal", "crime", "codigo penal", "desercao", "acusado"] },
  { slug: "exclusao-das-forcas-armadas", terms: ["exclusao", "desligamento", "forcas armadas"] },
  { slug: "licenciamento-indevido-militar", terms: ["licenciamento", "reintegracao", "temporario"] },
  { slug: "reforma-militar-por-invalidez", terms: ["reforma", "invalidez", "incapacidade", "junta medica", "saude"] },
  { slug: "pensao-militar", terms: ["pensao", "dependente", "previdenciario", "beneficio"] },
  { slug: "abate-teto-pensao-militar", terms: ["abate-teto", "desconto", "teto constitucional"] },
  { slug: "promocao-militar-preterida", terms: ["promocao", "preterida", "pretericao", "antiguidade"] },
  { slug: "advogado-direito-militar", terms: ["advogado militar", "direito militar", "defesa militar", "pmmg", "policial militar", "bombeiro"] },
];

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export const getRelatedServiceSlugsForPost = (slug: string | undefined) => {
  if (!slug) return ["advogado-direito-militar", "advogado-militar-brasilia"];
  if (manualRelatedServices[slug]) return manualRelatedServices[slug];

  const post = getBlogPostBySlug(slug);
  if (!post) return ["advogado-direito-militar", "advogado-militar-brasilia"];

  const text = normalize(
    [
      post.slug,
      post.category,
      post.title,
      post.excerpt,
      post.seoTitle || "",
      post.seoDescription || "",
      ...(post.keywords || []),
    ].join(" "),
  );

  const matches = relatedServiceRules
    .map((rule) => ({
      slug: rule.slug,
      score: rule.terms.filter((term) => text.includes(normalize(term))).length,
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.slug);

  return Array.from(new Set([...matches, "advogado-direito-militar", "advogado-militar-brasilia"])).slice(0, 3);
};
