# Tech Portal

Portal de artículos técnicos construido con Next.js App Router, consumiendo la API pública de Dev.to.

## Stack

- **Next.js 15** — App Router, SSR, force-dynamic
- **TypeScript** — tipado estricto en todo el proyecto
- **Tailwind CSS** — estilos utilitarios
- **Vitest + Testing Library** — 12 tests unitarios

## Arquitectura

| Ruta | Estrategia | Descripción |
|------|-----------|-------------|
| `/` | force-dynamic | Listado de artículos con filtro por tag |
| `/articles/[id]` | force-dynamic | Detalle con generateMetadata y Schema.org |
| `/api/search` | Node.js Route Handler | Proxy a Dev.to con validación y cache headers |

## SEO implementado

- `generateMetadata` dinámico por artículo — title, description y Open Graph únicos
- Schema.org tipo `Article` con JSON-LD en cada página de detalle
- Twitter Cards con `summary_large_image`
- `next/image` con `priority` en el primer artículo para optimizar LCP

## Tests
```bash
pnpm test
```

3 archivos · 12 tests · todos pasando

- `formatDate.test.ts` — 4 tests sobre la utilidad de fechas que alimenta el SEO
- `ArticleCard.test.tsx` — 5 tests del componente principal
- `search.test.ts` — 3 tests del Route Handler con mock de fetch

## Instalación
```bash
pnpm install
pnpm dev
```

## API

El Route Handler `/api/search?q=react` acepta búsquedas y devuelve:
```json
{ "articles": [...], "total": 9, "query": "react" }
```
