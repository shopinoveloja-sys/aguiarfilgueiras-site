export type BlogTopic = {
  id: string;
  label: string;
  description: string;
  serviceSlugs: string[];
  terms: string[];
};

export type BlogAudience = {
  id: string;
  label: string;
  description: string;
  terms: string[];
  groups: { label: string; query: string }[];
  topics: BlogTopic[];
};

export const blogAudiences: BlogAudience[] = [
  {
    id: "federais",
    label: "Forcas Federais",
    description:
      "Exercito, Marinha, Aeronautica, Policia Federal, Policia Rodoviaria Federal e outros servidores federais.",
    terms: ["militar", "forcas armadas", "exercito", "marinha", "aeronautica", "federal", "prf", "policia federal"],
    groups: [
      { label: "Exercito", query: "exercito" },
      { label: "Marinha", query: "marinha" },
      { label: "Aeronautica", query: "aeronautica" },
      { label: "Policia Federal", query: "policia federal" },
      { label: "Policia Rodoviaria Federal", query: "policia rodoviaria federal" },
      { label: "Outros servidores federais", query: "federal" },
    ],
    topics: [
      {
        id: "todos",
        label: "Todos",
        description: "Todos os artigos aplicaveis ao publico federal.",
        serviceSlugs: [],
        terms: [],
      },
      {
        id: "penal-ipm",
        label: "Penal militar e IPM",
        description: "Crimes militares, IPM, oitivas e defesa tecnica.",
        serviceSlugs: ["direito-penal-militar", "defesa-em-ipm"],
        terms: ["penal", "crime", "ipm", "codigo penal", "inquerito"],
      },
      {
        id: "carreira",
        label: "Carreira militar",
        description: "Promocao, exclusao, licenciamento e reintegracao.",
        serviceSlugs: ["exclusao-das-forcas-armadas", "licenciamento-indevido-militar", "promocao-militar-preterida"],
        terms: ["exclusao", "licenciamento", "promocao", "carreira", "forcas armadas"],
      },
      {
        id: "saude-beneficios",
        label: "Saude, pensao e beneficios",
        description: "Reforma, invalidez, pensao militar e abate-teto.",
        serviceSlugs: ["reforma-militar-por-invalidez", "pensao-militar", "abate-teto-pensao-militar"],
        terms: ["pensao", "previdenciario", "reforma", "invalidez", "abate-teto", "beneficio"],
      },
    ],
  },
  {
    id: "estaduais",
    label: "Forcas Estaduais",
    description:
      "Policiais militares, bombeiros militares e carreiras estaduais com demandas disciplinares e administrativas.",
    terms: ["policial", "bombeiro", "estadual", "disciplinar", "punicao", "administrativo", "transgressao"],
    groups: [
      { label: "Policiais militares", query: "policial" },
      { label: "Bombeiros militares", query: "bombeiro" },
    ],
    topics: [
      {
        id: "todos",
        label: "Todos",
        description: "Todos os artigos aplicaveis ao publico estadual.",
        serviceSlugs: ["punicao-disciplinar-militar", "processo-administrativo-militar", "advogado-direito-militar"],
        terms: [],
      },
      {
        id: "disciplina",
        label: "Disciplina e punicoes",
        description: "Punicoes, transgressoes, ampla defesa e recursos disciplinares.",
        serviceSlugs: ["punicao-disciplinar-militar", "processo-administrativo-militar"],
        terms: ["disciplinar", "punicao", "transgressao", "ampla defesa"],
      },
      {
        id: "processos",
        label: "Processos administrativos",
        description: "Sindicancias, PAD, conselhos e defesa administrativa.",
        serviceSlugs: ["processo-administrativo-militar", "punicao-disciplinar-militar"],
        terms: ["administrativo", "sindicancia", "processo", "conselho", "defesa"],
      },
      {
        id: "carreira-estadual",
        label: "Carreira e permanencia",
        description: "Promocao, exclusao, licenciamento e impactos na carreira estadual.",
        serviceSlugs: ["promocao-militar-preterida", "exclusao-das-forcas-armadas", "licenciamento-indevido-militar"],
        terms: ["promocao", "exclusao", "licenciamento", "carreira", "permanencia"],
      },
    ],
  },
];

export const blogStates = [
  "Todos os estados",
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];

export const normalizeText = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export const getBlogAudienceById = (id: string | null | undefined) =>
  blogAudiences.find((audience) => audience.id === id) || blogAudiences[0];

export const getBlogTopicById = (audienceId: string, topicId: string | null | undefined) => {
  const audience = getBlogAudienceById(audienceId);
  return audience.topics.find((topic) => topic.id === topicId) || audience.topics[0];
};
