export type ServicePage = {
  slug: string;
  eyebrow: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  intro: string;
  problems: string[];
  approach: string[];
  documents: string[];
  related: string[];
};

export const servicePages: ServicePage[] = [
  {
    slug: "advogado-direito-militar",
    eyebrow: "Atuacao nacional",
    title: "Advogado especialista em Direito Militar",
    seoTitle: "Advogado Direito Militar | Aguiar Filgueiras",
    seoDescription:
      "Advocacia especializada em Direito Militar para defesa penal, disciplinar, administrativa e previdenciaria de militares em todo o Brasil.",
    keywords: ["advogado direito militar", "advogado militar", "direito militar", "advocacia militar"],
    intro:
      "O Direito Militar exige leitura tecnica da legislacao, conhecimento da rotina das Forcas Armadas e estrategia para proteger carreira, remuneracao e direitos funcionais.",
    problems: [
      "responder a IPM, sindicancia, conselho de disciplina ou processo administrativo",
      "contestar punicao disciplinar, licenciamento ou exclusao",
      "avaliar pensao, reforma militar, invalidez ou abate-teto",
      "buscar orientacao antes de assinar documentos ou apresentar defesa",
    ],
    approach: [
      "analise inicial dos documentos e prazos",
      "definicao da tese juridica mais adequada ao caso",
      "atuacao administrativa ou judicial conforme a urgencia",
      "comunicacao objetiva para que o militar saiba cada proximo passo",
    ],
    documents: ["portaria ou notificacao", "ficha funcional", "boletins internos", "decisoes administrativas"],
    related: ["defesa-em-ipm", "punicao-disciplinar-militar", "direito-penal-militar"],
  },
  {
    slug: "advogado-militar-brasilia",
    eyebrow: "Brasilia e atendimento virtual",
    title: "Advogado militar em Brasilia com atendimento nacional",
    seoTitle: "Advogado Militar Brasilia | Atendimento Nacional",
    seoDescription:
      "Advogado militar em Brasilia para militares das Forcas Armadas, familiares e pensionistas. Atendimento virtual em todo o Brasil.",
    keywords: ["advogado militar brasilia", "advogado militar df", "advocacia militar brasilia"],
    intro:
      "Brasilia concentra orgaos administrativos, comandos e tribunais relevantes para causas militares. A atuacao local, aliada ao atendimento virtual, permite acompanhar casos em todo o pais.",
    problems: [
      "militar notificado em organizacao militar no DF ou em outro estado",
      "familiares e pensionistas com duvidas previdenciarias",
      "defesa administrativa que exige resposta rapida",
      "processos judiciais relacionados a carreira militar",
    ],
    approach: [
      "reuniao virtual ou presencial em Taguatinga Norte",
      "organizacao da linha do tempo do caso",
      "mapeamento de riscos imediatos para a carreira",
      "protocolo de medidas administrativas ou judiciais cabiveis",
    ],
    documents: ["identidade militar", "documentos do processo", "contracheques", "comunicacoes recebidas"],
    related: ["advogado-direito-militar", "defesa-em-ipm", "punicao-disciplinar-militar"],
  },
  {
    slug: "direito-penal-militar",
    eyebrow: "Defesa tecnica",
    title: "Direito Penal Militar: defesa em crimes militares",
    seoTitle: "Direito Penal Militar | Defesa em Crimes Militares",
    seoDescription:
      "Defesa em Direito Penal Militar para militares investigados ou acusados em IPM, acao penal militar e procedimentos correlatos.",
    keywords: ["direito penal militar", "crime militar", "advogado penal militar", "codigo penal militar crimes"],
    intro:
      "Uma acusacao penal militar pode atingir a liberdade, a reputacao e a carreira. A defesa precisa considerar tanto o processo penal quanto os reflexos funcionais.",
    problems: [
      "instauracao de IPM ou acao penal militar",
      "acusacoes de desercao, insubordinacao, abandono de posto ou lesao",
      "oitivas e interrogatorios sem preparacao adequada",
      "risco de reflexo disciplinar ou administrativo",
    ],
    approach: [
      "avaliacao da tipificacao e das provas existentes",
      "preparacao para depoimentos e atos do procedimento",
      "estrategia de defesa penal e funcional integrada",
      "acompanhamento ate decisao ou recurso",
    ],
    documents: ["portaria do IPM", "termo de inquiricao", "denuncia", "boletim de ocorrencia"],
    related: ["defesa-em-ipm", "punicao-disciplinar-militar", "advogado-direito-militar"],
  },
  {
    slug: "defesa-em-ipm",
    eyebrow: "Inquerito policial militar",
    title: "Defesa em IPM: como agir no inquerito policial militar",
    seoTitle: "Defesa em IPM | Inquerito Policial Militar",
    seoDescription:
      "Orientacao juridica para militares em IPM. Entenda riscos, documentos, depoimentos e medidas de defesa desde o inicio da investigacao.",
    keywords: ["defesa militar IPM", "como contestar IPM", "inquerito policial militar IPM", "advogado IPM"],
    intro:
      "O IPM e uma fase de apuracao, mas o que acontece nele pode definir o rumo de uma acusacao penal militar ou de medidas disciplinares.",
    problems: [
      "militar chamado para prestar declaracao",
      "apreensao de documentos, mensagens ou equipamentos",
      "dificuldade de acesso aos autos",
      "receio de que o procedimento vire denuncia",
    ],
    approach: [
      "verificacao da portaria e do objeto da investigacao",
      "orientacao antes de depoimentos",
      "pedido de acesso e organizacao das provas",
      "atuacao para evitar conclusoes precipitadas",
    ],
    documents: ["numero do IPM", "notificacao", "portaria", "documentos e conversas relacionados aos fatos"],
    related: ["direito-penal-militar", "punicao-disciplinar-militar", "advogado-direito-militar"],
  },
  {
    slug: "punicao-disciplinar-militar",
    eyebrow: "Defesa disciplinar",
    title: "Punicao disciplinar militar: o que fazer se voce foi punido",
    seoTitle: "Punicao Disciplinar Militar | Defesa e Recurso",
    seoDescription:
      "Recebeu punicao disciplinar militar? Saiba quando contestar, quais documentos reunir e como proteger sua carreira.",
    keywords: ["punicao disciplinar militar", "recurso punicao militar", "direito disciplinar militar"],
    intro:
      "Punicoes disciplinares podem parecer pequenas no inicio, mas costumam impactar carreira, conceito, promocao e permanencia na Forca.",
    problems: [
      "punicao aplicada sem contraditorio efetivo",
      "prazo curto para recurso ou reconsideracao",
      "fatos descritos de forma generica",
      "medo de represalia ou prejuizo na carreira",
    ],
    approach: [
      "analise do regulamento aplicavel e dos prazos",
      "identificacao de nulidades e falhas de motivacao",
      "elaboracao de defesa, recurso ou medida judicial",
      "avaliacao dos reflexos funcionais da punicao",
    ],
    documents: ["nota de punicao", "boletim interno", "defesa apresentada", "provas e testemunhas"],
    related: ["direito-penal-militar", "defesa-em-ipm", "advogado-direito-militar"],
  },
  {
    slug: "exclusao-das-forcas-armadas",
    eyebrow: "Carreira militar",
    title: "Exclusao das Forcas Armadas: quando e ilegal e como contestar",
    seoTitle: "Exclusao das Forcas Armadas | Como Contestar",
    seoDescription:
      "Entenda quando a exclusao das Forcas Armadas pode ser contestada e quais medidas podem proteger a carreira do militar.",
    keywords: ["exclusao forcas armadas direitos", "exclusao militar", "licenciamento indevido militar"],
    intro:
      "A exclusao ou o licenciamento podem encerrar uma carreira inteira. Antes de aceitar a decisao, e importante avaliar o procedimento, a motivacao e os direitos envolvidos.",
    problems: [
      "licenciamento sem analise adequada de saude ou estabilidade",
      "exclusao apos procedimento disciplinar",
      "desligamento de militar temporario em situacao irregular",
      "decisao administrativa sem fundamentacao suficiente",
    ],
    approach: [
      "reconstrucao da carreira e dos fatos que levaram ao desligamento",
      "analise de nulidades no procedimento",
      "avaliacao de reintegracao, reforma ou indenizacao",
      "atuacao administrativa ou judicial conforme o caso",
    ],
    documents: ["ato de licenciamento ou exclusao", "historico funcional", "laudos medicos", "procedimento disciplinar"],
    related: ["punicao-disciplinar-militar", "defesa-em-ipm", "advogado-direito-militar"],
  },
];

export const getServicePageBySlug = (slug: string | undefined) =>
  servicePages.find((page) => page.slug === slug);
