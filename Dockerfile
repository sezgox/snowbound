# Astro + @astrojs/node (standalone). PUBLIC_* must be available at build time for client bundles.
FROM node:22-bookworm-slim AS builder
WORKDIR /app

ARG PUBLIC_EMAILJS_PUBLIC_KEY=
ARG PUBLIC_EMAILJS_SERVICE_ID=
ARG PUBLIC_EMAILJS_TEMPLATE_ID=

ENV PUBLIC_EMAILJS_PUBLIC_KEY=$PUBLIC_EMAILJS_PUBLIC_KEY
ENV PUBLIC_EMAILJS_SERVICE_ID=$PUBLIC_EMAILJS_SERVICE_ID
ENV PUBLIC_EMAILJS_TEMPLATE_ID=$PUBLIC_EMAILJS_TEMPLATE_ID

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=4321

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

EXPOSE 4321
CMD ["node", "./dist/server/entry.mjs"]
