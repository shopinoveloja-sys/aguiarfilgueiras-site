# Secretaria Carlos - Plano De Adaptacao

## Decisao Tecnica

Usar n8n com nodes LangChain como primeira versao da secretaria, mantendo a logica critica em subworkflows determinisiticos.

O modelo original da Secretaria v3 deve ser tratado como referencia, nao como importacao direta. Ele depende de Chatwoot e Asaas, enquanto o projeto Carlos usa Evolution, Telegram interno, Zoho e Mercado Pago.

## Componentes

- Entrada WhatsApp: Evolution API.
- Cerebro: agente LangChain no n8n.
- Memoria/status: Postgres.
- Alertas internos da secretaria: WhatsApp via Evolution.
- Email: Zoho, ja conectado em workflows auxiliares.
- Agenda: Google Calendar, pendente de credencial/agenda final.
- Pagamento: Mercado Pago.

Observacao importante: Telegram deve continuar reservado aos fluxos ja existentes de blog/artigos e avisos de e-mail. A secretaria do Carlos deve funcionar exclusivamente via WhatsApp/Evolution.

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
  - Status: publicado/ativo.
  - Envia texto via Evolution para a instancia `Carlos_Advogado`.
- `Carlos Secretaria - Escalar WhatsApp`
  - ID: `4bKFjjnhPk1gaFof`
  - Status: publicado/ativo.
  - Ferramenta para avisar Carlos/equipe pelo WhatsApp quando o agente identificar urgencia ou necessidade humana.
- `Carlos Secretaria - Registrar Lead`
  - ID: `bhn81kSond3XddTr`
  - Status: publicado/ativo.
  - Ferramenta para registrar/atualizar telefone, nome e dados qualificados em `dados` JSONB: cidade/UF, corporacao, vinculo, tema, resumo, prazo, urgencia e documentos.
- `Carlos Secretaria - Agenda Pendente`
  - ID: `JrpW6QwBM2HDXd6F`
  - Status: publicado/ativo.
  - Ferramenta temporaria para pedidos de agendamento enquanto a agenda oficial nao estiver conectada.
- `Carlos Secretaria - Core Agent LangChain`
  - ID: `V8vhO8WWD0MdOpXT`
  - Status: publicado/ativo para teste controlado por whitelist.
  - Entrada Evolution: `https://n8n.aguiarfilgueiras.com.br/webhook/secretaria-carlos-core-agent`.
  - Usa OpenRouter + memoria Postgres + ferramentas de registro de lead, escalacao por WhatsApp, agenda pendente e Mercado Pago.

## Evolution E Whitelist

- Instancia Evolution: `Carlos_Advogado`.
- Status observado: conectada/open.
- Numero conectado da Laura/Evolution: `5511988250996` (`11 98825-0996`).
- A Evolution esta com o celular do projeto e apenas dois celulares liberados para teste.
- O core agent esta com whitelist de teste configurada no node `Normalizar Entrada`.
- Numeros de teste liberados: `5511988250996`, `556183806070`, `5527992891634`.
- Enquanto estiver em teste, numeros fora da whitelist, grupos, mensagens enviadas pelo proprio WhatsApp ou mensagens vazias devem ser ignorados.
- A secretaria virtual deve se identificar como Laura quando for natural no atendimento.
- Webhook da Evolution configurado para `MESSAGES_UPSERT`, `webhookByEvents=false`, apontando para o core agent.
- Teste seguro fora da whitelist validado: execucao `179` terminou com sucesso no node `Normalizar Entrada`, sem chamar IA, banco ou envio WhatsApp.

## Ordem Recomendada

1. [x] Criar tabelas Postgres especificas da secretaria sem Chatwoot/Asaas.
2. [x] Criar envio Evolution para texto simples.
3. [x] Criar subworkflow Mercado Pago.
4. [x] Criar ferramenta de escalacao humana por WhatsApp/Evolution.
5. [x] Criar core agent LangChain em modo inativo.
6. [x] Criar ferramenta de registro/atualizacao de lead.
7. [x] Criar ferramenta temporaria de agenda pendente.
8. [x] Adicionar os dois numeros de teste na whitelist.
9. [ ] Testar ponta a ponta com numeros liberados no Evolution.
10. [ ] Conectar agenda Google Calendar apos confirmar agenda/horarios.
11. [ ] Definir politica de pagamento: quando gerar link e qual valor usar.
12. [ ] Ativar entrada Evolution somente depois dos testes controlados.
13. [ ] So depois ativar lembretes, recuperacao de leads e ligacoes.

## Pendencias Para Execucao Controlada

- Confirmar se o alerta humano da secretaria deve ir para o mesmo WhatsApp conectado na Evolution (`11 98825-0996`) ou para outro numero interno da equipe.
- Definir agenda oficial do Carlos/equipe no Google Calendar, horarios de atendimento, duracao padrao e regras de disponibilidade.
- Definir quando a secretaria pode gerar link Mercado Pago, valores possiveis e texto de cobranca.
- Validar prompt final com casos reais: assedio, IPM, punicao disciplinar, exclusao/licenciamento, pensao/reforma e urgencia com prazo.
- O webhook/Evolution ja esta ativo para teste controlado; nao remover a whitelist ate concluir validacao ponta a ponta.

## Limites

- A secretaria nao deve prometer resultado juridico.
- A secretaria deve escalar humano para urgencia, prazo, audiencia, intimacao, assedio, prisao, expulsao, licenciamento ou qualquer risco imediato.
- A secretaria pode qualificar e organizar informacoes, mas nao deve substituir analise juridica do advogado.
- Pagamento e agendamento devem ficar rastreaveis por telefone/external_reference.
