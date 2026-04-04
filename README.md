# Snowbound

Sitio Astro (Node adapter) con formulario de waitlist: **Google Sheets** vía **n8n**, **EmailJS** en el cliente, API **`/api/waitlist`** en el servidor.

## Desarrollo rápido

```bash
cp .env.example .env
# Rellenar .env (EmailJS, secretos n8n, URLs de webhooks)
npm install
npm run dev
```

Abre [http://localhost:4321](http://localhost:4321).

## Despliegue e infraestructura

**Guía principal:** [docs/infrastructure.md](docs/infrastructure.md) — arquitectura, variables de entorno (build vs runtime), Docker, checklist VPS y migración de datos.

**n8n y waitlist (hoja, workflows, webhooks):** [docs/n8n.md](docs/n8n.md).

## Scripts npm

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run preview` | Vista previa del build |
| `npm run docker:n8n:up` / `docker:n8n:down` | n8n en Docker (datos en `./n8n_data`) |
| `npm run docker:web:up` / `docker:web:down` | App web en Docker (puerto 4321) |
| `npm run docker:web:build` | Solo rebuild de la imagen `web` |

## Estructura relevante

- `src/pages/api/waitlist.ts` — proxy firmado hacia n8n
- `src/components/WaitlistForm.astro` — formulario, EmailJS, llamadas a la API
- `Dockerfile`, `docker-compose.yml`, `docker-compose.n8n.yml` — contenedores
