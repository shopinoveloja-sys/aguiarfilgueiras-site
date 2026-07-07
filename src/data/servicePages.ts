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
    title: "Advogado de Direito Militar para defesa da carreira e dos seus direitos",
    seoTitle: "Advogado de Direito Militar | Defesa Militar em Todo o Brasil",
    seoDescription:
      "Advogado de Direito Militar para IPM, punicao disciplinar, sindicancia, licenciamento, reforma e pensao militar. Atendimento em Brasilia e online.",
    keywords: ["advogado direito militar", "advogado militar", "direito militar", "advocacia militar"],
    intro:
      "Se voce procura advogado de Direito Militar, o ponto central e agir cedo. Casos envolvendo IPM, punicao disciplinar, sindicancia, licenciamento, saude e pensao militar exigem leitura tecnica dos documentos, dos prazos e dos reflexos na carreira.",
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
    title: "Advogado militar em Brasilia e no DF com atendimento nacional",
    seoTitle: "Advogado Militar DF e Brasilia | Aguiar Filgueiras",
    seoDescription:
      "Advogado militar em Brasilia e no DF para IPM, punicao disciplinar, licenciamento, junta medica e questoes de carreira, com atendimento nacional.",
    keywords: ["advogado militar brasilia", "advogado militar df", "advocacia militar brasilia"],
    intro:
      "Quem busca advogado militar em Brasilia ou no DF geralmente precisa de resposta rapida para IPM, punicao disciplinar, licenciamento, junta medica ou questao funcional. A atuacao local, somada ao atendimento virtual, permite acompanhar casos administrativos e judiciais em todo o Brasil.",
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
    title: "Foi intimado para IPM? Como funciona a defesa no inquerito policial militar",
    seoTitle: "Advogado para IPM | Defesa em Inquerito Policial Militar",
    seoDescription:
      "Foi intimado para IPM? Veja como funciona a defesa em inquerito policial militar, quais documentos separar e como se preparar antes da oitiva.",
    keywords: ["defesa militar IPM", "como contestar IPM", "inquerito policial militar IPM", "advogado IPM"],
    intro:
      "Quem recebe intimacao para IPM costuma ter pouco tempo para entender o caso e se preparar para a oitiva. A defesa em inquerito policial militar comeca pela leitura da portaria, pelo acesso aos autos e pela organizacao dos documentos, mensagens e registros ligados aos fatos.",
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
  {
    slug: "sindicancia-militar",
    eyebrow: "Apuracao preliminar",
    title: "Sindicancia militar: prazo, documentos e estrategia de defesa",
    seoTitle: "Sindicancia Militar | Prazo, Defesa e Documentos",
    seoDescription:
      "Recebeu notificacao de sindicancia militar? Entenda prazo, documentos importantes, riscos para a carreira e como organizar a defesa.",
    keywords: ["sindicancia militar", "defesa em sindicancia militar", "prazo sindicancia militar", "advogado militar"],
    intro:
      "A sindicancia militar costuma ser tratada como fase preliminar, mas pode produzir provas, sustentar punicoes e influenciar processos administrativos ou penais posteriores.",
    problems: [
      "notificacao com prazo curto para apresentar manifestacao",
      "fatos narrados de forma vaga ou sem acesso completo aos documentos",
      "duvida sobre testemunhas, mensagens e provas que devem ser guardadas",
      "receio de que a sindicancia evolua para PAD, conselho ou punicao disciplinar",
    ],
    approach: [
      "conferencia da portaria, da finalidade da sindicancia e da data de ciencia",
      "organizacao imediata de documentos, mensagens, boletins e nomes de testemunhas",
      "definicao de estrategia para defesa escrita, pedido de diligencias e acesso aos autos",
      "avaliacao dos reflexos da apuracao na carreira e em procedimentos futuros",
    ],
    documents: ["notificacao ou portaria", "boletim interno", "mensagens e e-mails", "nomes de testemunhas e documentos funcionais"],
    related: ["processo-administrativo-militar", "punicao-disciplinar-militar", "advogado-direito-militar"],
  },
  {
    slug: "conselho-de-disciplina-militar",
    eyebrow: "Permanencia na carreira",
    title: "Conselho de disciplina militar: como funciona e quando se defender",
    seoTitle: "Conselho de Disciplina Militar | Como se Defender",
    seoDescription:
      "Entenda como funciona o conselho de disciplina militar, quais provas reunir e quando agir para proteger a permanencia na carreira.",
    keywords: ["conselho de disciplina militar", "defesa conselho de disciplina", "processo disciplinar militar", "advogado militar"],
    intro:
      "O conselho de disciplina pode comprometer a permanencia do militar na carreira. Por isso, a defesa precisa ser tecnica, documentada e alinhada aos riscos funcionais do caso.",
    problems: [
      "instauracao de conselho apos punicao ou acusacao considerada grave",
      "falta de clareza sobre provas, testemunhas e etapas do procedimento",
      "risco de exclusao, licenciamento ou perda de estabilidade funcional",
      "necessidade de responder rapidamente sem cometer contradicoes",
    ],
    approach: [
      "leitura integral da portaria, das pecas ja juntadas e dos fundamentos do conselho",
      "mapeamento de nulidades, contradicoes e provas favoraveis ao militar",
      "preparacao de defesa escrita, testemunhas e atos do procedimento",
      "avaliacao de medidas administrativas ou judiciais conforme a urgencia",
    ],
    documents: ["portaria de instauracao", "punicoes anteriores", "ficha funcional", "provas e nomes de testemunhas"],
    related: ["processo-administrativo-militar", "exclusao-das-forcas-armadas", "punicao-disciplinar-militar"],
  },
  {
    slug: "junta-medica-militar",
    eyebrow: "Saude e capacidade",
    title: "Junta medica militar: como contestar conclusao e proteger seus direitos",
    seoTitle: "Junta Medica Militar | Como Contestar a Conclusao",
    seoDescription:
      "Saiba como contestar a conclusao da junta medica militar, quais laudos reunir e quando agir para proteger reforma, licenciamento e remuneracao.",
    keywords: ["junta medica militar", "contestar junta medica militar", "laudo militar incapacidade", "reforma militar"],
    intro:
      "A conclusao da junta medica militar pode definir se o militar sera considerado apto, incapaz, reformado ou licenciado. Uma analise superficial nessa fase gera prejuizos duradouros.",
    problems: [
      "junta medica conclui aptidao apesar de limitacoes reais",
      "duvida sobre nexo entre doenca, acidente e servico",
      "risco de licenciamento durante tratamento ou recuperacao",
      "falta de organizacao de laudos, exames e historico funcional",
    ],
    approach: [
      "reuniao da documentacao medica e funcional antes da inspecao decisiva",
      "comparacao entre laudos particulares, atas de inspecao e restricoes reais",
      "avaliacao de pedido administrativo, recurso ou medida judicial urgente",
      "estrategia para proteger remuneracao, permanencia ou direito a reforma",
    ],
    documents: ["ata de inspecao de saude", "laudos particulares", "exames", "atestados, prontuario e documentos do servico"],
    related: ["reforma-militar-por-invalidez", "licenciamento-indevido-militar", "advogado-direito-militar"],
  },
  {
    slug: "desercao-militar",
    eyebrow: "Acusacao penal militar",
    title: "Desercao militar: consequencias e direitos do acusado",
    seoTitle: "Desercao Militar | Consequencias e Direitos do Acusado",
    seoDescription:
      "Entenda as consequencias da desercao militar, os riscos penais e disciplinares e quando buscar defesa tecnica para proteger seus direitos.",
    keywords: ["desercao militar", "crime de desercao", "advogado penal militar", "direito penal militar"],
    intro:
      "A acusacao de desercao militar costuma gerar impacto imediato na carreira e exige orientacao tecnica para avaliar fato, prazo, justificativas e reflexos penais e administrativos.",
    problems: [
      "militar ou familiar sem clareza sobre o que caracteriza desercao",
      "receio de prisao, punicao disciplinar e exclusao da carreira",
      "necessidade de organizar rapidamente justificativas e documentos",
      "duvida sobre apresentacao voluntaria, atestados e provas de impedimento",
    ],
    approach: [
      "analise da cronologia dos fatos e da documentacao existente",
      "avaliacao da configuracao juridica da desercao e de eventuais justificativas",
      "organizacao de laudos, atestados, comprovantes e testemunhas",
      "defesa integrada para os reflexos penais, administrativos e funcionais",
    ],
    documents: ["comunicacoes oficiais", "atestados e laudos", "comprovantes de deslocamento ou impedimento", "ficha funcional e boletins"],
    related: ["direito-penal-militar", "defesa-em-ipm", "advogado-direito-militar"],
  },
  {
    slug: "militar-temporario-licenciado",
    eyebrow: "Temporario e saude",
    title: "Militar temporario licenciado: quando o desligamento pode ser contestado",
    seoTitle: "Militar Temporario Licenciado | Quando Contestar",
    seoDescription:
      "Saiba quando o licenciamento de militar temporario pode ser contestado, especialmente em casos de tratamento de saude, incapacidade e reintegracao.",
    keywords: ["militar temporario licenciado", "militar temporario licenciamento", "reintegracao militar temporario", "licenciamento indevido militar"],
    intro:
      "O licenciamento de militar temporario exige analise tecnica do motivo do desligamento, da situacao de saude e da documentacao funcional. Nem todo encerramento do vinculo e automaticamente regular.",
    problems: [
      "licenciamento durante tratamento de saude ou recuperacao funcional",
      "dificuldade de provar incapacidade ou nexo com o servico",
      "ato de desligamento com motivacao insuficiente ou pouco clara",
      "duvida sobre reintegracao, reforma ou indenizacao cabivel",
    ],
    approach: [
      "reconstrucao da linha do tempo funcional e medica do militar temporario",
      "analise do ato de licenciamento, das inspecoes de saude e dos laudos existentes",
      "avaliacao de pedido administrativo, medida judicial ou tutela de urgencia",
      "definicao da estrategia mais adequada para reintegracao, reforma ou reparacao",
    ],
    documents: ["ato de licenciamento", "ficha funcional", "laudos e exames", "prontuario, atestados e documentos do servico"],
    related: ["licenciamento-indevido-militar", "reforma-militar-por-invalidez", "junta-medica-militar"],
  },
  {
    slug: "concurso-militar-eliminacao",
    eyebrow: "Ingresso na carreira",
    title: "Concurso militar: eliminacao em exame medico ou investigacao social",
    seoTitle: "Concurso Militar | Eliminacao em Exame Medico ou Investigacao Social",
    seoDescription:
      "Entenda quando a eliminacao em concurso militar por exame medico, teste ou investigacao social pode ser contestada com apoio juridico.",
    keywords: ["concurso militar eliminacao", "eliminacao exame medico concurso militar", "investigacao social concurso militar", "advogado concurso militar"],
    intro:
      "A eliminacao em concurso militar precisa ser comparada com o edital, os exames, a justificativa da banca e o direito de recurso. Em muitos casos, a decisao merece revisao tecnica.",
    problems: [
      "eliminacao em exame medico, odontologico ou psicologico",
      "investigacao social com fundamento generico ou sem clareza",
      "restricao por laudo, tatuagem, visao, ortopedia ou antecedentes",
      "prazo curto para recurso administrativo ou medida urgente",
    ],
    approach: [
      "leitura do edital e dos criterios usados para a eliminacao",
      "organizacao de exames, laudos e documentos pessoais relevantes",
      "avaliacao do recurso administrativo e da urgencia judicial do caso",
      "definicao de estrategia com foco em prazo, prova tecnica e legalidade do ato",
    ],
    documents: ["edital", "resultado da etapa", "laudos e exames", "documentos pessoais e comunicacoes da banca"],
    related: ["advogado-direito-militar", "junta-medica-militar", "advogado-militar-brasilia"],
  },
  {
    slug: "conselho-de-justificacao",
    eyebrow: "Oficiais e permanencia",
    title: "Conselho de justificacao: como funciona e quando agir",
    seoTitle: "Conselho de Justificacao | Como Funciona e Quando Agir",
    seoDescription:
      "Veja como funciona o conselho de justificacao, quais documentos reunir e quando buscar defesa tecnica para proteger a carreira do oficial.",
    keywords: ["conselho de justificacao", "defesa conselho de justificacao", "oficial conselho de justificacao", "advogado militar"],
    intro:
      "O conselho de justificacao exige defesa cuidadosa porque pode comprometer a permanencia do oficial na carreira e gerar efeitos profundos sobre sua vida funcional.",
    problems: [
      "oficial notificado para responder a conselho de justificacao",
      "falta de clareza sobre os fatos, provas e etapas do procedimento",
      "risco para permanencia, reputacao funcional e progressao na carreira",
      "necessidade de reunir historico, documentos e estrategia em pouco tempo",
    ],
    approach: [
      "analise completa da portaria e das pecas iniciais do procedimento",
      "organizacao do historico funcional, elogios, punicoes e provas do caso",
      "definicao da tese de defesa e preparo dos atos do conselho",
      "avaliacao de medidas administrativas ou judiciais conforme a gravidade",
    ],
    documents: ["portaria", "ficha funcional", "boletins e atos anteriores", "provas e nomes de testemunhas"],
    related: ["conselho-de-disciplina-militar", "processo-administrativo-militar", "advogado-direito-militar"],
  },
  {
    slug: "advogado-criminal-militar",
    eyebrow: "Defesa penal especializada",
    title: "Advogado criminal militar para acusacoes e investigacoes sensiveis",
    seoTitle: "Advogado Criminal Militar | Defesa Penal Militar",
    seoDescription:
      "Advogado criminal militar para IPM, acao penal militar, desercao, insubordinacao e demais acusacoes com reflexo na liberdade e na carreira.",
    keywords: ["advogado criminal militar", "advogado penal militar", "defesa penal militar", "crime militar advogado"],
    intro:
      "Quando a acusacao envolve crime militar, a defesa precisa olhar ao mesmo tempo para prova, procedimento, liberdade e impactos funcionais. E uma area que nao admite improviso.",
    problems: [
      "acusacao penal militar com risco para liberdade e carreira",
      "IPM ou oitiva sem preparacao adequada",
      "desercao, insubordinacao, desacato, violencia ou abandono de posto",
      "necessidade de alinhar defesa penal e reflexos administrativos",
    ],
    approach: [
      "analise tecnica do enquadramento penal e dos autos existentes",
      "preparacao para depoimentos, interrogatorios e atos do procedimento",
      "organizacao da prova defensiva desde o inicio da apuracao",
      "estrategia integrada para os reflexos penais e funcionais do caso",
    ],
    documents: ["portaria do IPM", "intimacoes", "denuncia ou acusacao", "mensagens, documentos e nomes de testemunhas"],
    related: ["direito-penal-militar", "defesa-em-ipm", "desercao-militar"],
  },
  {
    slug: "reintegracao-militar",
    eyebrow: "Retorno ao servico",
    title: "Reintegracao militar: quando o retorno pode ser buscado",
    seoTitle: "Reintegracao Militar | Quando Pode Ser Buscada",
    seoDescription:
      "Saiba quando a reintegracao militar pode ser buscada em casos de licenciamento indevido, saude, nulidades e desligamento irregular.",
    keywords: ["reintegracao militar", "reintegracao militar temporario", "retorno ao servico militar", "licenciamento indevido militar"],
    intro:
      "A reintegracao militar depende de analisar o motivo do desligamento, a prova medica ou funcional e a regularidade do procedimento administrativo que encerrou o vinculo.",
    problems: [
      "licenciamento ou exclusao com indicios de irregularidade",
      "desligamento durante tratamento de saude ou incapacidade funcional",
      "ato administrativo sem motivacao suficiente",
      "duvida entre reintegracao, reforma ou pedido indenizatorio",
    ],
    approach: [
      "reconstrucao da linha do tempo funcional e dos atos administrativos",
      "avaliacao da base juridica para retorno ao servico ou medida alternativa",
      "organizacao de laudos, historico funcional e documentos do caso",
      "atuacao administrativa ou judicial conforme a urgencia da situacao",
    ],
    documents: ["ato de desligamento", "ficha funcional", "laudos e exames", "portarias, boletins e demais documentos do caso"],
    related: ["licenciamento-indevido-militar", "militar-temporario-licenciado", "reforma-militar-por-invalidez"],
  },
  {
    slug: "policial-militar-punicao-disciplinar",
    eyebrow: "Policia Militar",
    title: "Punicao disciplinar de policial militar: como organizar a defesa",
    seoTitle: "Policial Militar Punicao Disciplinar | Como se Defender",
    seoDescription:
      "Entenda como agir em punicao disciplinar de policial militar, quais documentos reunir e quando recorrer para proteger a carreira.",
    keywords: ["policial militar punicao disciplinar", "recurso punicao policial militar", "defesa disciplinar policial militar", "advogado policial militar"],
    intro:
      "Para o policial militar, uma punicao disciplinar pode repercutir em conceito, escala, curso, promocao e permanencia. A resposta precisa ser tecnica e proporcional ao caso.",
    problems: [
      "nota de punicao ou comunicacao recebida com prazo curto para defesa",
      "fatos mal descritos ou sem documentacao completa",
      "medo de agravamento funcional ou represalia interna",
      "duvida sobre recurso, reconsideracao e prova util para o caso",
    ],
    approach: [
      "leitura da nota de punicao e do regulamento aplicavel",
      "organizacao de boletins, mensagens, escalas e testemunhas",
      "avaliacao da tese de defesa e dos reflexos na carreira policial militar",
      "elaboracao de recurso administrativo ou medida judicial quando cabivel",
    ],
    documents: ["nota de punicao", "boletim interno", "escalas, mensagens e ordens de servico", "nomes de testemunhas e ficha funcional"],
    related: ["punicao-disciplinar-militar", "processo-administrativo-militar", "advogado-direito-militar"],
  },
  {
    slug: "bombeiro-militar-punicao-disciplinar",
    eyebrow: "Corpo de Bombeiros Militar",
    title: "Punicao disciplinar de bombeiro militar: o que fazer no inicio",
    seoTitle: "Bombeiro Militar Punicao Disciplinar | O Que Fazer",
    seoDescription:
      "Veja como agir em punicao disciplinar de bombeiro militar, quais documentos separar e quando buscar defesa tecnica.",
    keywords: ["bombeiro militar punicao disciplinar", "defesa disciplinar bombeiro militar", "recurso punicao bombeiro militar", "advogado bombeiro militar"],
    intro:
      "No Corpo de Bombeiros Militar, procedimentos disciplinares tambem podem afetar conceito, escala, promocao e estabilidade funcional. O inicio da defesa faz diferenca no resultado.",
    problems: [
      "punicao aplicada com descricao generica ou incompleta dos fatos",
      "prazo curto para responder ou recorrer",
      "dificuldade de reunir documentos operacionais e testemunhas",
      "receio de prejuizo em cursos, funcao e progressao funcional",
    ],
    approach: [
      "analise da comunicacao disciplinar e do regulamento aplicavel",
      "mapeamento das provas operacionais e funcionais relevantes",
      "organizacao da resposta defensiva dentro do prazo real do caso",
      "avaliacao de recurso ou medida judicial conforme o risco funcional",
    ],
    documents: ["nota de punicao", "boletins", "ordens de servico, escalas e registros operacionais", "testemunhas e ficha funcional"],
    related: ["punicao-disciplinar-militar", "processo-administrativo-militar", "advogado-direito-militar"],
  },
  {
    slug: "intimado-para-ipm",
    eyebrow: "Urgencia e defesa inicial",
    title: "Fui intimado para IPM: o que fazer no inicio",
    seoTitle: "Fui Intimado para IPM | O Que Fazer no Inicio",
    seoDescription:
      "Recebeu intimacao para IPM? Entenda o que fazer no inicio, quais documentos separar e como evitar erros em depoimento e investigacao militar.",
    keywords: ["fui intimado para ipm", "intimado para ipm o que fazer", "intimacao ipm", "advogado ipm"],
    intro:
      "Receber intimacao para IPM costuma gerar pressa e inseguranca. O ponto principal no inicio e entender o objeto da apuracao, separar os documentos certos e evitar manifestacoes precipitadas.",
    problems: [
      "militar intimado sem saber exatamente o que esta sendo apurado",
      "prazo curto para comparecimento ou prestacao de declaracoes",
      "risco de depor sem conhecer a linha documental do caso",
      "medo de que a investigacao gere denuncia ou reflexo disciplinar",
    ],
    approach: [
      "leitura da intimacao, da portaria e do contexto funcional do caso",
      "organizacao de mensagens, ordens, laudos, boletins e cronologia",
      "orientacao antes de qualquer depoimento ou versao formal",
      "avaliacao dos riscos penais e administrativos decorrentes do IPM",
    ],
    documents: ["intimacao recebida", "portaria do IPM", "mensagens e e-mails", "boletins, ordens e nomes de testemunhas"],
    related: ["defesa-em-ipm", "direito-penal-militar", "advogado-criminal-militar"],
  },
  {
    slug: "militar-temporario-doente",
    eyebrow: "Saude, permanencia e direitos",
    title: "Militar temporario doente: quais direitos avaliar",
    seoTitle: "Militar Temporario Doente | Direitos e Medidas Possiveis",
    seoDescription:
      "Entenda quais direitos o militar temporario doente pode avaliar em casos de tratamento, incapacidade, licenciamento e necessidade de reintegracao ou reforma.",
    keywords: ["militar temporario doente", "militar temporario incapaz", "direitos militar temporario doente", "licenciamento militar doente"],
    intro:
      "Quando o militar temporario adoece, a analise juridica precisa olhar para tratamento, incapacidade, nexo com o servico e regularidade do eventual licenciamento. Nem todo desligamento e simples rotina administrativa.",
    problems: [
      "tratamento em andamento proximo do licenciamento",
      "duvida sobre incapacidade temporaria ou permanente",
      "junta medica incompatível com a realidade clinica",
      "incerteza entre reintegracao, reforma ou outra protecao adequada",
    ],
    approach: [
      "reconstrucao da linha do tempo medica e funcional do militar",
      "comparacao entre laudos oficiais, exames e restricoes reais",
      "avaliacao do ato de licenciamento e dos seus fundamentos",
      "definicao da estrategia mais adequada para permanencia, reintegracao ou reforma",
    ],
    documents: ["laudos e exames", "atas de inspecao de saude", "ato de licenciamento", "prontuario e documentos do servico"],
    related: ["militar-temporario-licenciado", "licenciamento-indevido-militar", "reforma-militar-por-invalidez"],
  },
  {
    slug: "advogado-para-policial-militar",
    eyebrow: "Policia Militar e carreira",
    title: "Advogado para policial militar em punicao, IPM e processo disciplinar",
    seoTitle: "Advogado para Policial Militar | Defesa Disciplinar e IPM",
    seoDescription:
      "Advogado para policial militar em punicao disciplinar, IPM, sindicancia, conselho e casos que afetam conceito, promocao e permanencia na carreira.",
    keywords: ["advogado para policial militar", "advogado policial militar", "defesa policial militar", "punicao policial militar"],
    intro:
      "O policial militar costuma enfrentar ao mesmo tempo pressao funcional, hierarquia e reflexos imediatos na carreira. Por isso, a defesa precisa ser tecnica, pratica e adaptada ao regulamento da corporacao.",
    problems: [
      "punicao disciplinar ou comunicacao recebida com prazo curto",
      "sindicancia, IPM ou processo administrativo com risco funcional",
      "receio de prejuizo em conceito, promocao, escala ou permanencia",
      "dificuldade de organizar documentos operacionais e testemunhas",
    ],
    approach: [
      "analise da comunicacao, do regulamento e da urgencia do caso",
      "organizacao de boletins, escalas, mensagens e ordens de servico",
      "preparo da resposta administrativa ou da defesa mais robusta",
      "avaliacao dos reflexos do caso na carreira policial militar",
    ],
    documents: ["nota de punicao ou intimacao", "boletins e escalas", "mensagens, ordens e registros operacionais", "ficha funcional e testemunhas"],
    related: ["policial-militar-punicao-disciplinar", "punicao-disciplinar-militar", "defesa-em-ipm"],
  },
];

export const getServicePageBySlug = (slug: string | undefined) =>
  servicePages.find((page) => page.slug === slug);
