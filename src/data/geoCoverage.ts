export type GeoAudienceId = "federais" | "estaduais";

export type GeoTopicId =
  | "todos"
  | "penal-ipm"
  | "carreira"
  | "saude-beneficios"
  | "disciplina"
  | "processos"
  | "carreira-estadual";

export type GeoState = {
  slug: string;
  code: string;
  name: string;
  region: string;
  summary: string;
  localAngle: string;
  audiences: GeoAudienceId[];
  topics: GeoTopicId[];
  serviceSlugs: string[];
  citySlugs: string[];
};

export type GeoCity = {
  slug: string;
  name: string;
  stateSlug: string;
  stateCode: string;
  summary: string;
  localAngle: string;
  audiences: GeoAudienceId[];
  topics: GeoTopicId[];
  serviceSlugs: string[];
  nearbySlugs: string[];
};

export const geoStates: GeoState[] = [
  {
    slug: "df",
    code: "DF",
    name: "Distrito Federal",
    region: "Centro-Oeste",
    summary:
      "Atendimento em Direito Militar no Distrito Federal para militares das Forcas Armadas, policiais, bombeiros, pensionistas e familiares que precisam agir com rapidez em casos funcionais, disciplinares, penais e de saude.",
    localAngle:
      "No DF, a proximidade com comandos, orgaos federais e a rotina de Brasilia costuma exigir leitura tecnica de documentos funcionais, notificacoes, laudos e procedimentos com reflexo imediato na carreira.",
    audiences: ["federais", "estaduais"],
    topics: ["penal-ipm", "carreira", "saude-beneficios", "disciplina", "processos"],
    serviceSlugs: ["advogado-militar-brasilia", "advogado-direito-militar", "defesa-em-ipm", "junta-medica-militar"],
    citySlugs: [],
  },
  {
    slug: "es",
    code: "ES",
    name: "Espirito Santo",
    region: "Sudeste",
    summary:
      "Atendimento em Direito Militar no Espirito Santo para policiais militares, bombeiros militares, militares temporarios e familiares em casos de punicao disciplinar, licenciamento, IPM e questoes de saude.",
    localAngle:
      "No Espirito Santo, e comum que a urgencia esteja na organizacao de boletins, escalas, portarias, laudos e mensagens antes que a versao administrativa se consolide.",
    audiences: ["estaduais", "federais"],
    topics: ["disciplina", "processos", "carreira-estadual", "penal-ipm", "saude-beneficios"],
    serviceSlugs: ["advogado-para-policial-militar", "policial-militar-punicao-disciplinar", "defesa-em-ipm", "militar-temporario-doente"],
    citySlugs: ["vitoria", "vila-velha", "serra", "cariacica"],
  },
  {
    slug: "rj",
    code: "RJ",
    name: "Rio de Janeiro",
    region: "Sudeste",
    summary:
      "Atendimento em Direito Militar no Rio de Janeiro para militares das Forcas Armadas, policiais militares, bombeiros e familiares em casos administrativos, disciplinares, penais e previdenciarios.",
    localAngle:
      "No Rio de Janeiro, a combinacao entre demandas de Marinha, Exercito, Aeronautica e corporacoes estaduais pede estrategia integrada para carreira, investigacao e saude funcional.",
    audiences: ["federais", "estaduais"],
    topics: ["penal-ipm", "disciplina", "processos", "carreira", "carreira-estadual"],
    serviceSlugs: ["advogado-direito-militar", "advogado-criminal-militar", "advogado-para-policial-militar", "processo-administrativo-militar"],
    citySlugs: ["rio-de-janeiro", "niteroi", "duque-de-caxias"],
  },
  {
    slug: "sp",
    code: "SP",
    name: "Sao Paulo",
    region: "Sudeste",
    summary:
      "Atendimento em Direito Militar em Sao Paulo para militares federais, policiais militares, bombeiros, temporarios, candidatos a concurso e pensionistas que precisam de orientacao objetiva e documentada.",
    localAngle:
      "Em Sao Paulo, a procura costuma misturar defesa disciplinar, IPM, concurso militar, exclusao, saude e situacoes de licenciamento que exigem resposta rapida e consistente.",
    audiences: ["estaduais", "federais"],
    topics: ["disciplina", "processos", "penal-ipm", "carreira", "saude-beneficios"],
    serviceSlugs: ["advogado-direito-militar", "concurso-militar-eliminacao", "defesa-em-ipm", "licenciamento-indevido-militar"],
    citySlugs: ["sao-paulo", "campinas", "santos"],
  },
  {
    slug: "mg",
    code: "MG",
    name: "Minas Gerais",
    region: "Sudeste",
    summary:
      "Atendimento em Direito Militar em Minas Gerais para policiais militares, bombeiros, militares federais e familiares em casos disciplinares, administrativos, penais e de saude.",
    localAngle:
      "Em Minas Gerais, procedimentos envolvendo regulamentos disciplinares, TAC, boletins, escalas, conselhos e laudos medicos costumam pedir revisao juridica bem organizada desde o inicio.",
    audiences: ["estaduais", "federais"],
    topics: ["disciplina", "processos", "carreira-estadual", "penal-ipm", "saude-beneficios"],
    serviceSlugs: ["advogado-para-policial-militar", "bombeiro-militar-punicao-disciplinar", "processo-administrativo-militar", "junta-medica-militar"],
    citySlugs: ["belo-horizonte", "contagem", "uberlandia"],
  },
  {
    slug: "go",
    code: "GO",
    name: "Goias",
    region: "Centro-Oeste",
    summary:
      "Atendimento em Direito Militar em Goias para militares federais, policiais militares, bombeiros, militares temporarios e familiares com atendimento online e estrategia adaptada ao caso.",
    localAngle:
      "Em Goias, a rotina do entorno de Brasilia, da regiao de Anapolis e das corporacoes estaduais costuma concentrar casos de carreira, saude, investigacao e defesa disciplinar.",
    audiences: ["federais", "estaduais"],
    topics: ["penal-ipm", "carreira", "disciplina", "processos", "saude-beneficios"],
    serviceSlugs: ["advogado-direito-militar", "defesa-em-ipm", "advogado-para-policial-militar", "militar-temporario-doente"],
    citySlugs: ["goiania", "anapolis", "aparecida-de-goiania"],
  },
  {
    slug: "pr",
    code: "PR",
    name: "Parana",
    region: "Sul",
    summary:
      "Atendimento em Direito Militar no Parana para policiais militares, bombeiros, militares federais, candidatos a concurso e familiares em casos administrativos, disciplinares e penais.",
    localAngle:
      "No Parana, o atendimento costuma envolver defesa funcional, sindicancias, IPM, eliminacao em concurso e organizacao de documentos operacionais ou medicos.",
    audiences: ["estaduais", "federais"],
    topics: ["disciplina", "processos", "penal-ipm", "carreira-estadual", "carreira"],
    serviceSlugs: ["advogado-para-policial-militar", "defesa-em-ipm", "concurso-militar-eliminacao", "processo-administrativo-militar"],
    citySlugs: ["curitiba", "londrina", "maringa"],
  },
  {
    slug: "rs",
    code: "RS",
    name: "Rio Grande do Sul",
    region: "Sul",
    summary:
      "Atendimento em Direito Militar no Rio Grande do Sul para policiais militares, bombeiros, militares federais e familiares que precisam proteger carreira, saude e remuneracao.",
    localAngle:
      "No Rio Grande do Sul, a analise costuma depender da leitura conjunta de documentos disciplinares, historico funcional, prontuario medico e cronologia dos fatos.",
    audiences: ["estaduais", "federais"],
    topics: ["disciplina", "processos", "carreira-estadual", "penal-ipm", "saude-beneficios"],
    serviceSlugs: ["advogado-para-policial-militar", "processo-administrativo-militar", "junta-medica-militar", "advogado-criminal-militar"],
    citySlugs: ["porto-alegre", "canoas", "caxias-do-sul"],
  },
  {
    slug: "sc",
    code: "SC",
    name: "Santa Catarina",
    region: "Sul",
    summary:
      "Atendimento em Direito Militar em Santa Catarina para policiais militares, bombeiros militares, militares temporarios e familiares em casos de defesa disciplinar, saude e permanencia na carreira.",
    localAngle:
      "Em Santa Catarina, casos de sindicancia, punicao, licenciamento e junta medica costumam pedir organizacao rapida de provas funcionais e medicas.",
    audiences: ["estaduais", "federais"],
    topics: ["disciplina", "processos", "carreira-estadual", "saude-beneficios", "penal-ipm"],
    serviceSlugs: ["advogado-para-policial-militar", "bombeiro-militar-punicao-disciplinar", "militar-temporario-doente", "junta-medica-militar"],
    citySlugs: ["florianopolis", "joinville", "blumenau"],
  },
  {
    slug: "ba",
    code: "BA",
    name: "Bahia",
    region: "Nordeste",
    summary:
      "Atendimento em Direito Militar na Bahia para policiais militares, bombeiros, militares federais e familiares em casos de punicao disciplinar, IPM, processo administrativo e saude.",
    localAngle:
      "Na Bahia, muitas demandas exigem leitura atenta de escalas, comunicacoes, boletins, portarias e laudos antes da primeira manifestacao formal.",
    audiences: ["estaduais", "federais"],
    topics: ["disciplina", "processos", "penal-ipm", "carreira-estadual", "saude-beneficios"],
    serviceSlugs: ["advogado-para-policial-militar", "defesa-em-ipm", "processo-administrativo-militar", "reforma-militar-por-invalidez"],
    citySlugs: ["salvador", "feira-de-santana", "lauro-de-freitas"],
  },
  {
    slug: "pe",
    code: "PE",
    name: "Pernambuco",
    region: "Nordeste",
    summary:
      "Atendimento em Direito Militar em Pernambuco para policiais, bombeiros, militares temporarios e familiares com foco em defesa administrativa, disciplina, saude e investigacao.",
    localAngle:
      "Em Pernambuco, os casos costumam pedir estrategia firme para prazo curto, producao de prova e definicao dos proximos passos antes do agravamento funcional.",
    audiences: ["estaduais", "federais"],
    topics: ["disciplina", "processos", "carreira-estadual", "saude-beneficios", "penal-ipm"],
    serviceSlugs: ["advogado-para-policial-militar", "punicao-disciplinar-militar", "militar-temporario-doente", "defesa-em-ipm"],
    citySlugs: ["recife", "jaboatao-dos-guararapes", "olinda"],
  },
  {
    slug: "ce",
    code: "CE",
    name: "Ceara",
    region: "Nordeste",
    summary:
      "Atendimento em Direito Militar no Ceara para policiais militares, bombeiros, militares federais e familiares que precisam organizar defesa, prova e cronologia do caso.",
    localAngle:
      "No Ceara, a urgencia costuma aparecer em punicoes, conselhos, licenciamento, junta medica e investigacoes que nao admitem resposta improvisada.",
    audiences: ["estaduais", "federais"],
    topics: ["disciplina", "processos", "penal-ipm", "carreira-estadual", "saude-beneficios"],
    serviceSlugs: ["advogado-para-policial-militar", "processo-administrativo-militar", "junta-medica-militar", "defesa-em-ipm"],
    citySlugs: ["fortaleza", "caucaia", "juazeiro-do-norte"],
  },
  {
    slug: "am",
    code: "AM",
    name: "Amazonas",
    region: "Norte",
    summary:
      "Atendimento em Direito Militar no Amazonas para militares federais, policiais militares, bombeiros e familiares com orientacao online em casos de carreira, saude, disciplina e IPM.",
    localAngle:
      "No Amazonas, a distancia geografica aumenta a importancia de reunir documentos, laudos, registros de servico e atos administrativos de forma organizada desde o inicio.",
    audiences: ["federais", "estaduais"],
    topics: ["penal-ipm", "disciplina", "processos", "carreira", "saude-beneficios"],
    serviceSlugs: ["advogado-direito-militar", "defesa-em-ipm", "junta-medica-militar", "advogado-para-policial-militar"],
    citySlugs: ["manaus"],
  },
  {
    slug: "pa",
    code: "PA",
    name: "Para",
    region: "Norte",
    summary:
      "Atendimento em Direito Militar no Para para militares federais, policiais militares, bombeiros e pensionistas em casos de defesa funcional, IPM, saude e beneficios.",
    localAngle:
      "No Para, o caso costuma exigir leitura tecnica da cronologia, dos documentos de servico e da prova medica ou disciplinar antes de qualquer resposta precipitada.",
    audiences: ["federais", "estaduais"],
    topics: ["penal-ipm", "disciplina", "processos", "saude-beneficios", "carreira-estadual"],
    serviceSlugs: ["advogado-direito-militar", "advogado-para-policial-militar", "defesa-em-ipm", "pensao-militar"],
    citySlugs: ["belem"],
  },
  {
    slug: "ac",
    code: "AC",
    name: "Acre",
    region: "Norte",
    summary:
      "Atendimento em Direito Militar no Acre para policiais militares, bombeiros, militares federais e familiares que precisam avaliar punicao disciplinar, IPM, saude ou licenciamento.",
    localAngle:
      "No Acre, mesmo quando o procedimento parece simples, a defesa melhora muito quando boletins, escalas, mensagens e laudos sao organizados desde a primeira notificacao.",
    audiences: ["estaduais", "federais"],
    topics: ["disciplina", "processos", "penal-ipm", "saude-beneficios"],
    serviceSlugs: ["advogado-para-policial-militar", "defesa-em-ipm", "militar-temporario-doente"],
    citySlugs: [],
  },
  {
    slug: "al",
    code: "AL",
    name: "Alagoas",
    region: "Nordeste",
    summary:
      "Atendimento em Direito Militar em Alagoas para policiais militares, bombeiros, militares federais e familiares em casos disciplinares, administrativos e de saude.",
    localAngle:
      "Em Alagoas, a estrategia costuma comecar pela leitura de comunicacoes, portarias, fichas funcionais e laudos para evitar que o caso avance sem contraditorio util.",
    audiences: ["estaduais", "federais"],
    topics: ["disciplina", "processos", "saude-beneficios", "penal-ipm"],
    serviceSlugs: ["advogado-para-policial-militar", "processo-administrativo-militar", "junta-medica-militar"],
    citySlugs: [],
  },
  {
    slug: "ap",
    code: "AP",
    name: "Amapa",
    region: "Norte",
    summary:
      "Atendimento em Direito Militar no Amapa para militares federais, policiais militares, bombeiros e familiares em casos de carreira, IPM, defesa disciplinar e beneficios.",
    localAngle:
      "No Amapa, a atuacao online facilita reunir documentos funcionais, prontuarios e atos administrativos com rapidez para orientar o proximo passo do caso.",
    audiences: ["federais", "estaduais"],
    topics: ["penal-ipm", "disciplina", "processos", "saude-beneficios"],
    serviceSlugs: ["advogado-direito-militar", "defesa-em-ipm", "pensao-militar"],
    citySlugs: [],
  },
  {
    slug: "ma",
    code: "MA",
    name: "Maranhao",
    region: "Nordeste",
    summary:
      "Atendimento em Direito Militar no Maranhao para militares federais, policiais, bombeiros e familiares em casos administrativos, disciplinares, penais e previdenciarios.",
    localAngle:
      "No Maranhao, o foco inicial costuma estar em separar notificacoes, cronologia, testemunhas e documentos de servico antes de resposta apressada.",
    audiences: ["federais", "estaduais"],
    topics: ["disciplina", "processos", "penal-ipm", "saude-beneficios"],
    serviceSlugs: ["advogado-direito-militar", "advogado-para-policial-militar", "defesa-em-ipm"],
    citySlugs: [],
  },
  {
    slug: "mt",
    code: "MT",
    name: "Mato Grosso",
    region: "Centro-Oeste",
    summary:
      "Atendimento em Direito Militar em Mato Grosso para policiais militares, bombeiros, militares federais e familiares com foco em carreira, IPM, disciplina e saude.",
    localAngle:
      "Em Mato Grosso, a orientacao juridica costuma ser importante quando o caso mistura urgencia de prazo, prova funcional e risco de prejuizo na carreira.",
    audiences: ["estaduais", "federais"],
    topics: ["disciplina", "processos", "penal-ipm", "saude-beneficios", "carreira-estadual"],
    serviceSlugs: ["advogado-para-policial-militar", "processo-administrativo-militar", "junta-medica-militar"],
    citySlugs: [],
  },
  {
    slug: "ms",
    code: "MS",
    name: "Mato Grosso do Sul",
    region: "Centro-Oeste",
    summary:
      "Atendimento em Direito Militar em Mato Grosso do Sul para militares federais, policiais militares, bombeiros e familiares em casos de punicao, investigacao, saude e permanencia na carreira.",
    localAngle:
      "Em Mato Grosso do Sul, o atendimento costuma exigir leitura integrada de boletins, comunicacoes internas, portarias, fichas funcionais e laudos.",
    audiences: ["federais", "estaduais"],
    topics: ["disciplina", "processos", "penal-ipm", "saude-beneficios"],
    serviceSlugs: ["advogado-direito-militar", "advogado-para-policial-militar", "defesa-em-ipm"],
    citySlugs: [],
  },
  {
    slug: "pb",
    code: "PB",
    name: "Paraiba",
    region: "Nordeste",
    summary:
      "Atendimento em Direito Militar na Paraiba para policiais militares, bombeiros, militares federais e familiares em casos disciplinares, administrativos e de saude.",
    localAngle:
      "Na Paraiba, a estrategia inicial normalmente passa por separar cronologia, documentos de servico, testemunhas e prova medica antes de qualquer recurso.",
    audiences: ["estaduais", "federais"],
    topics: ["disciplina", "processos", "penal-ipm", "saude-beneficios"],
    serviceSlugs: ["advogado-para-policial-militar", "processo-administrativo-militar", "militar-temporario-doente"],
    citySlugs: [],
  },
  {
    slug: "pi",
    code: "PI",
    name: "Piaui",
    region: "Nordeste",
    summary:
      "Atendimento em Direito Militar no Piaui para militares federais, policiais, bombeiros e familiares que precisam de orientacao objetiva sobre prazo, prova e estrategia.",
    localAngle:
      "No Piaui, a atuacao juridica costuma ser decisiva quando o procedimento avanca com documentacao incompleta ou sem contraditorio efetivo.",
    audiences: ["federais", "estaduais"],
    topics: ["disciplina", "processos", "penal-ipm", "carreira-estadual"],
    serviceSlugs: ["advogado-direito-militar", "advogado-para-policial-militar", "defesa-em-ipm"],
    citySlugs: [],
  },
  {
    slug: "rn",
    code: "RN",
    name: "Rio Grande do Norte",
    region: "Nordeste",
    summary:
      "Atendimento em Direito Militar no Rio Grande do Norte para policiais militares, bombeiros, militares federais e familiares em casos de defesa disciplinar, IPM, saude e licenciamento.",
    localAngle:
      "No Rio Grande do Norte, a boa defesa normalmente depende da reuniao rapida de portarias, boletins, escalas, mensagens e laudos.",
    audiences: ["estaduais", "federais"],
    topics: ["disciplina", "processos", "penal-ipm", "saude-beneficios"],
    serviceSlugs: ["advogado-para-policial-militar", "defesa-em-ipm", "junta-medica-militar"],
    citySlugs: [],
  },
  {
    slug: "ro",
    code: "RO",
    name: "Rondonia",
    region: "Norte",
    summary:
      "Atendimento em Direito Militar em Rondonia para militares federais, policiais militares, bombeiros e familiares em casos de carreira, disciplina e saude funcional.",
    localAngle:
      "Em Rondonia, a analise a distancia pede organizacao muito clara dos documentos do caso para orientar defesa administrativa ou judicial sem perda de prazo.",
    audiences: ["federais", "estaduais"],
    topics: ["disciplina", "processos", "penal-ipm", "saude-beneficios"],
    serviceSlugs: ["advogado-direito-militar", "advogado-para-policial-militar", "militar-temporario-doente"],
    citySlugs: [],
  },
  {
    slug: "rr",
    code: "RR",
    name: "Roraima",
    region: "Norte",
    summary:
      "Atendimento em Direito Militar em Roraima para militares federais, policiais, bombeiros e familiares em casos de investigacao, defesa disciplinar e direitos de carreira.",
    localAngle:
      "Em Roraima, cada prazo e cada documento importam muito, especialmente quando o caso mistura reflexo funcional, saude e procedimento administrativo.",
    audiences: ["federais", "estaduais"],
    topics: ["penal-ipm", "disciplina", "processos", "saude-beneficios"],
    serviceSlugs: ["advogado-direito-militar", "defesa-em-ipm", "processo-administrativo-militar"],
    citySlugs: [],
  },
  {
    slug: "se",
    code: "SE",
    name: "Sergipe",
    region: "Nordeste",
    summary:
      "Atendimento em Direito Militar em Sergipe para policiais militares, bombeiros, militares federais e familiares em casos disciplinares, administrativos e de saude.",
    localAngle:
      "Em Sergipe, a defesa costuma ganhar consistencia quando o caso e montado com ordem cronologica, documentos funcionais e prova medica ou operacional.",
    audiences: ["estaduais", "federais"],
    topics: ["disciplina", "processos", "saude-beneficios", "penal-ipm"],
    serviceSlugs: ["advogado-para-policial-militar", "junta-medica-militar", "defesa-em-ipm"],
    citySlugs: [],
  },
  {
    slug: "to",
    code: "TO",
    name: "Tocantins",
    region: "Norte",
    summary:
      "Atendimento em Direito Militar no Tocantins para militares federais, policiais militares, bombeiros e familiares em casos de disciplina, processo administrativo, carreira e saude.",
    localAngle:
      "No Tocantins, o atendimento online e a organizacao antecipada de boletins, laudos, notificacoes e fichas funcionais costumam fazer muita diferenca.",
    audiences: ["federais", "estaduais"],
    topics: ["disciplina", "processos", "penal-ipm", "saude-beneficios"],
    serviceSlugs: ["advogado-direito-militar", "processo-administrativo-militar", "militar-temporario-doente"],
    citySlugs: [],
  },
];

