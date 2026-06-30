# Tracking organico, social e campanhas - Aguiar Filgueiras

Status: especificacao para implementar no GA4/GTM sem alterar Search Console.

Objetivo: identificar quais canais trazem visitantes qualificados e geram contatos para o escritorio, separando Google organico, Google Ads, Instagram, Facebook, YouTube, X/Twitter, LinkedIn, trafego direto e links com UTM.

## Principios

- Nao duplicar tags existentes no GTM.
- Nao alterar configuracoes do Search Console.
- Nao misturar trafego pago com organico/social sem UTMs claras.
- Usar UTM em todo link publicado fora do site.
- Marcar como conversao/key event apenas eventos reais de lead.
- Manter eventos de clique social como eventos de engajamento, nao como conversao principal.

## Canais a separar

| Canal | Identificacao principal | Observacao |
| --- | --- | --- |
| Google organico | `source=google`, `medium=organic` no GA4 | Medir intencao forte de busca. |
| Google Ads | UTMs ou auto-tagging `gclid` | Usar `utm_medium=cpc` quando houver UTM manual. |
| Instagram | `utm_source=instagram`, `utm_medium=social` | Bio, stories, posts, reels e direct. |
| Facebook | `utm_source=facebook`, `utm_medium=social` | Pagina, posts, grupos e anuncios se separados por campanha. |
| YouTube | `utm_source=youtube`, `utm_medium=video` | Descricoes, cards, comentarios fixados e tela final. |
| X/Twitter | `utm_source=x`, `utm_medium=social` | Perfil, posts e threads. |
| LinkedIn | `utm_source=linkedin`, `utm_medium=social` | Perfil profissional, pagina, posts e artigos. |
| Direto | Sem referer e sem UTM | Pode conter trafego social perdido se links nao tiverem UTM. |
| UTM customizada | `utm_source`, `utm_medium`, `utm_campaign` | Sempre prevalece na analise. |

## Padrao de UTMs

Usar nomes em minusculo, sem acentos, sem espacos e separados por underline.

Campos obrigatorios:

- `utm_source`: canal/plataforma.
- `utm_medium`: tipo de trafego.
- `utm_campaign`: campanha ou iniciativa.

Campos opcionais:

- `utm_content`: criativo, posicao ou formato.
- `utm_term`: termo pago ou segmentacao, quando aplicavel.

### Instagram

Padrao:

```text
utm_source=instagram
utm_medium=social
utm_campaign=nome_da_campanha
```

Exemplos:

```text
https://aguiarfilgueiras.com.br/?utm_source=instagram&utm_medium=social&utm_campaign=bio_principal
https://aguiarfilgueiras.com.br/direito-militar/?utm_source=instagram&utm_medium=social&utm_campaign=stories_direito_militar&utm_content=story_01
https://aguiarfilgueiras.com.br/artigos/punicao-disciplinar/?utm_source=instagram&utm_medium=social&utm_campaign=reels_punicao_disciplinar&utm_content=reels_cta
```

### Facebook

Padrao:

```text
utm_source=facebook
utm_medium=social
utm_campaign=nome_da_campanha
```

Exemplos:

```text
https://aguiarfilgueiras.com.br/?utm_source=facebook&utm_medium=social&utm_campaign=pagina_principal
https://aguiarfilgueiras.com.br/direito-militar/?utm_source=facebook&utm_medium=social&utm_campaign=post_direito_militar&utm_content=feed
```

Para trafego pago no Facebook/Meta Ads, nao usar `utm_medium=social`. Usar:

```text
utm_source=facebook
utm_medium=paid_social
utm_campaign=nome_da_campanha
```

### YouTube

Padrao:

```text
utm_source=youtube
utm_medium=video
utm_campaign=nome_da_campanha
```

Exemplos:

```text
https://aguiarfilgueiras.com.br/?utm_source=youtube&utm_medium=video&utm_campaign=descricao_canal
https://aguiarfilgueiras.com.br/artigos/processo-administrativo-disciplinar/?utm_source=youtube&utm_medium=video&utm_campaign=video_pad&utm_content=descricao
```

### X/Twitter

Padrao:

```text
utm_source=x
utm_medium=social
utm_campaign=nome_da_campanha
```

