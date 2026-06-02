# Project State

## Purpose

Aguiar Filgueiras / Carlos Advogado is a legal services site focused on Direito Militar. Current strategic goal: improve Google positioning with indexable service pages, clean SEO, blog content with approval, and n8n/Evolution automation.

## Repo And Deploy

- GitHub repo: `shopinoveloja-sys/aguiarfilgueiras-site`
- Production branch: `carlos-stable`
- Local branch often used: `carlos-stable-local`
- Production URL: `https://aguiarfilgueiras.com.br`
- Stack: React/Vite, static build, Nixpacks/Caddy, pre-rendered SEO route HTML.
- Build command: `npm run build`
- Build currently runs: `vite build && node scripts/prerender-seo.mjs`
- Caddy/Nixpacks must serve route-specific `index.html` files before falling back to SPA.

## Key Implemented Work

- Added 12 fixed service/problem pages for SEO.
- Added sitemap entries for the service/problem pages.
- Added `scripts/prerender-seo.mjs` to produce indexable HTML for service pages and blog posts.
- Added Caddy `try_files {path} {path}/index.html /index.html` behavior through `nixpacks.toml`.
- Added internal links between service pages and blog posts.
- Ensured pre-rendered blog/service HTML includes canonical, meta description, keywords, JSON-LD, H1, and internal links.
- Added competitor SEO scrape report in `docs/seo-scrape-concorrentes-2026-05-31.md`.
- Added editorial approval queue:
  - `docs/fila-editorial-12-artigos-carlos-2026-05-31.md`
  - `docs/fila-editorial-12-artigos-carlos.json`

## Existing SEO Pages

Service/problem pages currently include:

- `/advogado-direito-militar`
- `/advogado-militar-brasilia`
- `/direito-penal-militar`
- `/defesa-em-ipm`
- `/punicao-disciplinar-militar`
- `/exclusao-das-forcas-armadas`
- `/licenciamento-indevido-militar`
- `/reforma-militar-por-invalidez`
- `/pensao-militar`
- `/abate-teto-pensao-militar`
- `/promocao-militar-preterida`
- `/processo-administrativo-militar`

## Blog And Editorial Rules

- Blog source: `src/data/blogPosts.json`
- Blog helper: `src/data/blogPosts.ts`
- Blog page: `src/pages/BlogPost.tsx`
- Existing posts are intentionally in the current model with fields:
  `id`, `slug`, `date`, `category`, `title`, `excerpt`, `carlosComment`, `content`, optional `seoTitle`, `seoDescription`, `keywords`.
- Every weekly or on-demand article must be approved by Carlos before publication.
- Valid approval commands are conceptually: `APROVAR`, `AJUSTAR: ...`, `RECUSAR`.
- Generated previews may show article content to Carlos, but published site content must never include AI/provider/model/prompt/log metadata.
- The 12 strategic article topics are tracked in `docs/fila-editorial-12-artigos-carlos.json` and all start as `aguardando_aprovacao`.

## n8n And Automation Notes

- There are n8n workflows for on-demand and weekly blog generation.
- Blog/editorial communication with Carlos is through Telegram. Do not describe it as WhatsApp. WhatsApp/Evolution is reserved for a later customer-service assistant flow.
- The intended flow is:
  1. Generate draft from approved editorial queue or user prompt.
  2. Send Telegram preview for Carlos approval.
  3. Only after approval, update `src/data/blogPosts.json`, update `public/sitemap.xml`, then deploy.
- Previous errors included referencing n8n nodes by unstable internal IDs. Prefer `$input` or stable node outputs over direct internal ID references in Code nodes.
- Avoid writing `$http.request` inside Code nodes when native HTTP Request nodes are more robust.
- On-demand blog workflow: `TPfNEftwHTNnV2La`.
  - 2026-06-01: fixed `Seleciona Modelo` Code node syntax error caused by multiline strings inside single quotes. Prefer array `.join('\n')` strings in n8n Code nodes.
- Weekly blog workflow: `d09huQvHqjs99i8S`.
- Email notification workflow: `RA3JTFLzEEX28G0L` / `E-mail Carlos - Aviso Telegram`.
  - Active with Zoho IMAP credential attached.
  - Intended only to notify Carlos in Telegram when `contato@aguiarfilgueiras.com.br` receives email.
  - It must not auto-reply, delete, forward, or mark email as handled without a later explicit decision.
  - IMAP should use Zoho: `imappro.zoho.com`, port `993`, SSL, user `contato@aguiarfilgueiras.com.br`.
  - Test email triggered successful execution `168` on 2026-06-01.
  - Ignores subjects containing `[FORMULARIO SITE]` to avoid duplicate alerts from the site form copy.
- Site contact form workflow: `b06pXMfomFnX59II` / `Site Carlos - Formulario Contato`.
  - Active webhook: `https://n8n.aguiarfilgueiras.com.br/webhook/carlos-site-contact`.
  - Receives the site contact form, notifies Carlos on Telegram, and sends a Zoho email copy.
  - Test webhook triggered successful execution `170` on 2026-06-01.
  - The frontend pushes GTM event `form_submit_contact` after submission.
