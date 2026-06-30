# GTM server-side e desduplicacao

Objetivo: configurar o GTM server-side para processar os eventos do site sem duplicar eventos no GA4 e deixando `event_id` disponivel para auditoria e integracoes futuras, como Meta CAPI.

## Auditoria do container atual

Data da auditoria: 08/06/2026.

Container Web aberto:

- Conta: Aguiar Filgueiras Advocacia.
- Container: Site - aguiarfilgueiras.com.br.
- ID instalado no site: `GTM-MPXN6L4L`.
- Workspace: Default Workspace.
- Alteracoes pendentes: 0.
- Versao publicada: Versao 4.

Tags encontradas:

- `GA4 - Google tag (G-5BWKM1RQ3W)` - pausada por alerta do sistema de verificacao do Google.
- `GA4 - click_whatsapp` - pausada por alerta do sistema de verificacao do Google.
- `GA4 - click_instagram` - pausada por alerta do sistema de verificacao do Google.
- `GA4 - click_facebook` - pausada por alerta do sistema de verificacao do Google.
- `Meta Pixel - PageView` - pausada por alerta do sistema de verificacao do Google.

Acionadores encontrados:

- `CL - WhatsApp (Outbound)`.
- `CL - Instagram (Outbound)`.
- `CL - Facebook (Outbound)`.

Variaveis encontradas:

- Somente variaveis incorporadas.
- Nenhuma variavel personalizada de Data Layer criada ainda.

Conclusao da auditoria:

- Nao publicar novas tags em cima da estrutura antiga sem revisar o alerta de malware.
- Nao reativar as tags pausadas antes de revisar o motivo do alerta.
- Migrar a coleta nova para eventos de `dataLayer`, porque o site agora envia `event_id`, UTMs, rede social, origem, medium, URL e posicao do clique.
- Configurar server-side somente depois de definir o endpoint do servidor de tags, por exemplo `https://tags.aguiarfilgueiras.com.br`.

## Regra principal

Para GA4, nao envie o mesmo evento ao GA4 pelo navegador e pelo server container ao mesmo tempo.

Escolha um fluxo por evento:

1. Web GTM -> server container -> GA4.
2. Web GTM -> GA4 direto.

No projeto do escritorio, a recomendacao e usar a opcao 1 para todos os eventos configurados no GTM, mantendo o Web GTM como camada de coleta e o Server GTM como camada de encaminhamento, validacao e enriquecimento.

## O que configurar no Web GTM

1. Manter o container Web atual instalado no site.
2. Na Google Tag/GA4 Configuration, configurar o envio para o server container usando o endpoint do sGTM.
3. Garantir que as GA4 Event Tags usem a mesma configuracao/base tag que aponta para o server container.
4. Nao manter uma tag GA4 paralela enviando direto para `google-analytics.com` para os mesmos eventos.
5. Criar variaveis de Data Layer:
   - `event_id`
   - `page_title`
   - `page_path`
   - `page_location`
   - `button_text`
   - `link_url`
   - `social_network`
   - `content_type`
   - `article_title`
   - `traffic_source`
   - `traffic_medium`
   - `utm_source`
   - `utm_medium`
   - `utm_campaign`
   - `utm_content`
   - `utm_term`
   - `placement`
6. Criar triggers de Custom Event para:
   - `instagram_click`
   - `facebook_click`
   - `youtube_click`
   - `x_click`
   - `linkedin_click`
   - `social_profile_click`
   - `embedded_video_click`
   - `video_cta_click`
7. Revisar os eventos ja existentes:
   - `form_submit_contact`
   - `click_whatsapp`
   - `click_agendar_whatsapp`
   - `service_cta_whatsapp`
   - `blog_cta_whatsapp`

Importante: as tags antigas de clique outbound (`CL - WhatsApp`, `CL - Instagram`, `CL - Facebook`) devem ser substituidas ou pausadas quando os eventos por `dataLayer` forem publicados, para nao duplicar cliques.

## O que configurar no Server GTM

1. Criar ou usar um container Server no GTM.
2. Configurar o dominio proprio do servidor, por exemplo:
   - `https://tags.aguiarfilgueiras.com.br`