Exemplos:

```text
https://aguiarfilgueiras.com.br/?utm_source=x&utm_medium=social&utm_campaign=perfil_principal
https://aguiarfilgueiras.com.br/artigos/punicao-disciplinar/?utm_source=x&utm_medium=social&utm_campaign=thread_punicao_disciplinar&utm_content=post_01
```

Para trafego pago no X, nao usar `utm_medium=social`. Usar:

```text
utm_source=x
utm_medium=paid_social
utm_campaign=nome_da_campanha
```

### LinkedIn

Padrao:

```text
utm_source=linkedin
utm_medium=social
utm_campaign=nome_da_campanha
```

Exemplos:

```text
https://aguiarfilgueiras.com.br/?utm_source=linkedin&utm_medium=social&utm_campaign=perfil_dr_carlos
https://aguiarfilgueiras.com.br/direito-militar/?utm_source=linkedin&utm_medium=social&utm_campaign=post_direito_militar&utm_content=feed
https://aguiarfilgueiras.com.br/artigos/processo-administrativo-disciplinar/?utm_source=linkedin&utm_medium=social&utm_campaign=artigo_pad&utm_content=artigo_linkedin
```

Para trafego pago no LinkedIn Ads, nao usar `utm_medium=social`. Usar:

```text
utm_source=linkedin
utm_medium=paid_social
utm_campaign=nome_da_campanha
```

### Google Ads

Quando usar UTMs manuais:

```text
utm_source=google
utm_medium=cpc
utm_campaign=nome_da_campanha
```

Se o Google Ads estiver com auto-tagging ativo, preservar `gclid`. Nao sobrescrever origem paga com `utm_medium=social` ou `utm_medium=organic`.

## Eventos GA4 via GTM

Eventos existentes que nao devem ser duplicados:

- `form_submit_contact`
- `click_whatsapp`
- `click_agendar_whatsapp`
- `service_cta_whatsapp`
- `blog_cta_whatsapp`

Eventos sociais a criar:

| Evento | Quando disparar |
| --- | --- |
| `instagram_click` | Clique em link/botao para Instagram. |
| `facebook_click` | Clique em link/botao para Facebook. |
| `youtube_click` | Clique em link/botao para YouTube. |
| `x_click` | Clique em link/botao para X/Twitter. |
| `linkedin_click` | Clique em link/botao para LinkedIn. |
| `social_profile_click` | Clique em botao generico "seguir", "ver perfil" ou icone social. |
| `embedded_video_click` | Interacao com video incorporado no site. |
| `video_cta_click` | Clique em CTA proximo a video incorporado. |

## Parametros dos eventos

Enviar sempre que possivel:

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

Parametros recomendados adicionais:

- `utm_content`
- `utm_term`
- `placement`: `header`, `footer`, `menu`, `article`, `hero`, `sidebar`, `video`, `bio_link`.
- `lead_intent`: usar em CTAs de WhatsApp/formulario quando fizer sentido.

## DataLayer recomendado

Quando o site tiver controle sobre os cliques, enviar eventos padronizados para o `dataLayer`. O GTM deve consumir esses eventos e criar tags GA4 Event.

### Clique social

```html
<script>
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: 'social_profile_click',
  social_network: 'instagram',
  link_url: 'https://www.instagram.com/perfil',
  button_text: 'Instagram',
  content_type: 'social_link',
  placement: 'footer',
  page_title: document.title,
  page_path: location.pathname,
  page_location: location.href,
  utm_source: new URLSearchParams(location.search).get('utm_source') || '',
  utm_medium: new URLSearchParams(location.search).get('utm_medium') || '',
  utm_campaign: new URLSearchParams(location.search).get('utm_campaign') || ''
});
</script>
```

### Video incorporado

```html
<script>
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: 'embedded_video_click',
  social_network: 'youtube',
  link_url: 'https://www.youtube.com/watch?v=VIDEO_ID',
  button_text: 'play',
  content_type: 'embedded_video',
  article_title: document.querySelector('h1')?.innerText || '',
  page_title: document.title,
  page_path: location.pathname,
  page_location: location.href,
  utm_source: new URLSearchParams(location.search).get('utm_source') || '',
  utm_medium: new URLSearchParams(location.search).get('utm_medium') || '',
  utm_campaign: new URLSearchParams(location.search).get('utm_campaign') || ''
});
</script>
```

