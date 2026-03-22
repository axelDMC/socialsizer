# 🔧 Micro-SaaS Template — Fixes de Deploy (Post-Mortem)

Todos los errores encontrados al deployar PairRank y NetToolBox,
y las correcciones que deben aplicarse al template y agentes.

---

## RESUMEN DE ERRORES ENCONTRADOS

| # | Error | Causa | Fix |
|---|-------|-------|-----|
| 1 | `[build]` not supported in Pages | wrangler.toml tenía sección [build] | Eliminar [build] del wrangler |
| 2 | `edge runtime` error en OpenNext | API routes tenían `export const runtime = 'edge'` | Nunca usar edge runtime |
| 3 | Missing entry-point to Worker | wrangler.toml sin `main` ni `[assets]` | Agregar main y assets |
| 4 | Pages vs Workers conflicto | Cloudflare Pages no puede deployar Workers de OpenNext | Usar GitHub Actions |
| 5 | `packages field missing or empty` | pnpm-workspace.yaml vacío/mal configurado | Mover config a package.json |
| 6 | `No pnpm version specified` | Faltaba `packageManager` en package.json | Agregar packageManager |
| 7 | `open-next.config.ts` incompleto | Faltaban campos requeridos por OpenNext 1.17 | Config completa |
| 8 | Next.js 16 incompatible | OpenNext no soporta Next 16 todavía | Pinear Next.js 15.x |
| 9 | ESLint bloquea build | Reglas estrictas de React 19 en Next 15 | ignoreDuringBuilds |
| 10 | `Event handlers cannot be passed` | Componentes con Link sin "use client" | Agregar "use client" |
| 11 | CLOUDFLARE_API_TOKEN no disponible | Env vars en step level, no job level | Mover env a job level |

---

## ARCHIVOS A ACTUALIZAR EN EL TEMPLATE

### 1. wrangler.toml
```toml
name = "[PROJECT_NAME]"
compatibility_date = "2025-09-15"
compatibility_flags = ["nodejs_compat"]
main = ".open-next/worker.js"

[assets]
directory = ".open-next/assets"
binding = "ASSETS"
```

**Reglas:**
- NUNCA agregar sección `[build]`
- NUNCA agregar `pages_build_output_dir`
- SIEMPRE incluir `main` y `[assets]`

### 2. open-next.config.ts
```typescript
import type { OpenNextConfig } from "@opennextjs/cloudflare";

const config: OpenNextConfig = {
  default: {
    override: {
      wrapper: "cloudflare-node",
      converter: "edge",
      proxyExternalRequest: "fetch",
      incrementalCache: "dummy",
      tagCache: "dummy",
      queue: "direct",
    },
  },
  edgeExternals: ["node:crypto"],
  middleware: {
    external: true,
    override: {
      wrapper: "cloudflare-edge",
      converter: "edge",
      proxyExternalRequest: "fetch",
      incrementalCache: "dummy",
      tagCache: "dummy",
      queue: "direct",
    },
  },
};

export default config;
```

### 3. next.config.ts
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
```

### 4. package.json (agregar estos campos)
```json
{
  "name": "[project-name]",
  "version": "0.1.0",
  "packageManager": "pnpm@9.15.0",
  "pnpm": {
    "ignoredBuiltDependencies": ["sharp", "unrs-resolver"]
  }
}
```

**Reglas:**
- SIEMPRE incluir `"packageManager": "pnpm@9.15.0"`
- SIEMPRE incluir `"pnpm": { "ignoredBuiltDependencies": [...] }`
- NO crear `pnpm-workspace.yaml` (no es monorepo)
- Pinear Next.js a versión 15.x: `"next": "15.3.1"` (NO 16.x)

### 5. .github/workflows/deploy.yml (NUEVO)
```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    env:
      CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
      CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: pnpm install
      - run: npx opennextjs-cloudflare build
      - run: npx opennextjs-cloudflare deploy
