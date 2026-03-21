FROM oven/bun:1.2-alpine AS deps
WORKDIR /app

COPY package.json bun.lock* ./
COPY apps/api/package.json ./apps/api/
COPY apps/web/package.json ./apps/web/
COPY packages/shared/package.json ./packages/shared/
RUN bun install --frozen-lockfile

FROM oven/bun:1.2-alpine AS runtime
WORKDIR /app

# Copy root node_modules (includes .bun virtual store — symlink targets live here)
COPY --from=deps /app/node_modules ./node_modules
# Copy workspace package node_modules (symlinks that point into the .bun store above)
COPY --from=deps /app/packages/shared/node_modules ./packages/shared/node_modules

# Copy source files (.dockerignore excludes node_modules, so the COPY above is safe)
COPY packages/shared ./packages/shared
COPY apps/api ./apps/api

ENV NODE_ENV=production
EXPOSE 3000
CMD ["bun", "run", "apps/api/src/index.ts"]
