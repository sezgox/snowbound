# Astro + Cloudflare adapter: production deploy is typically `npm run build` + Wrangler/Pages.
# This Dockerfile kept for optional Node-style runs; ensure adapter matches your deployment target.
FROM node:22-bookworm-slim AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=4321

# Resend and n8n URLs are read at runtime (e.g. env_file / compose environment), not at build.
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

EXPOSE 4321
CMD ["node", "./dist/server/entry.mjs"]
