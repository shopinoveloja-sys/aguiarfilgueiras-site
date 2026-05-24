export default function AccountDeletion() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#020617',
      color: '#e2e8f0',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '24px',
    }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <header style={{ marginBottom: 40, textAlign: 'center' }}>
          <img alt="DriverCash" src="/drivercash-logo.svg" style={{ width: 72, height: 72, margin: '0 auto 16px', objectFit: 'contain' }} />
          <h1 style={{ color: '#fff', fontSize: 28, fontWeight: 800, marginBottom: 8 }}>
            Exclusao de conta e dados
          </h1>
          <p style={{ color: '#64748b', fontSize: 14 }}>DriverCash - ultima atualizacao: 24 de maio de 2026</p>
        </header>

        <section style={{ marginBottom: 32 }}>
          <h2 style={h2Style}>Como solicitar a exclusao</h2>
          <p style={pStyle}>
            Para solicitar a exclusao da sua conta DriverCash e dos dados associados, envie um e-mail
            para <strong>drivercash.app@gmail.com</strong> usando o mesmo e-mail cadastrado no aplicativo.
          </p>
          <p style={pStyle}>
            Use o assunto <strong>Excluir minha conta DriverCash</strong> e informe no corpo da mensagem
            que deseja remover sua conta e seus dados pessoais.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={h2Style}>Dados que serao excluidos</h2>
          <ul style={ulStyle}>
            <li>Dados de cadastro, como nome, e-mail, telefone e foto de perfil, quando existentes.</li>
            <li>Receitas, despesas, reservas, metas, KM, combustivel, manutencoes e metricas operacionais cadastradas no app.</li>
            <li>Dados de indicacao vinculados a sua conta, quando aplicavel.</li>
            <li>Tokens e dados internos de acesso associados a conta.</li>
          </ul>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={h2Style}>Dados que podem ser mantidos</h2>
          <p style={pStyle}>
            Alguns registros podem ser mantidos pelo prazo necessario para cumprimento de obrigacoes legais,
            fiscais, antifraude, auditoria, defesa de direitos ou comprovacao de pagamentos e assinaturas.
            Quando isso ocorrer, manteremos apenas o minimo necessario.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={h2Style}>Prazo</h2>
          <p style={pStyle}>
            Apos a confirmacao da titularidade da conta, a exclusao sera concluida em ate 30 dias,
            salvo quando a retencao de algum dado for exigida por obrigacao legal.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={h2Style}>Cancelamento de assinatura</h2>
          <p style={pStyle}>
            Se voce tiver uma assinatura ativa pelo Google Play, cancele tambem a assinatura na sua
            conta Google Play. A exclusao da conta no DriverCash nao cancela automaticamente cobrancas
            gerenciadas diretamente pelo Google Play.
          </p>
        </section>

        <footer style={{
          borderTop: '1px solid #1e293b',
          paddingTop: 24,
          marginTop: 40,
          textAlign: 'center',
          color: '#475569',
          fontSize: 13,
        }}>
          <p>DriverCash - drivercash.app@gmail.com</p>
        </footer>
      </div>
    </div>
  );
}

const h2Style: React.CSSProperties = {
  color: '#3b82f6',
  fontSize: 20,
  fontWeight: 700,
  marginBottom: 12,
  paddingBottom: 8,
  borderBottom: '1px solid #1e293b',
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