export const geoCities: GeoCity[] = [
  {
    slug: "vitoria",
    name: "Vitoria",
    stateSlug: "es",
    stateCode: "ES",
    summary:
      "Atendimento em Direito Militar em Vitoria para policiais militares, bombeiros, militares federais e familiares que precisam organizar o caso antes de recurso, oitiva ou medida judicial.",
    localAngle:
      "Em Vitoria, a estrategia costuma partir da leitura de boletins, comunicacoes funcionais, mensagens, laudos e prazos para evitar prejuizo na carreira.",
    audiences: ["estaduais", "federais"],
    topics: ["disciplina", "processos", "penal-ipm", "saude-beneficios"],
    serviceSlugs: ["advogado-para-policial-militar", "defesa-em-ipm", "militar-temporario-doente"],
    nearbySlugs: ["vila-velha", "serra", "cariacica"],
  },
  {
    slug: "vila-velha",
    name: "Vila Velha",
    stateSlug: "es",
    stateCode: "ES",
    summary:
      "Atendimento em Direito Militar em Vila Velha para policiais militares, bombeiros, militares temporarios e familiares em casos disciplinares, administrativos e de saude.",
    localAngle:
      "Em Vila Velha, o atendimento costuma comecar pela organizacao da cronologia, dos documentos do servico e da prova medica ou disciplinar.",
    audiences: ["estaduais", "federais"],
    topics: ["disciplina", "processos", "saude-beneficios"],
    serviceSlugs: ["advogado-para-policial-militar", "junta-medica-militar", "processo-administrativo-militar"],
    nearbySlugs: ["vitoria", "serra", "cariacica"],
  },
  {
    slug: "serra",
    name: "Serra",
    stateSlug: "es",
    stateCode: "ES",
    summary:
      "Atendimento em Direito Militar na Serra para militares estaduais, militares federais e familiares que precisam responder com clareza a notificacao, punicao, sindicancia ou licenciamento.",
    localAngle:
      "Na Serra, cada detalhe de escala, ordem de servico, boletim, portaria e laudo pode mudar a leitura final do caso.",
    audiences: ["estaduais", "federais"],
    topics: ["disciplina", "processos", "carreira-estadual", "saude-beneficios"],
    serviceSlugs: ["policial-militar-punicao-disciplinar", "processo-administrativo-militar", "militar-temporario-doente"],
    nearbySlugs: ["vitoria", "vila-velha", "cariacica"],
  },
  {
    slug: "cariacica",
    name: "Cariacica",
    stateSlug: "es",
    stateCode: "ES",
    summary:
      "Atendimento em Direito Militar em Cariacica para policiais militares, bombeiros, militares federais e familiares com foco em prazos, prova e defesa da carreira.",
    localAngle:
      "Em Cariacica, a primeira analise costuma separar o que e urgencia de prazo, o que e prova funcional e o que precisa de atuacao judicial ou administrativa.",
    audiences: ["estaduais", "federais"],
    topics: ["disciplina", "processos", "penal-ipm"],
    serviceSlugs: ["advogado-para-policial-militar", "defesa-em-ipm", "processo-administrativo-militar"],
    nearbySlugs: ["vitoria", "vila-velha", "serra"],
  },
  {
    slug: "rio-de-janeiro",
    name: "Rio de Janeiro",
    stateSlug: "rj",
    stateCode: "RJ",
    summary:
      "Atendimento em Direito Militar na cidade do Rio de Janeiro para militares da Marinha, Exercito, Aeronautica, policiais militares, bombeiros e familiares em casos de carreira, punicao, IPM e saude.",
    localAngle:
      "Na capital fluminense, a estrategia juridica costuma exigir visao conjunta sobre reflexos disciplinares, penais e funcionais.",
    audiences: ["federais", "estaduais"],
    topics: ["penal-ipm", "disciplina", "processos", "carreira"],
    serviceSlugs: ["advogado-direito-militar", "advogado-criminal-militar", "advogado-para-policial-militar"],
    nearbySlugs: ["niteroi", "duque-de-caxias"],
  },
  {
    slug: "niteroi",
    name: "Niteroi",
    stateSlug: "rj",
    stateCode: "RJ",
    summary:
      "Atendimento em Direito Militar em Niteroi para militares federais, policiais militares e familiares que precisam organizar defesa, prova e proximos passos com rapidez.",
    localAngle:
      "Em Niteroi, e comum que o caso precise alinhar documentos de servico, portarias, laudos e testemunhas antes do primeiro ato de defesa.",
    audiences: ["federais", "estaduais"],
    topics: ["penal-ipm", "disciplina", "processos"],
    serviceSlugs: ["advogado-direito-militar", "defesa-em-ipm", "processo-administrativo-militar"],
    nearbySlugs: ["rio-de-janeiro", "duque-de-caxias"],
  },
  {
    slug: "duque-de-caxias",
    name: "Duque de Caxias",
    stateSlug: "rj",
    stateCode: "RJ",
    summary:
      "Atendimento em Direito Militar em Duque de Caxias para policiais militares, bombeiros, militares federais e familiares em casos disciplinares, administrativos e de saude.",
    localAngle:
      "Em Duque de Caxias, a defesa costuma ganhar forca quando a cronologia e os documentos operacionais ou medicos sao reunidos desde o inicio.",
    audiences: ["estaduais", "federais"],
    topics: ["disciplina", "processos", "saude-beneficios"],
    serviceSlugs: ["advogado-para-policial-militar", "junta-medica-militar", "processo-administrativo-militar"],
    nearbySlugs: ["rio-de-janeiro", "niteroi"],
  },
  {
    slug: "sao-paulo",
    name: "Sao Paulo",
    stateSlug: "sp",
    stateCode: "SP",
    summary:
      "Atendimento em Direito Militar na cidade de Sao Paulo para militares federais, policiais militares, bombeiros, candidatos a concurso e familiares em casos de alto impacto funcional.",
    localAngle:
      "Na capital paulista, a procura costuma reunir punicao disciplinar, concurso militar, IPM, licenciamento e junta medica em cenarios com prazo curto e muita documentacao.",
    audiences: ["estaduais", "federais"],
    topics: ["disciplina", "processos", "penal-ipm", "carreira", "saude-beneficios"],
    serviceSlugs: ["advogado-direito-militar", "concurso-militar-eliminacao", "defesa-em-ipm", "junta-medica-militar"],
    nearbySlugs: ["campinas", "santos"],
  },
  {
    slug: "campinas",
    name: "Campinas",
    stateSlug: "sp",
    stateCode: "SP",
    summary:
      "Atendimento em Direito Militar em Campinas para militares federais, policiais militares, militares temporarios e familiares em casos disciplinares, administrativos e de saude.",
    localAngle:
      "Em Campinas, a orientacao costuma ser importante para organizar recurso, resposta a sindicancia, prova medica e estrategia de permanencia na carreira.",
    audiences: ["estaduais", "federais"],
    topics: ["disciplina", "processos", "saude-beneficios", "carreira"],
    serviceSlugs: ["advogado-direito-militar", "militar-temporario-doente", "processo-administrativo-militar"],
    nearbySlugs: ["sao-paulo", "santos"],
  },
  {
    slug: "santos",
    name: "Santos",
    stateSlug: "sp",
    stateCode: "SP",
    summary:
      "Atendimento em Direito Militar em Santos para militares federais, policiais militares e familiares em casos de IPM, disciplina, carreira e saude funcional.",
    localAngle:
      "Em Santos, a boa leitura do caso depende de reunir comunicacoes, boletins, laudos e contexto funcional antes de qualquer manifestacao formal.",
    audiences: ["federais", "estaduais"],
    topics: ["penal-ipm", "disciplina", "saude-beneficios"],
    serviceSlugs: ["advogado-direito-militar", "defesa-em-ipm", "junta-medica-militar"],
    nearbySlugs: ["sao-paulo", "campinas"],
  },
  {
    slug: "belo-horizonte",
    name: "Belo Horizonte",
    stateSlug: "mg",
    stateCode: "MG",
    summary:
      "Atendimento em Direito Militar em Belo Horizonte para policiais militares, bombeiros, militares federais e familiares em casos disciplinares, administrativos, penais e de saude.",
    localAngle:
      "Em Belo Horizonte, a estrategia costuma pedir leitura tecnica do regulamento aplicavel, dos atos administrativos e das provas funcionais ou medicas.",
    audiences: ["estaduais", "federais"],
    topics: ["disciplina", "processos", "carreira-estadual", "saude-beneficios"],
    serviceSlugs: ["advogado-para-policial-militar", "bombeiro-militar-punicao-disciplinar", "junta-medica-militar"],
    nearbySlugs: ["contagem", "uberlandia"],
  },
  {
    slug: "contagem",
    name: "Contagem",
    stateSlug: "mg",
    stateCode: "MG",
    summary:
      "Atendimento em Direito Militar em Contagem para policiais militares, bombeiros, militares federais e familiares que precisam agir logo no inicio do procedimento.",
    localAngle:
      "Em Contagem, o ponto central costuma ser organizar documentos operacionais, ficha funcional, notificacoes e laudos antes de defesa ou recurso.",
    audiences: ["estaduais", "federais"],
    topics: ["disciplina", "processos", "saude-beneficios"],
    serviceSlugs: ["advogado-para-policial-militar", "processo-administrativo-militar", "junta-medica-militar"],
    nearbySlugs: ["belo-horizonte", "uberlandia"],
  },
  {
    slug: "uberlandia",
    name: "Uberlandia",
    stateSlug: "mg",
    stateCode: "MG",
    summary:
      "Atendimento em Direito Militar em Uberlandia para militares estaduais, militares federais e familiares em casos disciplinares, IPM, licenciamento e direitos de carreira.",
    localAngle:
      "Em Uberlandia, o atendimento costuma ser mais eficiente quando a cronologia do caso e os documentos medicos ou funcionais chegam organizados desde a primeira conversa.",
    audiences: ["estaduais", "federais"],
    topics: ["disciplina", "penal-ipm", "saude-beneficios"],
    serviceSlugs: ["advogado-para-policial-militar", "defesa-em-ipm", "militar-temporario-doente"],
    nearbySlugs: ["belo-horizonte", "contagem"],
  },
  {
    slug: "goiania",
    name: "Goiania",
    stateSlug: "go",
    stateCode: "GO",
    summary:
      "Atendimento em Direito Militar em Goiania para militares federais, policiais militares, bombeiros e familiares com foco em defesa tecnica, prova e risco funcional.",
    localAngle:
      "Em Goiania, o caso normalmente pede alinhamento entre prazo, cronologia, boletins, portarias, laudos e contexto de servico.",
    audiences: ["federais", "estaduais"],
    topics: ["disciplina", "processos", "penal-ipm", "saude-beneficios"],
    serviceSlugs: ["advogado-direito-militar", "advogado-para-policial-militar", "defesa-em-ipm"],
    nearbySlugs: ["anapolis", "aparecida-de-goiania"],
  },
  {
    slug: "anapolis",
    name: "Anapolis",
    stateSlug: "go",
    stateCode: "GO",
    summary:
      "Atendimento em Direito Militar em Anapolis para militares federais, temporarios e familiares em casos de carreira, saude, licenciamento, IPM e investigacao.",
    localAngle:
      "Em Anapolis, a proximidade com demandas militares federais aumenta a importancia de organizar rapidamente atos administrativos, laudos e registros de servico.",
    audiences: ["federais", "estaduais"],
    topics: ["penal-ipm", "carreira", "saude-beneficios"],
    serviceSlugs: ["advogado-direito-militar", "militar-temporario-doente", "defesa-em-ipm"],
    nearbySlugs: ["goiania", "aparecida-de-goiania"],
  },
  {
    slug: "aparecida-de-goiania",
    name: "Aparecida de Goiania",
    stateSlug: "go",
    stateCode: "GO",
    summary:
      "Atendimento em Direito Militar em Aparecida de Goiania para policiais militares, militares federais e familiares em casos disciplinares, administrativos e de saude.",
    localAngle:
      "Em Aparecida de Goiania, o atendimento costuma comecar pela definicao do risco imediato do caso e pela reuniao dos documentos certos para nao perder prazo.",
    audiences: ["estaduais", "federais"],
    topics: ["disciplina", "processos", "saude-beneficios"],
    serviceSlugs: ["advogado-para-policial-militar", "processo-administrativo-militar", "junta-medica-militar"],
    nearbySlugs: ["goiania", "anapolis"],
  },
  {
    slug: "curitiba",
    name: "Curitiba",
    stateSlug: "pr",
    stateCode: "PR",
    summary:
      "Atendimento em Direito Militar em Curitiba para policiais militares, bombeiros, militares federais e candidatos a concurso em casos de defesa funcional, IPM e saude.",
    localAngle:
      "Em Curitiba, o atendimento costuma envolver regulamento disciplinar, concurso militar, licenciamento, sindicancia e preparacao de prova funcional.",
    audiences: ["estaduais", "federais"],
    topics: ["disciplina", "processos", "penal-ipm", "carreira"],
    serviceSlugs: ["advogado-para-policial-militar", "concurso-militar-eliminacao", "defesa-em-ipm"],
    nearbySlugs: ["londrina", "maringa"],
  },
  {
    slug: "londrina",
    name: "Londrina",
    stateSlug: "pr",
    stateCode: "PR",
    summary:
      "Atendimento em Direito Militar em Londrina para militares estaduais, militares federais e familiares em casos disciplinares, administrativos e de saude.",
    localAngle:
      "Em Londrina, o atendimento fica mais preciso quando a pessoa ja separa a notificacao, a cronologia e os documentos do servico ou da junta medica.",
    audiences: ["estaduais", "federais"],
    topics: ["disciplina", "processos", "saude-beneficios"],
    serviceSlugs: ["advogado-para-policial-militar", "processo-administrativo-militar", "junta-medica-militar"],
    nearbySlugs: ["curitiba", "maringa"],
  },
  {
    slug: "maringa",
    name: "Maringa",
    stateSlug: "pr",
    stateCode: "PR",
    summary:
      "Atendimento em Direito Militar em Maringa para policiais militares, bombeiros, militares federais e familiares que precisam agir em casos de punicao, sindicancia, concurso ou saude.",
    localAngle:
      "Em Maringa, a defesa normalmente depende de boa organizacao documental e definicao rapida de qual medida tem mais utilidade no caso.",
    audiences: ["estaduais", "federais"],
    topics: ["disciplina", "processos", "carreira-estadual", "saude-beneficios"],
    serviceSlugs: ["advogado-para-policial-militar", "concurso-militar-eliminacao", "militar-temporario-doente"],
    nearbySlugs: ["curitiba", "londrina"],
  },
  {
    slug: "porto-alegre",
    name: "Porto Alegre",
    stateSlug: "rs",
    stateCode: "RS",
    summary:
      "Atendimento em Direito Militar em Porto Alegre para policiais militares, bombeiros, militares federais e familiares com foco em carreira, IPM, saude e disciplina.",
    localAngle:
      "Em Porto Alegre, a estrategia juridica costuma depender da comparacao entre narrativa administrativa, prova funcional e documentacao medica.",
    audiences: ["estaduais", "federais"],
    topics: ["disciplina", "processos", "penal-ipm", "saude-beneficios"],
    serviceSlugs: ["advogado-para-policial-militar", "advogado-criminal-militar", "junta-medica-militar"],
    nearbySlugs: ["canoas", "caxias-do-sul"],
  },
  {
    slug: "canoas",
    name: "Canoas",
    stateSlug: "rs",
    stateCode: "RS",
    summary:
      "Atendimento em Direito Militar em Canoas para militares federais, policiais militares e familiares em casos de sindicancia, punicao, IPM e situacoes de saude funcional.",
    localAngle:
      "Em Canoas, a leitura do caso costuma melhorar muito quando boletins, portarias, mensagens e exames sao reunidos logo no inicio.",
    audiences: ["federais", "estaduais"],
    topics: ["penal-ipm", "disciplina", "saude-beneficios"],
    serviceSlugs: ["advogado-direito-militar", "defesa-em-ipm", "junta-medica-militar"],
    nearbySlugs: ["porto-alegre", "caxias-do-sul"],
  },
  {
    slug: "caxias-do-sul",
    name: "Caxias do Sul",
    stateSlug: "rs",
    stateCode: "RS",
    summary:
      "Atendimento em Direito Militar em Caxias do Sul para militares estaduais, militares federais e familiares em casos disciplinares, administrativos e de carreira.",
    localAngle:
      "Em Caxias do Sul, a atuacao costuma focar em preservar prova, prazo e coerencia da versao antes de recurso ou resposta formal.",
    audiences: ["estaduais", "federais"],
    topics: ["disciplina", "processos", "carreira-estadual"],
    serviceSlugs: ["advogado-para-policial-militar", "processo-administrativo-militar", "punicao-disciplinar-militar"],
    nearbySlugs: ["porto-alegre", "canoas"],
  },
  {
    slug: "florianopolis",
    name: "Florianopolis",
    stateSlug: "sc",
    stateCode: "SC",
    summary:
      "Atendimento em Direito Militar em Florianopolis para policiais militares, bombeiros, militares federais e familiares em casos de defesa funcional, saude e licenciamento.",
    localAngle:
      "Em Florianopolis, o atendimento costuma concentrar disciplina, processo administrativo, junta medica e permanencia na carreira.",
    audiences: ["estaduais", "federais"],
    topics: ["disciplina", "processos", "saude-beneficios"],
    serviceSlugs: ["advogado-para-policial-militar", "bombeiro-militar-punicao-disciplinar", "junta-medica-militar"],
    nearbySlugs: ["joinville", "blumenau"],
  },
  {
    slug: "joinville",
    name: "Joinville",
    stateSlug: "sc",
    stateCode: "SC",
    summary:
      "Atendimento em Direito Militar em Joinville para militares estaduais, militares federais e familiares em casos de punicao, sindicancia, licenciamento e direitos de carreira.",
    localAngle:
      "Em Joinville, o atendimento costuma ser mais efetivo quando a pessoa ja separa atos administrativos, comunicacoes, escala e prova medica.",
    audiences: ["estaduais", "federais"],
    topics: ["disciplina", "processos", "carreira-estadual", "saude-beneficios"],
    serviceSlugs: ["advogado-para-policial-militar", "processo-administrativo-militar", "militar-temporario-doente"],
    nearbySlugs: ["florianopolis", "blumenau"],
  },
  {
    slug: "blumenau",
    name: "Blumenau",
    stateSlug: "sc",
    stateCode: "SC",
    summary:
      "Atendimento em Direito Militar em Blumenau para policiais militares, bombeiros, militares temporarios e familiares em casos de saude, licenciamento, disciplina e permanencia funcional.",
    localAngle:
      "Em Blumenau, a estrategia inicial geralmente depende de juntar rapidamente cronologia, laudos, boletins e documentos do servico.",
    audiences: ["estaduais", "federais"],
    topics: ["saude-beneficios", "disciplina", "processos"],
    serviceSlugs: ["militar-temporario-doente", "junta-medica-militar", "processo-administrativo-militar"],
    nearbySlugs: ["florianopolis", "joinville"],
  },
  {
    slug: "salvador",
    name: "Salvador",
    stateSlug: "ba",
    stateCode: "BA",
    summary:
      "Atendimento em Direito Militar em Salvador para policiais militares, bombeiros, militares federais e familiares em casos disciplinares, administrativos, penais e de saude.",
    localAngle:
      "Em Salvador, a boa estrategia costuma nascer da leitura conjunta dos atos do procedimento, da prova funcional e da cronologia do caso.",
    audiences: ["estaduais", "federais"],
    topics: ["disciplina", "processos", "penal-ipm", "saude-beneficios"],
    serviceSlugs: ["advogado-para-policial-militar", "defesa-em-ipm", "reforma-militar-por-invalidez"],
    nearbySlugs: ["feira-de-santana", "lauro-de-freitas"],
  },
  {
    slug: "feira-de-santana",
    name: "Feira de Santana",
    stateSlug: "ba",
    stateCode: "BA",
    summary:
      "Atendimento em Direito Militar em Feira de Santana para policiais militares, bombeiros, militares federais e familiares que precisam agir em punicao, sindicancia ou questao de saude.",
    localAngle:
      "Em Feira de Santana, o atendimento costuma focar em prazo, narrativa documental e definicao do melhor caminho entre defesa administrativa e medida judicial.",
    audiences: ["estaduais", "federais"],
    topics: ["disciplina", "processos", "saude-beneficios"],
    serviceSlugs: ["advogado-para-policial-militar", "processo-administrativo-militar", "junta-medica-militar"],
    nearbySlugs: ["salvador", "lauro-de-freitas"],
  },
  {
    slug: "lauro-de-freitas",
    name: "Lauro de Freitas",
    stateSlug: "ba",
    stateCode: "BA",
    summary:
      "Atendimento em Direito Militar em Lauro de Freitas para militares estaduais, militares federais e familiares em casos de disciplina, investigacao e direitos de carreira.",
    localAngle:
      "Em Lauro de Freitas, a organizacao da prova e da cronologia do caso costuma definir a qualidade da defesa desde o primeiro movimento.",
    audiences: ["estaduais", "federais"],
    topics: ["disciplina", "penal-ipm", "processos"],
    serviceSlugs: ["advogado-para-policial-militar", "defesa-em-ipm", "processo-administrativo-militar"],
    nearbySlugs: ["salvador", "feira-de-santana"],
  },
  {
    slug: "recife",
    name: "Recife",
    stateSlug: "pe",
    stateCode: "PE",
    summary:
      "Atendimento em Direito Militar em Recife para policiais militares, bombeiros, militares federais e familiares em casos de processo disciplinar, IPM, carreira e saude.",
    localAngle:
      "Em Recife, o atendimento costuma exigir leitura tecnica dos prazos, da narrativa administrativa e dos documentos funcionais ou medicos.",
    audiences: ["estaduais", "federais"],
    topics: ["disciplina", "processos", "penal-ipm", "saude-beneficios"],
    serviceSlugs: ["advogado-para-policial-militar", "defesa-em-ipm", "militar-temporario-doente"],
    nearbySlugs: ["jaboatao-dos-guararapes", "olinda"],
  },
  {
    slug: "jaboatao-dos-guararapes",
    name: "Jaboatao dos Guararapes",
    stateSlug: "pe",
    stateCode: "PE",
    summary:
      "Atendimento em Direito Militar em Jaboatao dos Guararapes para militares estaduais, militares federais e familiares que precisam preservar prazo, prova e coerencia da defesa.",
    localAngle:
      "Em Jaboatao dos Guararapes, a organizacao antecipada do caso costuma evitar respostas incompletas em punicoes, sindicancias e investigacoes.",
    audiences: ["estaduais", "federais"],
    topics: ["disciplina", "processos", "penal-ipm"],
    serviceSlugs: ["advogado-para-policial-militar", "processo-administrativo-militar", "defesa-em-ipm"],
    nearbySlugs: ["recife", "olinda"],
  },
  {
    slug: "olinda",
    name: "Olinda",
    stateSlug: "pe",
    stateCode: "PE",
    summary:
      "Atendimento em Direito Militar em Olinda para policiais militares, bombeiros, militares federais e familiares em casos disciplinares, administrativos e de saude.",
    localAngle:
      "Em Olinda, a defesa costuma ganhar qualidade quando a pessoa ja separa boletins, notificacoes, testemunhas e laudos antes da primeira reuniao.",
    audiences: ["estaduais", "federais"],
    topics: ["disciplina", "processos", "saude-beneficios"],
    serviceSlugs: ["advogado-para-policial-militar", "junta-medica-militar", "processo-administrativo-militar"],
    nearbySlugs: ["recife", "jaboatao-dos-guararapes"],
  },
  {
    slug: "fortaleza",
    name: "Fortaleza",
    stateSlug: "ce",
    stateCode: "CE",
    summary:
      "Atendimento em Direito Militar em Fortaleza para policiais militares, bombeiros, militares federais e familiares em casos de punicao disciplinar, IPM, saude e permanencia na carreira.",
    localAngle:
      "Em Fortaleza, a estrategia costuma comecar pela definicao do risco funcional imediato e pela reuniao das provas mais uteis para o caso.",
    audiences: ["estaduais", "federais"],
    topics: ["disciplina", "processos", "penal-ipm", "saude-beneficios"],
    serviceSlugs: ["advogado-para-policial-militar", "defesa-em-ipm", "junta-medica-militar"],
    nearbySlugs: ["caucaia", "juazeiro-do-norte"],
  },
  {
    slug: "caucaia",
    name: "Caucaia",
    stateSlug: "ce",
    stateCode: "CE",
    summary:
      "Atendimento em Direito Militar em Caucaia para militares estaduais, militares federais e familiares em casos disciplinares, administrativos e de saude.",
    localAngle:
      "Em Caucaia, a organizacao da documentacao e do contexto funcional costuma ser decisiva para defesa administrativa ou medida judicial.",
    audiences: ["estaduais", "federais"],
    topics: ["disciplina", "processos", "saude-beneficios"],
    serviceSlugs: ["advogado-para-policial-militar", "processo-administrativo-militar", "militar-temporario-doente"],
    nearbySlugs: ["fortaleza", "juazeiro-do-norte"],
  },
  {
    slug: "juazeiro-do-norte",
    name: "Juazeiro do Norte",
    stateSlug: "ce",
    stateCode: "CE",
    summary:
      "Atendimento em Direito Militar em Juazeiro do Norte para policiais militares, bombeiros, militares federais e familiares em casos de carreira, punicao, saude e investigacao.",
    localAngle:
      "Em Juazeiro do Norte, o caso costuma pedir leitura objetiva de prazo, documentos, testemunhas e registros funcionais antes da primeira defesa.",
    audiences: ["estaduais", "federais"],
    topics: ["disciplina", "penal-ipm", "carreira-estadual"],
    serviceSlugs: ["advogado-para-policial-militar", "defesa-em-ipm", "punicao-disciplinar-militar"],
    nearbySlugs: ["fortaleza", "caucaia"],
  },
  {
    slug: "manaus",
    name: "Manaus",
    stateSlug: "am",
    stateCode: "AM",
    summary:
      "Atendimento em Direito Militar em Manaus para militares federais, policiais militares, bombeiros e familiares em casos de carreira, saude, disciplina e IPM.",
    localAngle:
      "Em Manaus, a atuacao online facilita reunir laudos, documentos de servico, boletins e atos administrativos sem perder tempo util do caso.",
    audiences: ["federais", "estaduais"],
    topics: ["penal-ipm", "disciplina", "processos", "saude-beneficios"],
    serviceSlugs: ["advogado-direito-militar", "defesa-em-ipm", "junta-medica-militar"],
    nearbySlugs: [],
  },
  {
    slug: "belem",
    name: "Belem",
    stateSlug: "pa",
    stateCode: "PA",
    summary:
      "Atendimento em Direito Militar em Belem para militares federais, policiais militares, bombeiros e familiares em casos administrativos, disciplinares, penais e previdenciarios.",
    localAngle:
      "Em Belem, a boa estrategia costuma depender de cronologia clara, prova funcional, laudos e leitura cuidadosa dos atos do procedimento.",
    audiences: ["federais", "estaduais"],
    topics: ["penal-ipm", "disciplina", "processos", "saude-beneficios"],
    serviceSlugs: ["advogado-direito-militar", "advogado-para-policial-militar", "pensao-militar"],
    nearbySlugs: [],
  },
];

export const geoCoverageHub = {
  slug: "atendimento-militar",
  title: "Atendimento em Direito Militar por estado e cidade",
  description:
    "Mapa editorial de atendimento em Direito Militar com paginas por UF e cidades prioritarias, conectado a servicos juridicos, segmentos do blog e temas recorrentes.",
  featuredStateSlugs: ["df", "es", "rj", "sp", "mg", "go", "pr", "rs", "sc", "ba", "pe", "ce", "am", "pa"],
};

export const getGeoStateBySlug = (slug: string | undefined) =>
  geoStates.find((state) => state.slug === slug);

export const getGeoCityBySlug = (stateSlug: string | undefined, citySlug: string | undefined) =>
  geoCities.find((city) => city.stateSlug === stateSlug && city.slug === citySlug);

export const getGeoCitiesForState = (stateSlug: string) =>
  geoCities.filter((city) => city.stateSlug === stateSlug);

export const getGeoStatePath = (stateSlug: string) => `/atendimento-militar/${stateSlug}`;

export const getGeoCityPath = (stateSlug: string, citySlug: string) => `/atendimento-militar/${stateSlug}/${citySlug}`;