```

**Reglas:**
- env vars van a nivel de JOB, no de step
- NO incluir `version` en pnpm-action si package.json ya tiene `packageManager`
- NO incluir `--frozen-lockfile` en pnpm install
- NO incluir `cache: pnpm` en setup-node
- Deploy command es `npx opennextjs-cloudflare deploy`, NO `npx wrangler deploy`
- NO usar Cloudflare Pages dashboard — usar GitHub Actions + Workers

### 6. .gitignore (agregar)
```
pnpm-workspace.yaml
```

---

## REGLAS PARA EL CLAUDE.md DEL TEMPLATE

Agregar al final del CLAUDE.md:

```markdown
## Cloudflare Deploy Rules (CRITICAL)
- Deploy method: GitHub Actions → Cloudflare Workers (NOT Cloudflare Pages)
- wrangler.toml: ONLY name, compatibility_date, compatibility_flags, main, [assets]
- NEVER add [build] section to wrangler.toml
- NEVER add pages_build_output_dir to wrangler.toml
- NEVER use `export const runtime = 'edge'` in API routes (Cloudflare already runs at edge)
- NEVER install Next.js 16+ (OpenNext only supports 15.x)
- NEVER create pnpm-workspace.yaml (not a monorepo)
- open-next.config.ts must have ALL required fields including proxyExternalRequest and edgeExternals
- next.config.ts must have eslint.ignoreDuringBuilds = true
- Every file that uses next/link MUST have "use client" at the top
- Every file that uses useState, useEffect, onClick, onChange MUST have "use client"
- package.json MUST have "packageManager": "pnpm@9.15.0"
- Deploy URL pattern: [name].adcmartinez1.workers.dev (NOT .pages.dev)

## GitHub Actions Deploy (every new project)
After first push, set secrets:
```bash
gh secret set CLOUDFLARE_API_TOKEN --body "[token]"
gh secret set CLOUDFLARE_ACCOUNT_ID --body "7e36822d48f79c4751a0a6b351d1b00e"
```
```

---

## AGENTES A ACTUALIZAR

### build.md — Agregar reglas de deploy
Al final de "## Rules", agregar:
```
- Pin Next.js to 15.x (NEVER 16+, OpenNext doesn't support it)
- NEVER use `export const runtime = 'edge'` in any file
- NEVER create pnpm-workspace.yaml
- next.config.ts MUST have eslint: { ignoreDuringBuilds: true }
- Every file using next/link MUST have "use client" directive at top
- package.json MUST include "packageManager": "pnpm@9.15.0"
```

### qa.md — Agregar checks de deploy
Agregar estos checks al checklist de QA:
```
## Deploy Compatibility Checks
- [ ] next.config.ts has eslint.ignoreDuringBuilds = true
- [ ] No file has `export const runtime = 'edge'`
- [ ] No pnpm-workspace.yaml exists
- [ ] package.json has "packageManager" field
- [ ] package.json pins next to 15.x (not 16+)
- [ ] All files using next/link have "use client"
- [ ] All files using useState/useEffect/onClick have "use client"
- [ ] open-next.config.ts has proxyExternalRequest and edgeExternals
- [ ] wrangler.toml has main and [assets] sections
- [ ] wrangler.toml does NOT have [build] section
- [ ] .github/workflows/deploy.yml exists and has env at job level
```

### launch.md — Actualizar deploy instructions
Reemplazar la sección de Cloudflare Pages con:
```
## Deploy (GitHub Actions — automático)
1. Verificar que .github/workflows/deploy.yml existe
2. Set GitHub secrets (solo primera vez por repo):
   gh secret set CLOUDFLARE_API_TOKEN --body "[token]"
   gh secret set CLOUDFLARE_ACCOUNT_ID --body "7e36822d48f79c4751a0a6b351d1b00e"
3. git push → GitHub Actions buildea y deploya automáticamente
4. URL: https://[name].adcmartinez1.workers.dev
```

---

## PROMPT PARA APLICAR TODOS LOS FIXES AL TEMPLATE

Copia y pega esto en Claude Code desde `micro-saas-template/`:

```
Lee este archivo de fixes y aplica TODOS los cambios al template:

1. Reemplaza wrangler.toml con la versión que tiene main y [assets]
2. Reemplaza open-next.config.ts con la versión completa (proxyExternalRequest, edgeExternals, etc.)
3. Actualiza next.config.ts para agregar eslint.ignoreDuringBuilds = true
4. Actualiza package.json: agregar "packageManager": "pnpm@9.15.0" y "pnpm": { "ignoredBuiltDependencies": ["sharp", "unrs-resolver"] }
5. Borra pnpm-workspace.yaml si existe
6. Crea .github/workflows/deploy.yml con el workflow de GitHub Actions (env vars a nivel job)
7. Verifica que Next.js está pineado a 15.x en package.json
8. Agrega las reglas de Cloudflare Deploy al final del CLAUDE.md
9. Verifica que todos los archivos que usan next/link tengan "use client"
10. Elimina cualquier `export const runtime = 'edge'` de cualquier archivo
11. Corre pnpm build para verificar que todo compila

Después haz git add . && git commit -m "fix: apply all deployment fixes" && git push
```
