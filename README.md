# Tech Portal

Portal de artículos técnicos construido con Next.js App Router, consumiendo la API pública de Dev.to.

🌐 **Demo en producción:** https://chimerical-kringle-4b4458.netlify.app

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
- CLS de 0 gracias a dimensiones explícitas en todas las imágenes

## Lighthouse — resultados en producción (Mobile · Slow 4G)

| Métrica | Valor |
|---------|-------|
| Performance | 84 / 100 |
| SEO | 100 / 100 |
| LCP | 3.2s |
| CLS | 0 |
| FCP | 1.7s |

> Auditado con Lighthouse 13.0.1 sobre Netlify, emulando Moto G Power con Slow 4G throttling.

## Tests
```bash
pnpm test
```

3 archivos · 12 tests · todos pasando

| Archivo | Tests | Qué cubre |
|---------|-------|-----------|
| `formatDate.test.ts` | 4 | Utilidad de fechas que alimenta el SEO |
| `ArticleCard.test.tsx` | 5 | Componente principal de la UI |
| `search.test.ts` | 3 | Route Handler con mock de fetch |

## Instalación local
```bash
pnpm install
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000)

## API

El Route Handler acepta búsquedas y devuelve JSON estructurado:
```
GET /api/search?q=react
```
```json
{ "articles": [...], "total": 9, "query": "react" }
```

## Estructura del proyecto
```
src/
├── app/
│   ├── page.tsx                  # Listado principal
│   ├── articles/[id]/page.tsx    # Detalle con SEO dinámico
│   └── api/search/route.ts       # Route Handler Node.js
├── components/
│   └── ArticleCard.tsx           # Tarjeta de artículo
├── lib/
│   ├── devto.ts                  # Cliente de la API
│   └── formatDate.ts             # Utilidad de fechas
├── types/
│   └── article.ts                # Tipos TypeScript
└── __tests__/                    # Tests Vitest
```