3. Configurar o GA4 Client no server container para receber os hits vindos do Web GTM.
4. Criar uma GA4 Event Tag no server container para encaminhar os eventos ao GA4.
5. Encaminhar os parametros recebidos:
   - `event_id`
   - `page_title`
   - `page_path`
   - `page_location`
   - `button_text`
   - `link_url`
   - `social_network`
   - `content_type`
   - `article_title`
   - `traffic_source`
   - `traffic_medium`
   - `utm_source`
   - `utm_medium`
   - `utm_campaign`
   - `utm_content`
   - `utm_term`
   - `placement`
6. Se houver Meta CAPI no futuro, usar o mesmo `event_id` que veio do navegador para deduplicar browser/server na Meta.

## Ordem recomendada de execucao

1. Criar ou confirmar o Server Container do GTM.
2. Configurar dominio/subdominio do server-side tagging.
3. Criar variaveis personalizadas no Web GTM.
4. Criar acionadores por Custom Event no Web GTM.
5. Criar novas tags GA4 por evento ou uma tag padrao que use `{{Event}}`, desde que nao gere duplicidade.
6. Configurar a Google Tag/GA4 para enviar ao Server GTM.
7. Configurar o GA4 Client e GA4 Event Tag no Server GTM.
8. Testar Web Preview, Server Preview e GA4 DebugView.
9. So depois publicar.

## Tags antigas pausadas

Como o Google sinalizou tags como possivel malware, nao e recomendado simplesmente reativar.

Acao recomendada:

- revisar a tag `Meta Pixel - PageView`, porque Custom HTML costuma ser o ponto mais sensivel;
- recriar a Google Tag e eventos GA4 com templates nativos do GTM, se necessario;
- remover qualquer Custom HTML desnecessario;
- manter Meta Pixel/CAPI fora da publicacao inicial, se o objetivo imediato for apenas GA4/GTM organico/social;
- depois de limpar, publicar uma nova versao com nome claro, por exemplo `Tracking organico/social + sGTM - MVP controlado`.

## Como evitar duplicidade

- No Web GTM, nao criar duas tags GA4 para o mesmo evento.
- No Server GTM, nao criar duas tags GA4 disparando no mesmo client/trigger.
- Nao deixar GA4 direto no site via `gtag.js` e tambem via GTM para o mesmo measurement ID.
- Nao enviar Measurement Protocol manual para eventos que ja entram pelo Web GTM -> Server GTM.
- Para compras, se existirem no futuro, usar `transaction_id`. No site atual, os eventos sao leads/cliques, nao ecommerce.
- Testar no Preview do Web GTM e do Server GTM antes de publicar.

## Validacao

### Web GTM Preview

1. Abrir o site em modo Preview.
2. Clicar nos links sociais e CTAs de WhatsApp.
3. Confirmar que cada evento aparece uma unica vez no Web GTM.
4. Confirmar que `event_id` existe em cada evento.

### Server GTM Preview

1. Abrir o Preview do server container.
2. Confirmar que os eventos chegam pelo GA4 Client.
3. Confirmar que apenas uma GA4 Event Tag dispara por evento.
4. Conferir se os parametros chegaram ao server container.

### GA4 DebugView

1. Confirmar que os eventos chegam uma unica vez.
2. Conferir parametros principais.
3. Confirmar que UTMs aparecem corretamente nas sessoes.
4. Marcar como key event apenas eventos de lead:
   - `form_submit_contact`
   - `click_whatsapp`
   - `click_agendar_whatsapp`

## Checklist antes de publicar

- [ ] Endpoint server-side definido.
- [ ] Web GTM apontando para o server container.
- [ ] Tags GA4 diretas duplicadas pausadas ou removidas.
- [ ] GA4 Client funcionando no Server GTM.
- [ ] Uma unica GA4 Event Tag dispara por evento no Server GTM.
- [ ] `event_id` chegando no Web GTM e no Server GTM.
- [ ] Eventos sociais testados.
- [ ] Eventos de lead testados.
- [ ] GA4 DebugView sem duplicidade.
- [ ] Search Console sem alteracao.
