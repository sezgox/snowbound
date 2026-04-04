# Self-hosted n8n

> **Despliegue, Docker, variables de entorno y VPS:** [infrastructure.md](./infrastructure.md)

This repo includes an optional [n8n](https://n8n.io/) stack for workflows and webhooks (e.g. waitlist notifications, integrations).

## Compose file

Configuration lives in **`docker-compose.n8n.yml`** at the project root. It:

- Exposes the UI at **http://localhost:5678**
- Persists data in **`./n8n_data`** (gitignored)
- Sets **`N8N_SECURE_COOKIE=false`** so login works over plain HTTP on localhost

## Commands

From the repository root:

```bash
docker compose -f docker-compose.n8n.yml up -d
```

Stop and remove containers (keeps `n8n_data`):

```bash
docker compose -f docker-compose.n8n.yml down
```

View logs:

```bash
docker compose -f docker-compose.n8n.yml logs -f n8n
```

Or use npm scripts: `npm run docker:n8n:up` / `npm run docker:n8n:down`.

## First run

1. Open http://localhost:5678 and complete the owner account setup.
2. For **production** or a public URL, set `N8N_HOST`, `N8N_PROTOCOL=https`, a correct **`WEBHOOK_URL`**, put n8n behind a reverse proxy with TLS, and remove `N8N_SECURE_COOKIE=false` (use secure cookies with HTTPS).

## Image note

The compose file uses **`n8nio/n8n`** from Docker Hub. You can switch to **`docker.n8n.io/n8nio/n8n`** if you prefer n8n’s registry mirror.

## Snowbound app in Docker (n8n already on the host)

Use **`docker-compose.yml`** at the repo root. It builds the Astro site and listens on **http://localhost:4321**.

1. Keep n8n running (e.g. `npm run docker:n8n:up`).
2. Ensure **`.env`** has **`WAITLIST_N8N_SECRET`** (same as in the n8n container) and your **`PUBLIC_EMAILJS_*`** keys.
3. From the repo root:

   ```bash
   npm run docker:web:up
   ```

   The compose file sets **`N8N_APPEND_WEBHOOK_URL`** and **`N8N_EMAIL_STATUS_WEBHOOK_URL`** to **`http://host.docker.internal:5678/webhook/...`** so the **server** inside the `web` container can reach n8n on your machine. Your browser still uses **http://localhost:4321** — no change.

4. Open **http://localhost:4321**, submit the email form, and check the sheet / n8n executions.

Stop the web container: **`npm run docker:web:down`**.

If your webhook paths differ from `snowbound-waitlist-append` / `snowbound-waitlist-email-status`, set **`N8N_DOCKER_APPEND_WEBHOOK_URL`** and **`N8N_DOCKER_EMAIL_STATUS_WEBHOOK_URL`** in `.env`.

## Waitlist → Google Sheets + EmailJS

The site posts newsletter signups through **`POST /api/waitlist`** (same origin, no CORS issues in dev). That route forwards to two n8n webhooks with header **`X-Waitlist-Secret`** (must match **`WAITLIST_N8N_SECRET`** in both Snowbound `.env` and the n8n container — see `docker-compose.n8n.yml`).

### Google Sheet

1. Open your spreadsheet. If the tab is **`Hoja 1`** (Spanish UI), the n8n nodes target that name; if you use **`Sheet1`**, change the sheet name in both Google Sheets nodes in n8n.
2. Set **row 1** to (exact headers):  
   `timestamp` · `nombre` · `email` · `emailSent`
2. **`nombre`** is filled from the part before `@` in the email (title case), not from Google Contacts. True “name from email” only exists if you add OAuth sign-in later.

### n8n workflows (already created in your instance)

| Workflow | Purpose |
|----------|---------|
| **Snowbound Waitlist — Append row** | Inserts `timestamp`, derived `nombre`, `email`, `emailSent` = `pendiente` |
| **Snowbound Waitlist — Email status** | After EmailJS runs in the browser, updates `emailSent` to `sí` or `error EmailJS` (match on `email`) |

1. In each workflow, open **Append to Sheet1** / **Upsert emailSent** and attach your **Google Sheets OAuth2** credential.
2. **Activate** both workflows.
3. Copy the **production** webhook URLs (POST) into `.env`:  
   **`N8N_APPEND_WEBHOOK_URL`** and **`N8N_EMAIL_STATUS_WEBHOOK_URL`** (paths use `snowbound-waitlist-append` and `snowbound-waitlist-email-status`).
4. Restart **`docker compose … up`** after setting **`WAITLIST_N8N_SECRET`** so the n8n container receives it.

**n8n Code node:** the waitlist workflows use **`$env.WAITLIST_N8N_SECRET`** (not `process.env`), because n8n can run Code in an isolated task runner where `process` is undefined. **`N8N_BLOCK_ENV_ACCESS_IN_NODE`** does not apply to `$env` the same way; the variable must still be set on the n8n process/container.

**Webhooks** are set to respond **when the last node finishes**, so your app only gets HTTP 200 after Google Sheets runs (or an error if something fails). Earlier, **“Respond immediately”** could return success before the sheet step and hide failures.

### EmailJS

The form sends **`title`**, **`email`**, **`time`** to **`PUBLIC_EMAILJS_TEMPLATE_ID`** (e.g. notify the team). Subscriber **auto-replies** can be configured in the EmailJS dashboard for that template or service — the app does not send a second template.

### Same server: Docker network

When Astro and n8n run in **one Compose file** on a **shared network**:

- Set **`WEBHOOK_URL`** to the **public** base URL users and browsers would use (e.g. `https://yourdomain.com/` if n8n is behind the same host).
- In Snowbound **server** env, point webhooks at the **internal** URL, e.g. **`http://n8n:5678/webhook/snowbound-waitlist-append`** (service name + container port). The browser never calls this; only the Astro API route does.
- Ensure the reverse proxy routes **`/webhook/*`** (or your chosen path) to n8n if you terminate TLS at the edge.

### Order of operations (reliability)

1. Append row to Sheets (most reliable).
2. Send EmailJS from the browser.
3. Call **`/api/waitlist`** with **`step: "emailStatus"`** so **`emailSent`** reflects success or failure while the row already exists.