## Configuracao no GTM

1. Revisar tags existentes de GA4 para nao criar duplicidade.
2. Criar variaveis de Data Layer:
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
3. Criar triggers de Custom Event para:
   - `instagram_click`
   - `facebook_click`
   - `youtube_click`
   - `x_click`
   - `linkedin_click`
   - `social_profile_click`
   - `embedded_video_click`
   - `video_cta_click`
4. Criar uma tag GA4 Event para cada evento novo ou uma tag reutilizavel com nome vindo de `{{Event}}`, se o container ja usa esse padrao.
5. Associar os parametros aos eventos.
6. Publicar somente depois de validar no Preview e no GA4 DebugView.

## Regras de clique automatico

Se o site nao enviar `dataLayer` para todos os links, criar triggers por URL clicada:

- Instagram: `Click URL contains instagram.com`
- Facebook: `Click URL contains facebook.com` ou `fb.com`
- YouTube: `Click URL contains youtube.com` ou `youtu.be`
- X/Twitter: `Click URL contains x.com` ou `twitter.com`
- LinkedIn: `Click URL contains linkedin.com`
- WhatsApp: manter eventos existentes, sem duplicar.

Quando usar clique automatico, preencher:

- `link_url` com `Click URL`;
- `button_text` com `Click Text`;
- `social_network` conforme dominio;
- `content_type=social_link`.

## Relatorios

No GA4, preparar exploracoes para responder:

- Qual rede social trouxe mais visitas.
- Qual rede social gerou mais WhatsApp.
- Qual rede social gerou mais formularios.
- Quais artigos receberam visitas de Instagram, Facebook, YouTube, X/Twitter ou LinkedIn.
- Quais paginas converteram melhor por canal.
- Diferenca entre Google organico, social organico e trafego pago.

Dimensoes principais:

- Session source / medium.
- Session campaign.
- Landing page + query string.
- Page path.
- Event name.
- `social_network`.
- `content_type`.
- `article_title`.

Metricas principais:

- Sessions.
- Engaged sessions.
- Engagement rate.
- Event count.
- Key events.
- Conversion rate por sessao.
- Cliques em WhatsApp.
- Envios de formulario.

## Conversoes/key events

Recomendacao para marcar como key event:

- `form_submit_contact`
- `click_whatsapp`
- `click_agendar_whatsapp`
- outros eventos de lead real, se existirem.

Nao marcar como key event por padrao:

- `instagram_click`
- `facebook_click`
- `youtube_click`
- `x_click`
- `linkedin_click`
- `social_profile_click`
- `embedded_video_click`
- `video_cta_click`

Esses eventos medem engajamento e navegacao, nao lead direto.

## Validacao

### GTM Preview

1. Abrir o GTM Preview.
2. Navegar pelo site com links de teste usando UTMs.
3. Clicar em botoes de Instagram, Facebook, YouTube, X/Twitter, LinkedIn, videos e CTAs.
4. Confirmar que cada evento aparece uma unica vez.
5. Confirmar parametros:
   - `button_text`
   - `link_url`
   - `social_network`
   - `page_path`
   - `utm_source`
   - `utm_medium`
   - `utm_campaign`
6. Testar WhatsApp e formularios para garantir que os eventos existentes continuam funcionando sem duplicidade.

### GA4 DebugView

1. Abrir Admin > DebugView.
2. Confirmar chegada dos eventos sociais.
3. Confirmar chegada dos eventos de lead.
4. Conferir se os parametros aparecem nos eventos.
5. Validar origem da sessao com links UTM.

## Checklist de publicacao

- [ ] Tags antigas revisadas.
- [ ] Search Console nao alterado.
- [ ] Eventos sociais criados sem duplicidade.
- [ ] Eventos de WhatsApp/formulario preservados.
- [ ] UTMs testadas para Instagram, Facebook, YouTube, X/Twitter e LinkedIn.
- [ ] Google Ads separado de social organico.
- [ ] DebugView validado.
- [ ] Eventos de lead marcados como key events.
- [ ] Documento compartilhado com responsavel por postar links nas redes.
