# Snowbound — follow-ups

## Social links (footer)

- [ ] Replace the Facebook icon `href` in `src/components/SiteFooter.astro` with the real page URL.
- [ ] Replace the Instagram icon `href` with the real profile URL.
- [ ] Confirm the mail icon uses the correct address (currently `mailto:snowbound.web@gmail.com`).

## Figma / assets

- [x] Landing art is in `public/images/figma/`.
- [x] Inuit tribes carousel art is in `public/images/figma/tribes/`.
- [x] Thorsten display font installed in `public/fonts/`.
- [ ] When the design changes: use the Figma MCP to fetch fresh asset URLs and re-download images to `public/images/figma/`.

## Automation (waitlist → spreadsheet / CRM)

- [ ] Choose tooling (e.g. self-hosted **n8n**, **Pipedream**, or EmailJS webhooks if available on your plan).
- [ ] Add a workflow that receives submissions (webhook or EmailJS automation) and appends rows to **Google Sheets** (or Excel via Drive).
- [ ] If using a webhook alongside EmailJS: add `fetch(yourWebhookUrl, { method: 'POST', body: JSON.stringify(...) })` in the form success path (keep PII handling and HTTPS in mind).
- [ ] Document any secrets in `.env` only; never commit keys.

## EmailJS

- [ ] Create `.env` from `.env.example` and set `PUBLIC_EMAILJS_PUBLIC_KEY` (from EmailJS **Account → API keys**).
- [ ] In EmailJS, confirm the **Contact Us** template variables match: `title`, `name`, `email`, `message`, `time` (as used by `WaitlistForm.astro`).

## Deploy

- [ ] Deploy static `dist/` (e.g. Vercel, Netlify, Cloudflare Pages) and add the same `PUBLIC_EMAILJS_*` variables in the host’s environment settings.
