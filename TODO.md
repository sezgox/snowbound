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

## Resend (waitlist)

- [ ] Create `.env` from `.env.example` and set **`RESEND_API_KEY`**, **`RESEND_FROM`**, **`RESEND_NOTIFY_TO`** (dominio verificado en Resend).
- [ ] In Cloudflare Pages/Workers, add the same server-side variables (no `PUBLIC_` prefix for the API key).

## Deploy (Cloudflare Pages)

- [ ] Connect the GitHub repo (`sezgox/snowbound`) to a Cloudflare Pages project.
- [ ] Build command: `npm run build` · Output directory: `dist`
- [ ] Add **`RESEND_API_KEY`**, **`RESEND_FROM`**, **`RESEND_NOTIFY_TO`** (and optional **`RESEND_REPLY_TO`**) in the environment/secrets settings.
- [ ] Trigger a deploy — done.
