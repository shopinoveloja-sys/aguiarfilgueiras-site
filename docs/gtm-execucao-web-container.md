# Execucao GTM Web - tracking organico/social

Container: `GTM-MPXN6L4L`.

Measurement ID GA4 identificado no container: `G-5BWKM1RQ3W`.

Status do site: tracking implementado no codigo do site GitHub/Vite. O tema WordPress foi atualizado apenas como espelho, mas nao deve ser considerado a fonte principal de producao.

## Configuracao recomendada no Web GTM

Criar uma estrutura nova com prefixo `DLV -`, `CE -` e `GA4 -`, sem reativar as tags antigas pausadas.

## Variaveis Data Layer

Criar variaveis do tipo "Variavel da camada de dados":

| Nome | Nome da variavel da camada de dados |
| --- | --- |
| `DLV - event_id` | `event_id` |
| `DLV - page_title` | `page_title` |
| `DLV - page_path` | `page_path` |
| `DLV - page_location` | `page_location` |
| `DLV - button_text` | `button_text` |
| `DLV - link_url` | `link_url` |
| `DLV - social_network` | `social_network` |
| `DLV - content_type` | `content_type` |
| `DLV - article_title` | `article_title` |
| `DLV - traffic_source` | `traffic_source` |
| `DLV - traffic_medium` | `traffic_medium` |
| `DLV - utm_source` | `utm_source` |
| `DLV - utm_medium` | `utm_medium` |
| `DLV - utm_campaign` | `utm_campaign` |
| `DLV - utm_content` | `utm_content` |
| `DLV - utm_term` | `utm_term` |
| `DLV - placement` | `placement` |

## Acionadores Custom Event

Criar acionadores do tipo "Evento personalizado":

| Nome | Nome do evento |
| --- | --- |
| `CE - instagram_click` | `instagram_click` |
| `CE - facebook_click` | `facebook_click` |
| `CE - youtube_click` | `youtube_click` |
| `CE - x_click` | `x_click` |
| `CE - linkedin_click` | `linkedin_click` |
| `CE - social_profile_click` | `social_profile_click` |
| `CE - embedded_video_click` | `embedded_video_click` |
| `CE - video_cta_click` | `video_cta_click` |
| `CE - form_submit_contact` | `form_submit_contact` |
| `CE - click_whatsapp` | `click_whatsapp` |
| `CE - click_agendar_whatsapp` | `click_agendar_whatsapp` |
| `CE - service_cta_whatsapp` | `service_cta_whatsapp` |
| `CE - blog_cta_whatsapp` | `blog_cta_whatsapp` |

## Tags GA4 Event

Criar uma tag GA4 Event por evento, usando a tag/base GA4 limpa `G-5BWKM1RQ3W`.

Parametros a enviar em todas as tags:

| Parametro GA4 | Valor GTM |
| --- | --- |
| `event_id` | `{{DLV - event_id}}` |
| `page_title` | `{{DLV - page_title}}` |
| `page_path` | `{{DLV - page_path}}` |
| `page_location` | `{{DLV - page_location}}` |
| `button_text` | `{{DLV - button_text}}` |
| `link_url` | `{{DLV - link_url}}` |
| `social_network` | `{{DLV - social_network}}` |
| `content_type` | `{{DLV - content_type}}` |
| `article_title` | `{{DLV - article_title}}` |
| `traffic_source` | `{{DLV - traffic_source}}` |
| `traffic_medium` | `{{DLV - traffic_medium}}` |
| `utm_source` | `{{DLV - utm_source}}` |
| `utm_medium` | `{{DLV - utm_medium}}` |
| `utm_campaign` | `{{DLV - utm_campaign}}` |
| `utm_content` | `{{DLV - utm_content}}` |
| `utm_term` | `{{DLV - utm_term}}` |
| `placement` | `{{DLV - placement}}` |

Tags a criar:

| Nome da tag | Nome do evento GA4 | Acionador |
| --- | --- | --- |
| `GA4 - instagram_click` | `instagram_click` | `CE - instagram_click` |
| `GA4 - facebook_click` | `facebook_click` | `CE - facebook_click` |
| `GA4 - youtube_click` | `youtube_click` | `CE - youtube_click` |
| `GA4 - x_click` | `x_click` | `CE - x_click` |
| `GA4 - linkedin_click` | `linkedin_click` | `CE - linkedin_click` |
| `GA4 - social_profile_click` | `social_profile_click` | `CE - social_profile_click` |
| `GA4 - embedded_video_click` | `embedded_video_click` | `CE - embedded_video_click` |
| `GA4 - video_cta_click` | `video_cta_click` | `CE - video_cta_click` |
| `GA4 - form_submit_contact` | `form_submit_contact` | `CE - form_submit_contact` |
| `GA4 - click_whatsapp` | `click_whatsapp` | `CE - click_whatsapp` |
| `GA4 - click_agendar_whatsapp` | `click_agendar_whatsapp` | `CE - click_agendar_whatsapp` |
| `GA4 - service_cta_whatsapp` | `service_cta_whatsapp` | `CE - service_cta_whatsapp` |
| `GA4 - blog_cta_whatsapp` | `blog_cta_whatsapp` | `CE - blog_cta_whatsapp` |

## Desduplicacao

Para nao duplicar:

- nao reativar as tags antigas `GA4 - click_*` baseadas em clique outbound;
- usar apenas os eventos do `dataLayer` enviados pelo site;
- manter uma unica tag GA4 por evento;
- se configurar Server GTM, a Google Tag e as tags GA4 devem rotear para o server container, nao enviar duplicado direto e server ao mesmo tempo.

## Server-side pendente

Antes de ativar server-side no Web GTM, definir endpoint:

```text
https://tags.aguiarfilgueiras.com.br
```

ou outro subdominio oficial.

Sem endpoint ativo, nao configurar `server_container_url`, pois isso pode quebrar ou atrasar a coleta.

## Key events no GA4

Marcar como key event/conversao:

- `form_submit_contact`
- `click_whatsapp`
- `click_agendar_whatsapp`
- `service_cta_whatsapp`
- `blog_cta_whatsapp`

Nao marcar como key event:

- `instagram_click`
- `facebook_click`
- `youtube_click`
- `x_click`
- `linkedin_click`
- `social_profile_click`
- `embedded_video_click`
- `video_cta_click`

