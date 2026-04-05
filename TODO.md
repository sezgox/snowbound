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

## EmailJS (waitlist form)

- [ ] Create `.env` from `.env.example` and set the three `PUBLIC_EMAILJS_*` vars (public key, service ID, template ID).
- [ ] In the EmailJS template, confirm these variables are used: `title`, `email`, `time`.

## Deploy (Cloudflare Pages)

- [ ] Connect the GitHub repo (`sezgox/snowbound`) to a Cloudflare Pages project.
- [ ] Build command: `npm run build` · Output directory: `dist`
- [ ] Add the three `PUBLIC_EMAILJS_*` environment variables in the Pages dashboard (Settings → Environment variables).
- [ ] Trigger a deploy — done.
