# Validation

## Local Checks

Run from the repository root:

```powershell
npm run build
```

Expected build behavior:

- Vite build succeeds.
- `scripts/prerender-seo.mjs` prints a route count.
- Route HTML files exist under `dist/<route>/index.html`.

Useful local checks:

```powershell
Select-String -Path "dist\advogado-direito-militar\index.html" -Pattern "<h1>","rel=`"canonical`"","application/ld+json"
Select-String -Path "dist\pensao-militar\index.html" -Pattern "/blog/pensao-militar-direitos-dependentes"
Select-String -Path "dist\blog\pensao-militar-direitos-dependentes\index.html" -Pattern "/abate-teto-pensao-militar"
```

## Production SEO Checks

Use HTML source checks, not only browser-rendered checks:

```powershell
$r=Invoke-WebRequest -Uri 'https://aguiarfilgueiras.com.br/pensao-militar' -UseBasicParsing -TimeoutSec 20
$b=Invoke-WebRequest -Uri 'https://aguiarfilgueiras.com.br/blog/pensao-militar-direitos-dependentes' -UseBasicParsing -TimeoutSec 20
[pscustomobject]@{
  serviceStatus=[int]$r.StatusCode
  serviceStaticH1=($r.Content -match '<h1>')
  serviceStaticRelatedBlog=($r.Content -match '/blog/pensao-militar-direitos-dependentes')
  blogStatus=[int]$b.StatusCode
  blogStaticRelatedService=($b.Content -match '/abate-teto-pensao-militar')
  noTechnicalLeak=(($r.Content + $b.Content) -notmatch 'modelUsed|Modelo:|gpt-oss|OpenRouter|provider|prompt')
} | Format-List
```

Expected:

- Status codes are `200`.
- Static H1/canonical/JSON-LD exist for SEO pages.
- Internal links exist in raw HTML.
- `noTechnicalLeak=True`.

## Sitemap Checks

Check that fixed pages and approved articles are present:

```powershell
$s=Invoke-WebRequest -Uri 'https://aguiarfilgueiras.com.br/sitemap.xml' -UseBasicParsing -TimeoutSec 20
$s.Content -match '/advogado-direito-militar'
$s.Content -match '/pensao-militar'
```

## Coolify Checks

- Confirm active deployments clear before final report.
- Confirm the commit being deployed is the intended commit.
- If the API returns queued or in-progress deployments, do not claim deployment completion.
- If old commits deploy after the latest one, trigger a new deploy for the current branch and validate production again.

## Content Leak Checks

Search repo and built output before publishing generated content:

```powershell
rg -n "modelUsed|Modelo:|gpt-oss|OpenRouter|provider|prompt|This message was sent automatically" src public docs scripts
```

Context-specific exceptions are allowed in internal docs that describe forbidden terms, but never in public article content or generated HTML.

## Git Checks

```powershell
git status --short
git log --oneline -5
```

Commit only scoped changes. Do not include unrelated generated artifacts unless they are part of the task.
