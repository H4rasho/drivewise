FROM oven/bun:1.2-alpine AS deps
WORKDIR /app

COPY package.json bun.lock* ./
COPY apps/api/package.json ./apps/api/
COPY apps/web/package.json ./apps/web/
COPY packages/shared/package.json ./packages/shared/
RUN bun install --frozen-lockfile

FROM oven/bun:1.2-alpine AS runtime
WORKDIR /app

# Bun hoists all workspace deps to root node_modules — no per-package node_modules needed
COPY --from=deps /app/node_modules ./node_modules

COPY packages/shared ./packages/shared
COPY apps/api ./apps/api

ENV NODE_ENV=production
EXPOSE 3000
CMD ["bun", "run", "apps/api/src/index.ts"]
