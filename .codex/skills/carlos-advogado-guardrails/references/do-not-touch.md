# Do Not Touch

## Hard Boundaries

- Do not start editing silently. First state the intended scope, files/areas likely to be touched, and the reason for the change.
- Do not finish silently. When possible, close with what was executed, what was validated, what stayed pending, and whether deploys are still active.
- Do not mix DriverCash code into this repo.
- Do not use this repo as the source of truth for DriverCash.
- Do not push Carlos changes to a DriverCash repo.
- Do not revert user/other-agent changes without explicit instruction.
- Do not expose tokens, GitHub credentials, Coolify tokens, n8n keys, OpenRouter keys, Mercado Pago credentials, or environment secrets.
- Do not publish any blog article without explicit Carlos approval.
- Do not publish AI metadata: `Modelo`, `modelUsed`, `provider`, `OpenRouter`, `gpt-oss`, prompt text, logs, raw JSON debug, n8n internal implementation details.

## Fragile Areas

- `scripts/prerender-seo.mjs`: central to SEO. Preserve route-specific HTML generation.
- `nixpacks.toml`: must keep route-specific static HTML serving behavior.
- `public/sitemap.xml`: must include service pages and approved blog posts.
- `src/data/servicePages.ts`: source of fixed SEO pages.
- `src/data/blogPosts.json`: only approved/public blog posts belong here.
- `src/pages/BlogPost.tsx` and `src/pages/ServicePage.tsx`: contain SEO/meta/interlinking behavior.
- `public/favicon*`, `src/assets/aguiar-filgueiras-logo.jpeg`, `src/assets/founder.jpg`: brand assets tied to user requests.

## Branch And Deploy Safety

- Production branch is `carlos-stable`.
- If local branch is `carlos-stable-local`, push with `git push origin HEAD:carlos-stable`.
- Before deploy, check `git status --short`.
- If Coolify queues older commits, verify production after the queue clears and force-deploy current `carlos-stable` if needed.
- Docs-only commits may still trigger deploys; wait for active deployment to finish before declaring work done.

## DriverCash Contamination Warning

Historical issue: this repo previously contained or was mixed with DriverCash files/components. If you find files such as `Dashboard.tsx`, `Metrics.tsx`, `Login.tsx`, `AgentChat.tsx`, or `MercadoPagoPaymentModal.tsx` in the Carlos source tree, treat that as suspicious contamination. Do not build new Carlos features on top of DriverCash screens. Stop, inspect history, and separate concerns.

## Legal/Marketing Boundaries

- Do not promise legal outcomes.
- Do not present generated legal text as official legal advice without review.
- Keep CTAs focused on analysis/consultation.
- Keep blog content aligned with the existing Aguiar Filgueiras style.
