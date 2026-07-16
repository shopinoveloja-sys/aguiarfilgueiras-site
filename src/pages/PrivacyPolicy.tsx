import LegalPage from "./LegalPage";

const PrivacyPolicy = () => {
  return (
    <LegalPage
      title="Politica de Privacidade"
      description="Esta politica explica como o Aguiar Filgueiras Advocacia coleta, utiliza, protege e trata dados pessoais fornecidos por visitantes do site, em conformidade com a legislacao aplicavel."
      canonicalPath="/politica-de-privacidade/"
      eyebrow="Privacidade"
      sections={[
        {
          title: "1. Informacoes coletadas",
          paragraphs: [
            "Podemos coletar informacoes fornecidas voluntariamente por voce ao preencher formularios, entrar em contato pelo WhatsApp, enviar e-mails ou solicitar atendimento, como nome, telefone, e-mail e demais dados que voce escolher informar.",
            "Tambem podemos coletar informacoes de navegacao de forma automatica, como endereco IP, tipo de navegador, dispositivo utilizado, paginas visitadas, tempo de permanencia e interacoes com o site, inclusive por meio de cookies e ferramentas de analise, como Google Analytics e Google Tag Manager.",
          ],
        },
        {
          title: "2. Finalidade do uso dos dados",
          paragraphs: ["Os dados coletados podem ser utilizados para as seguintes finalidades:"],
          bullets: [
            "Responder contatos, pedidos de informacao e solicitacoes de atendimento.",
            "Organizar o primeiro atendimento e direcionar demandas relacionadas aos servicos do escritorio.",
            "Melhorar a experiencia de navegacao, desempenho, seguranca e usabilidade do site.",
            "Mensurar acessos, origem de trafego e desempenho de conteudos institucionais e informativos.",
            "Cumprir obrigacoes legais, regulatorias ou atender determinacoes de autoridades competentes.",
          ],
        },
        {
          title: "3. Base legal e tratamento de dados",
          paragraphs: [
            "O tratamento de dados pessoais pode ocorrer com fundamento no consentimento do titular, na execucao de procedimentos preliminares relacionados a eventual contratacao, no exercicio regular de direitos e no cumprimento de obrigacoes legais ou regulatorias, conforme aplicavel em cada situacao.",
            "Os conteudos publicados no site possuem carater informativo e institucional. O envio de dados por formularios ou canais de contato nao implica automaticamente contratacao de servicos juridicos nem constitui formacao imediata de relacao advogado-cliente.",
          ],
        },
        {
          title: "4. Compartilhamento de dados",
          paragraphs: [
            "O escritorio nao vende dados pessoais nem compartilha informacoes com terceiros para fins comerciais indevidos.",
            "Dados podem ser compartilhados apenas quando necessario para o funcionamento tecnico do site, para execucao de ferramentas de hospedagem, analytics, comunicacao e seguranca, ou ainda quando houver obrigacao legal, ordem judicial ou requisicao de autoridade competente.",
          ],
        },
        {
          title: "5. Cookies e tecnologias semelhantes",
          paragraphs: [
            "Este site utiliza cookies e tecnologias semelhantes para melhorar a navegacao, registrar preferencias, avaliar performance de paginas e compreender a origem do trafego.",
            "Voce pode, a qualquer momento, gerenciar ou desabilitar cookies nas configuracoes do seu navegador. Algumas funcionalidades podem ser impactadas caso determinados cookies sejam bloqueados.",
          ],
        },
        {
          title: "6. Seguranca das informacoes",
          paragraphs: [
            "Adotamos medidas tecnicas e organizacionais razoaveis para reduzir riscos de acesso nao autorizado, perda, uso indevido, alteracao ou divulgacao indevida de dados pessoais.",
            "Apesar dos esforcos de seguranca, nenhum ambiente digital e absolutamente inviolavel. Por isso, recomendamos que o envio de informacoes sensiveis seja feito com cautela e, quando necessario, diretamente pelos canais indicados pelo escritorio.",
          ],
        },
        {
          title: "7. Direitos do titular",
          paragraphs: [
            "Nos termos da Lei Geral de Protecao de Dados Pessoais (Lei n 13.709/2018), voce pode solicitar confirmacao da existencia de tratamento, acesso, correcao, anonimização, bloqueio, eliminacao, portabilidade, informacao sobre compartilhamento e revogacao de consentimento, quando aplicavel.",
            "As solicitacoes serao analisadas de acordo com a legislacao aplicavel e com a natureza do dado tratado, podendo haver retencao quando necessaria para cumprimento de obrigacoes legais ou exercicio regular de direitos.",
          ],
        },
        {
          title: "8. Retencao de dados",
          paragraphs: [
            "Os dados pessoais sao mantidos pelo tempo necessario para atender as finalidades desta politica, para resguardar direitos do escritorio ou pelo prazo exigido por lei, regulacao ou ordem de autoridade competente.",
          ],
        },
        {
          title: "9. Alteracoes desta politica",
          paragraphs: [
            "Esta Politica de Privacidade pode ser atualizada periodicamente para refletir mudancas legais, operacionais ou tecnicas. Recomendamos a consulta regular desta pagina.",
          ],
        },
      ]}
    />
  );
};

export default PrivacyPolicy;
