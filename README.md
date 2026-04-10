# Snowbound

Sitio Astro con adaptador **Cloudflare**, formulario de waitlist: correos vía **Resend** (`POST /api/waitlist`), y opcionalmente **Google Sheets** vía **n8n** (variables de webhook en `.env`).

## Desarrollo rápido

```bash
cp .env.example .env
# Rellenar .env (Resend, secretos n8n si aplica, URLs de webhooks)
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

- `src/pages/api/waitlist.ts` — `POST` waitlist: envío a Resend (aviso interno + correo al usuario)
- `src/components/WaitlistForm.astro` — formulario, `fetch` a `/api/waitlist`
- `Dockerfile`, `docker-compose.yml`, `docker-compose.n8n.yml` — contenedores
