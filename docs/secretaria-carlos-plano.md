# Secretaria Carlos - Plano De Adaptacao

## Decisao Tecnica

Usar n8n com nodes LangChain como primeira versao da secretaria, mantendo a logica critica em subworkflows determinisiticos.

O modelo original da Secretaria v3 deve ser tratado como referencia, nao como importacao direta. Ele depende de Chatwoot e Asaas, enquanto o projeto Carlos usa Evolution, Telegram interno, Zoho e Mercado Pago.

## Componentes

- Entrada WhatsApp: Evolution API.
- Cerebro: agente LangChain no n8n.
- Memoria/status: Postgres.
- Alertas internos: Telegram do Carlos/equipe.
- Email: Zoho, ja conectado em workflows auxiliares.
- Agenda: Google Calendar, pendente de credencial/agenda final.
- Pagamento: Mercado Pago.

## Subworkflow Mercado Pago

- Nome: `Carlos - Mercado Pago Criar Link`
- ID: `VdUCQ2W7hUea3aJ1`
- Status: criado.
- Credencial: temporaria no n8n, sem token em arquivo.

Contrato:

- Entrada: `valor`, `descricao`, `nome`, `email`, `telefone`, `external_reference`.
- Saida: `preference_id`, `init_point`, `sandbox_init_point`, `external_reference`.

Quando a conta Mercado Pago do Carlos estiver pronta, trocar apenas a credencial no n8n.

## Ordem Recomendada

1. Criar tabelas Postgres especificas da secretaria sem Chatwoot/Asaas.
2. Criar entrada Evolution para mensagens recebidas.
3. Criar envio Evolution para texto quebrado.
4. Criar agente LangChain com prompt juridico do Carlos.
5. Conectar ferramentas: escalar humano, agenda, pagamento, registrar lead.
6. Testar com numeros liberados no Evolution.
7. So depois ativar lembretes, recuperacao de leads e ligacoes.

## Limites

- A secretaria nao deve prometer resultado juridico.
- A secretaria deve escalar humano para urgencia, prazo, audiencia, intimacao, assedio, prisao, expulsao, licenciamento ou qualquer risco imediato.
- A secretaria pode qualificar e organizar informacoes, mas nao deve substituir analise juridica do advogado.
- Pagamento e agendamento devem ficar rastreaveis por telefone/external_reference.
