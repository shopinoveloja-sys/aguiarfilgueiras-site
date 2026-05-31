---
name: carlos-advogado-guardrails
description: Project guardrails and operational memory for the Carlos Advogado / Aguiar Filgueiras site. Use before changing, deploying, reviewing, or automating this repository; when handling SEO/blog/n8n/Coolify work; when another IDE or agent needs to know what was already done; and when deciding what must not be touched, mixed, reverted, or published.
---

# Carlos Advogado Guardrails

## Overview

Use this skill as the first stop before touching the Aguiar Filgueiras project. It protects the Carlos Advogado site from regressions, DriverCash contamination, accidental redeploys, and blog publications without Carlos's approval.

## Required Workflow

1. Confirm the repository is `shopinoveloja-sys/aguiarfilgueiras-site` and the intended production branch is `carlos-stable`.
2. Read `references/project-state.md` before code changes or deploys.
3. Read `references/do-not-touch.md` before moving files, reverting commits, changing remotes, or editing workflows.
4. Read `references/validation.md` before marking work complete.
5. Before changing files, state briefly what you are about to touch and why.
6. Keep changes scoped to Carlos Advogado. If you find DriverCash files, do not use this repo as the DriverCash source of truth.
7. Never publish blog content automatically unless the approval rule in `references/project-state.md` is satisfied.
8. Do not print stored tokens, API keys, or secrets in chat, commits, docs, screenshots, or logs.

## Current Boundaries

- Production site: `https://aguiarfilgueiras.com.br`
- Repo: `https://github.com/shopinoveloja-sys/aguiarfilgueiras-site`
- Production branch: `carlos-stable`
- Local working branch may be `carlos-stable-local`; push with `git push origin HEAD:carlos-stable` when appropriate.
- Main app UUID in Coolify: keep in project docs, do not expose credentials in generated artifacts.
- The site is React/Vite with pre-rendered SEO HTML and a Caddy/Nixpacks deploy path.

## Reference Files

- `references/project-state.md`: what was changed, current architecture, SEO/blog/n8n state, editorial queue, deployment notes.
- `references/do-not-touch.md`: prohibited actions and fragile areas.
- `references/validation.md`: build, production, SEO, and content-leak checks.

## Completion Rule

Before saying a task is complete, run the relevant checks in `references/validation.md`, update any checklist/status docs touched by the task, and summarize what changed without exposing secrets.

If time or token budget remains at the end of the operation, explicitly confirm:

- what was executed;
- what was validated;
- what was not executed or remains pending;
- whether any deploy is still active or queued.
