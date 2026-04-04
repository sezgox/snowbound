# Snowbound — follow-ups

## Social links (footer)

- [ ] Replace the Facebook icon `href` in `src/components/SiteFooter.astro` with the real page URL.
- [ ] Replace the Instagram icon `href` with the real profile URL.
- [ ] Confirm the mail icon uses the correct address (currently `mailto:snowbound.web@gmail.com`).

## Figma / assets

- [x] Landing art is in `public/images/figma/` (`npm run figma:assets`).
- [x] Inuit tribes carousel art is in `public/images/figma/tribes/` (`npm run figma:tribes`; source component set [527:253](https://www.figma.com/design/L4ZUibazk0jRqKlNCE4Jg8/SNOWBOUND?node-id=527-253)).
- [ ] When the design changes: refresh MCP URLs in `scripts/download-figma-assets.mjs` and/or `scripts/download-tribes-assets.mjs`, then rerun the matching npm script.
- [ ] Optional: add the **Thorsten** display font if you want a closer match to the Figma headline (currently using Barlow Condensed as a substitute).

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
