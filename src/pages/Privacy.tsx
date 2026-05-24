export default function Privacy() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0b0f19',
      color: '#e2e8f0',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '24px',
    }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <header style={{ marginBottom: 40, textAlign: 'center' }}>
          <h1 style={{ color: '#fff', fontSize: 28, fontWeight: 800, marginBottom: 8 }}>
            Política de Privacidade
          </h1>
          <p style={{ color: '#64748b', fontSize: 14 }}>DriverCash — Última atualização: 11 de maio de 2026</p>
        </header>

        <section style={{ marginBottom: 32 }}>
          <h2 style={h2Style}>1. Introdução</h2>
          <p style={pStyle}>
            O DriverCash ("nós", "nosso" ou "aplicativo") é um aplicativo de gestão financeira pessoal
            desenvolvido para motoristas de aplicativo. Esta Política de Privacidade descreve como
            coletamos, usamos, armazenamos e protegemos suas informações quando você utiliza nosso
            aplicativo e serviços.
          </p>
          <p style={pStyle}>
            Ao utilizar o DriverCash, você concorda com as práticas descritas nesta política.
            Caso não concorde, por favor, não utilize nossos serviços.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={h2Style}>2. Informações que Coletamos</h2>
          <h3 style={h3Style}>2.1 Informações fornecidas por você:</h3>
          <ul style={ulStyle}>
            <li>Nome completo</li>
            <li>Endereço de e-mail</li>
            <li>Número de telefone celular</li>
            <li>CPF (documento de identificação)</li>
            <li>Dados de login via Google (quando aplicável)</li>
          </ul>

          <h3 style={h3Style}>2.2 Informações de uso do aplicativo:</h3>
          <ul style={ulStyle}>
            <li>Dados financeiros inseridos manualmente (ganhos, despesas, quilometragem)</li>
            <li>Metas financeiras e planejamento</li>
            <li>Histórico de corridas e registros de trabalho</li>
            <li>Dados de assinatura e pagamento (processados pelo Google Play)</li>
          </ul>

          <h3 style={h3Style}>2.3 Informações coletadas automaticamente:</h3>
          <ul style={ulStyle}>
            <li>Tipo de dispositivo e sistema operacional</li>
            <li>Dados de sessão e interação com o aplicativo</li>
          </ul>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={h2Style}>3. Como Usamos suas Informações</h2>
          <ul style={ulStyle}>
            <li>Fornecer e manter os serviços do DriverCash</li>
            <li>Autenticar sua conta e garantir a segurança</li>
            <li>Processar assinaturas e pagamentos via Google Play Billing</li>
            <li>Gerenciar o programa de indicação e comissões</li>
            <li>Enviar notificações sobre sua conta (como verificação de telefone)</li>
            <li>Melhorar nossos serviços e experiência do usuário</li>
            <li>Cumprir obrigações legais e regulamentares</li>
          </ul>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={h2Style}>4. Compartilhamento de Dados</h2>
          <p style={pStyle}>
            <strong>Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros
            para fins de marketing.</strong> Podemos compartilhar informações apenas nas seguintes
            situações:
          </p>
          <ul style={ulStyle}>
            <li><strong>Google Play:</strong> Para processamento de pagamentos e assinaturas</li>
            <li><strong>Provedores de serviço:</strong> Para envio de SMS de verificação</li>
            <li><strong>Obrigações legais:</strong> Quando exigido por lei ou ordem judicial</li>
          </ul>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={h2Style}>5. Segurança dos Dados</h2>
          <p style={pStyle}>
            Implementamos medidas técnicas e organizacionais para proteger seus dados:
          </p>
          <ul style={ulStyle}>
            <li>Senhas armazenadas com hash criptográfico (bcrypt)</li>
            <li>Comunicações criptografadas via HTTPS/TLS</li>
            <li>Tokens de autenticação JWT com expiração</li>
            <li>Acesso restrito ao banco de dados</li>
          </ul>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={h2Style}>6. Retenção de Dados</h2>
          <p style={pStyle}>
            Mantemos seus dados enquanto sua conta estiver ativa. Você pode solicitar a exclusão
            da sua conta e dados a qualquer momento entrando em contato conosco. Após a solicitação,
            seus dados serão removidos em até 30 dias, exceto quando a retenção for necessária
            por obrigações legais.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={h2Style}>7. Seus Direitos (LGPD)</h2>
          <p style={pStyle}>
            De acordo com a Lei Geral de Proteção de Dados (Lei 13.709/2018), você tem direito a:
          </p>
          <ul style={ulStyle}>
            <li>Acessar seus dados pessoais</li>
            <li>Corrigir dados incompletos ou desatualizados</li>
            <li>Solicitar a exclusão dos seus dados</li>
            <li>Revogar o consentimento para o tratamento dos dados</li>
            <li>Solicitar a portabilidade dos dados</li>
            <li>Obter informações sobre o compartilhamento dos dados</li>
          </ul>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={h2Style}>8. Programa de Indicação</h2>
          <p style={pStyle}>
            O DriverCash possui um programa de indicação que funciona da seguinte forma:
          </p>
          <ul style={ulStyle}>
            <li>Assinantes ativos recebem um código de indicação único</li>
            <li>Novos usuários que utilizam um código recebem 30 dias de teste grátis</li>
            <li>Quando um usuário indicado assina o plano anual, o indicador recebe R$ 10,00</li>
            <li>Indicações de segundo nível geram comissão de R$ 5,00</li>
            <li>O saque das comissões pode ser solicitado quando o saldo atinge R$ 200,00</li>
            <li>Os valores são pagos via PIX após solicitação</li>
          </ul>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={h2Style}>9. Assinatura e Pagamentos</h2>
          <p style={pStyle}>
            O DriverCash opera com um modelo de assinatura anual processado exclusivamente
            pelo Google Play Billing. Não armazenamos dados de cartão de crédito. Todas as
            informações de pagamento são gerenciadas diretamente pelo Google.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={h2Style}>10. Menores de Idade</h2>
          <p style={pStyle}>
            O DriverCash não é destinado a menores de 18 anos. Não coletamos intencionalmente
            dados de menores. Se tomarmos conhecimento de que coletamos dados de um menor,
            tomaremos medidas para excluir essas informações.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={h2Style}>11. Alterações nesta Política</h2>
          <p style={pStyle}>
            Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre
            alterações significativas por meio do aplicativo. A data da última atualização será
            sempre indicada no topo desta página.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={h2Style}>12. Contato</h2>
          <p style={pStyle}>
            Para dúvidas, solicitações ou reclamações sobre esta política, entre em contato:
          </p>
          <ul style={ulStyle}>
            <li><strong>E-mail:</strong> drivercash.app@gmail.com</li>
            <li><strong>Desenvolvedor:</strong> Alex Sandro Aguiar da Silva</li>
          </ul>
        </section>

        <footer style={{
          borderTop: '1px solid #1f2a3d',
          paddingTop: 24,
          marginTop: 40,
          textAlign: 'center',
          color: '#475569',
          fontSize: 13,
        }}>
          <p>© 2026 DriverCash. Todos os direitos reservados.</p>
        </footer>
      </div>
    </div>
  );
}

const h2Style: React.CSSProperties = {
  color: '#10b981',
  fontSize: 20,
  fontWeight: 700,
  marginBottom: 12,
  paddingBottom: 8,
  borderBottom: '1px solid #1f2a3d',
};

const h3Style: React.CSSProperties = {
  color: '#94a3b8',
  fontSize: 16,
  fontWeight: 600,
  marginTop: 16,
  marginBottom: 8,
};

const pStyle: React.CSSProperties = {
  lineHeight: 1.7,
  marginBottom: 12,
  fontSize: 15,
  color: '#cbd5e1',
};

const ulStyle: React.CSSProperties = {
  paddingLeft: 24,
  lineHeight: 1.8,
  fontSize: 15,
  color: '#cbd5e1',
};
