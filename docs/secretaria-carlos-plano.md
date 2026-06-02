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

## Workflows Criados Para A Secretaria

- `Carlos Secretaria - Configurar Tabelas`
  - ID: `Ci9tQeImV1ymye5o`
  - Status: executado uma vez e depois desativado.
  - Criou as tabelas Postgres da secretaria.
- `Carlos Secretaria - Enviar Evolution`
  - ID: `WzJTlAKhSqjLw0mn`
  - Status: criado e inativo.
  - Envia texto via Evolution para a instancia `Carlos_Advogado`.
- `Carlos Secretaria - Escalar Telegram`
  - ID: `KLQzd8lxzgI53Jjv`
  - Status: criado e inativo.
  - Ferramenta para avisar Carlos/equipe no Telegram quando o agente identificar urgencia ou necessidade humana.
- `Carlos Secretaria - Core Agent LangChain`
  - ID: `V8vhO8WWD0MdOpXT`
  - Status: criado e inativo.
  - Entrada teste: webhook `secretaria-carlos-core-agent`.
  - Usa OpenRouter + memoria Postgres + ferramentas de escalacao e Mercado Pago.

## Evolution E Whitelist

- Instancia Evolution: `Carlos_Advogado`.
- Status observado: conectada/open.
- A Evolution esta com o celular do projeto e apenas dois celulares liberados para teste.
- O core agent foi criado com whitelist conservadora contendo apenas o numero principal conhecido.
- Antes de ativar qualquer entrada publica, adicionar os dois numeros de teste no node `Normalizar Entrada`.
- Enquanto estiver em teste, numeros fora da whitelist, grupos, mensagens enviadas pelo proprio WhatsApp ou mensagens vazias devem ser ignorados.

## Ordem Recomendada

1. [x] Criar tabelas Postgres especificas da secretaria sem Chatwoot/Asaas.
2. [x] Criar envio Evolution para texto simples.
3. [x] Criar subworkflow Mercado Pago.
4. [x] Criar ferramenta de escalacao humana por Telegram.
5. [x] Criar core agent LangChain em modo inativo.
6. [ ] Adicionar os dois numeros de teste na whitelist.
7. [ ] Testar ponta a ponta com numeros liberados no Evolution.
8. [ ] Conectar agenda Google Calendar apos confirmar agenda/horarios.
9. [ ] Ativar entrada Evolution somente depois dos testes controlados.
10. [ ] So depois ativar lembretes, recuperacao de leads e ligacoes.

## Limites

- A secretaria nao deve prometer resultado juridico.
- A secretaria deve escalar humano para urgencia, prazo, audiencia, intimacao, assedio, prisao, expulsao, licenciamento ou qualquer risco imediato.
- A secretaria pode qualificar e organizar informacoes, mas nao deve substituir analise juridica do advogado.
- Pagamento e agendamento devem ficar rastreaveis por telefone/external_reference.
