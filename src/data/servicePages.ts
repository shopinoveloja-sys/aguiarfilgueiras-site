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
  {
    slug: "licenciamento-indevido-militar",
    eyebrow: "Reintegracao e carreira",
    title: "Licenciamento indevido militar: como requerer a reintegracao",
    seoTitle: "Licenciamento Indevido Militar | Reintegracao",
    seoDescription:
      "Saiba quando o licenciamento militar pode ser indevido e quais medidas podem buscar reintegracao, reforma ou indenizacao.",
    keywords: ["licenciamento indevido militar", "reintegracao militar", "militar temporario licenciamento", "exclusao militar"],
    intro:
      "O licenciamento nem sempre encerra definitivamente a relacao com a Forca. Em alguns casos, falhas no procedimento, problemas de saude ignorados ou ausencia de motivacao permitem contestar o ato.",
    problems: [
      "licenciamento durante tratamento de saude",
      "desligamento sem avaliacao medica adequada",
      "militar temporario licenciado apesar de incapacidade",
      "ato administrativo sem fundamentacao clara",
    ],
    approach: [
      "analise do ato de licenciamento e do historico funcional",
      "verificacao de laudos, inspecoes de saude e tratamento medico",
      "avaliacao de pedido administrativo, acao judicial ou tutela de urgencia",
      "estrategia para reintegracao, reforma ou reparacao conforme o caso",
    ],
    documents: ["ato de licenciamento", "alteracoes/ficha funcional", "laudos e exames", "atestados e prontuario medico"],
    related: ["exclusao-das-forcas-armadas", "reforma-militar-por-invalidez", "advogado-direito-militar"],
  },
  {
    slug: "reforma-militar-por-invalidez",
    eyebrow: "Saude e incapacidade",
    title: "Reforma militar por invalidez: direitos e como requerer",
    seoTitle: "Reforma Militar por Invalidez | Direitos do Militar",
    seoDescription:
      "Entenda quando o militar tem direito a reforma por invalidez, quais provas reunir e como contestar decisao medica ou administrativa.",
    keywords: ["reforma militar por invalidez", "militar incapaz reforma", "junta medica militar", "direitos do militar doente"],
    intro:
      "A incapacidade para o servico militar pode gerar direito a reforma, mas a decisao depende de prova medica, nexo com o servico e correta aplicacao das normas militares.",
    problems: [
      "militar considerado apto apesar de limitacoes reais",
      "incapacidade reconhecida sem concessao de reforma",
      "duvida sobre nexo entre doenca, acidente e servico",
      "licenciamento de militar ainda em tratamento",
    ],
    approach: [
      "organizacao da documentacao medica e funcional",
      "analise de laudos da junta medica militar",
      "avaliacao do nexo causal e da extensao da incapacidade",
      "pedido administrativo ou judicial para proteger remuneracao e carreira",
    ],
    documents: ["ata de inspecao de saude", "laudos medicos", "exames", "comunicados de acidente ou documentos de servico"],
    related: ["licenciamento-indevido-militar", "exclusao-das-forcas-armadas", "advogado-direito-militar"],
  },
  {
    slug: "pensao-militar",
    eyebrow: "Familiares e dependentes",
    title: "Pensao militar: quem tem direito e como garantir",
    seoTitle: "Pensao Militar | Direitos de Familiares",
    seoDescription:
      "Orientacao sobre pensao militar, dependentes, documentos, revisoes e medidas para proteger direitos de familiares e pensionistas.",
    keywords: ["pensao militar", "pensao militar regras", "dependentes de militar", "direito previdenciario militar"],
    intro:
      "A pensao militar envolve regras proprias e exige cuidado com habilitacao de dependentes, documentos, prazos e eventuais descontos ou revisoes indevidas.",
    problems: [
      "duvidas sobre quem pode ser habilitado como dependente",
      "negativa ou demora na concessao da pensao",
      "divisao de cotas entre familiares",
      "descontos, revisoes ou abate-teto aplicados ao beneficio",
    ],
    approach: [
      "identificacao dos dependentes e da regra aplicavel",
      "conferencia da documentacao civil, militar e previdenciaria",
      "pedido administrativo de habilitacao ou revisao",
      "acao judicial quando houver negativa, demora ou desconto irregular",
    ],
    documents: ["certidao de obito", "documentos dos dependentes", "contracheques", "processo de habilitacao"],
    related: ["abate-teto-pensao-militar", "advogado-direito-militar", "advogado-militar-brasilia"],
  },
  {
    slug: "abate-teto-pensao-militar",
    eyebrow: "Revisao de descontos",
    title: "Abate-teto na pensao militar: o que e e como contestar",
    seoTitle: "Abate-teto Pensao Militar | Como Contestar",
    seoDescription:
      "Entenda o abate-teto na pensao militar, quando o desconto pode ser contestado e quais documentos ajudam na revisao.",
    keywords: ["abate-teto pensao militar", "desconto pensao militar", "teto constitucional pensao militar", "revisao pensao militar"],
    intro:
      "O abate-teto pode reduzir de forma relevante a pensao militar. Antes de aceitar o desconto, e preciso verificar a base de calculo, a acumulacao de beneficios e os fundamentos usados pela administracao.",
    problems: [
      "reducoes inesperadas no contracheque da pensionista",
      "aplicacao de teto sem explicacao suficiente",
      "duvidas sobre acumulacao de pensao e aposentadoria",
      "necessidade de revisar valores ja descontados",
    ],
    approach: [
      "comparacao dos contracheques antes e depois do desconto",
      "analise da base juridica aplicada pela administracao",
      "calculo preliminar dos valores discutidos",
      "pedido de revisao administrativa ou medida judicial",
    ],
    documents: ["contracheques", "ato de concessao da pensao", "comunicacao do desconto", "documentos de outros beneficios"],
    related: ["pensao-militar", "advogado-direito-militar", "advogado-militar-brasilia"],
  },
  {
    slug: "promocao-militar-preterida",
    eyebrow: "Carreira e antiguidade",
    title: "Promocao militar preterida: quando e como contestar",
    seoTitle: "Promocao Militar Preterida | Como Contestar",
    seoDescription:
      "Militar preterido em promocao pode avaliar criterios, documentos e medidas para contestar ilegalidades e proteger a carreira.",
    keywords: ["promocao militar preterida", "pretericao militar", "carreira militar promocao", "direito administrativo militar"],
    intro:
      "A promocao militar depende de criterios formais e historico funcional. Quando ha pretericao indevida, o prejuizo pode refletir em remuneracao, antiguidade e progressao.",
    problems: [
      "militar ultrapassado por colega em situacao semelhante",
      "pontuacao, conceito ou avaliacao funcional questionavel",
      "punicao ou anotacao usada de forma irregular",
      "ausencia de fundamentacao para a nao promocao",
    ],
    approach: [
      "analise das regras de promocao e documentos da carreira",
      "comparacao objetiva dos criterios aplicados",
      "identificacao de erro material, nulidade ou discriminacao",
      "pedido de revisao, recurso administrativo ou acao judicial",
    ],
    documents: ["ficha funcional", "quadros de acesso", "boletins", "avaliacoes e punicoes"],
    related: ["punicao-disciplinar-militar", "processo-administrativo-militar", "advogado-direito-militar"],
  },
  {
    slug: "processo-administrativo-militar",
    eyebrow: "Defesa administrativa",
    title: "Processo administrativo militar: como funciona a defesa",
    seoTitle: "Processo Administrativo Militar | Defesa",
    seoDescription:
      "Defesa em processo administrativo militar, sindicancia, conselho de disciplina e procedimentos que podem afetar carreira e permanencia.",
    keywords: ["processo administrativo militar", "defesa processo administrativo militar", "sindicancia militar", "conselho de disciplina"],
    intro:
      "Processos administrativos militares exigem resposta tecnica, respeito a prazos e atencao ao contraditorio. Uma defesa incompleta pode gerar reflexos duradouros na carreira.",
    problems: [
      "notificacao para sindicancia, PAD ou conselho de disciplina",
      "dificuldade de acessar documentos e provas",
      "prazo curto para apresentar defesa",
      "risco de punicao, licenciamento ou exclusao",
    ],
    approach: [
      "leitura integral do procedimento e dos prazos",
      "mapeamento de provas, testemunhas e inconsistencias",
      "elaboracao de defesa tecnica e pedidos de diligencia",
      "acompanhamento de recurso ou judicializacao quando necessario",
    ],
    documents: ["notificacao", "portaria de instauracao", "autos do procedimento", "provas e nomes de testemunhas"],
    related: ["punicao-disciplinar-militar", "defesa-em-ipm", "exclusao-das-forcas-armadas"],
  },
];

export const getServicePageBySlug = (slug: string | undefined) =>
  servicePages.find((page) => page.slug === slug);
