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
  "transgressoes-disciplinares-ampla-defesa": [
    "punicao-disciplinar-militar",
    "processo-administrativo-militar",
    "exclusao-das-forcas-armadas",
  ],
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