- 2026-06-01: replaced site logo/favicon assets with the circular Aguiar Filgueiras mark from Carlos's family logo. Source image background was removed and transparent PNG/ICO variants were generated.
- Mercado Pago payment-link subworkflow: `VdUCQ2W7hUea3aJ1` / `Carlos - Mercado Pago Criar Link`.
  - Uses a temporary n8n credential provided by the project owner.
  - Do not paste or document Mercado Pago tokens.
  - Later replace the n8n credential with Carlos's production credential without changing the workflow contract.
  - Intended contract: inputs `valor`, `descricao`, `nome`, `email`, `telefone`, `external_reference`; outputs `preference_id`, `init_point`, `sandbox_init_point`, `external_reference`.
- Secretaria/WhatsApp automation is being adapted from the old `Secretaria v3` templates, but should not import Chatwoot/Asaas assumptions.
  - WhatsApp transport: Evolution API instance `Carlos_Advogado`.
  - Connected Laura/Evolution number: `5511988250996` (`11 98825-0996`).
  - Communication channel for blog/editorial remains Telegram; email alerts may still use Telegram. The customer-service secretary itself must work exclusively through WhatsApp/Evolution.
  - `Carlos Secretaria - Configurar Tabelas` / `Ci9tQeImV1ymye5o`: setup workflow, executed once and inactive.
  - `Carlos Secretaria - Enviar Evolution` / `WzJTlAKhSqjLw0mn`: sends text via Evolution, published/active.
  - `Carlos Secretaria - Escalar WhatsApp` / `4bKFjjnhPk1gaFof`: internal human escalation through WhatsApp/Evolution, published/active.
  - `Carlos Secretaria - Registrar Lead` / `bhn81kSond3XddTr`: Postgres upsert tool for qualified lead/contact data using the `dados` JSONB column, published/active.
  - `Carlos Secretaria - Agenda Pendente` / `JrpW6QwBM2HDXd6F`: temporary agenda placeholder tool until Google Calendar rules are confirmed, published/active.
  - `Carlos Secretaria - Core Agent LangChain` / `V8vhO8WWD0MdOpXT`: LangChain core agent with OpenRouter `openrouter/free`, Postgres memory, Mercado Pago tool, WhatsApp escalation tool, lead registration tool, agenda-pending tool, and whitelist gate; published/active for controlled testing.
  - Evolution webhook is configured for `MESSAGES_UPSERT`, `webhookByEvents=false`, pointing to `https://n8n.aguiarfilgueiras.com.br/webhook/secretaria-carlos-core-agent`.
  - The connected Laura/Evolution number `5511988250996` is operational/sender-side only.
  - The core agent contact whitelist in `Normalizar Entrada` currently allows only `556183806070` and `5527992891634` for controlled testing.
  - A non-whitelisted webhook test completed successfully at execution `179`, stopping at `Normalizar Entrada` without AI/database/WhatsApp calls.
  - First whitelisted end-to-end test completed successfully at execution `184`: Evolution webhook -> normalizer -> Postgres message insert -> memory -> AI agent -> Evolution send.
  - Previous failures fixed: execution `182` lost context after Postgres insert and failed memory key; fixed with `Restaurar Contexto`. Execution `183` failed OpenRouter payment; model was temporarily switched to OpenAI `gpt-4.1-mini`.
  - OpenRouter free model testing: `meta-llama/llama-3.3-70b-instruct:free` hit rate limit at execution `186`; `openrouter/free` succeeded at execution `187`.
  - Prompt tuning added so free/rotating LLMs answer as Laura: short WhatsApp blocks, practical initial guidance, conservative legal wording, and no overpromising.
  - Humanization rule added: assume the person may be anxious, avoid questionnaire-style first replies, answer in stages, and end with one simple question whenever possible.
  - Escalation wording rule: do not say "human evaluation" or "human"; say "setor responsavel" or "Dr. Carlos, caso esteja com agenda livre". Trigger especially for PAD, exclusion, sindicancia, appeal not known, transito em julgado, acao rescisoria, nulidade, lawyer error, assedio, IPM, arrest, hearing, or short deadline.
  - If the contact asks to speak directly with Dr. Carlos, Laura should offer the possibility of scheduling a time, ask one simple time-preference question, and use the agenda-pending tool until Google Calendar is connected. Do not promise immediate availability.
  - Response balance rule: avoid questionnaire-style replies, but also avoid dry one-question-only replies; use brief acknowledgement/practical guidance plus one final question.
  - `Carlos Secretaria - Enviar Evolution` now splits long WhatsApp messages into chunks around 650 characters and sends via explicit JSON body.
  - `Carlos Secretaria - Escalar WhatsApp` sets `secretaria_carlos_status.lock_humano=true`; the core agent checks status before AI and should stop auto-replying to locked contacts.
  - The secretary should be referred to as Laura when it is natural in the conversation.
  - Do not remove the whitelist or open the secretary to public traffic until controlled tests pass.
  - Remaining setup before execution: confirm the internal WhatsApp escalation number, Google Calendar agenda/rules, payment policy/values, and final prompt behavior on sensitive cases.

## Tracking

- GTM is installed through the current site flow.
- GA4 and Meta Pixel are configured through GTM.
- Do not reintroduce direct/persistent manual `docker cp` fixes as the normal path. The repo/build should be the source of truth.

## Content Quality

- Tone: professional, calm, senior legal guidance.
- Avoid guarantees of result.
- Avoid technical AI disclosure in public content.
- Preserve Carlos's authority and the site's existing visual/legal tone.
- Prefer SEO pages and articles that link to each other naturally.
