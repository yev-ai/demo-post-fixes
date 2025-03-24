FROM oven/bun:1.2.5 AS builder

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .

RUN bun run prisma:generate

# ARG + ENV variables you want passed into the build from .env.docker

ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PRIVATE_STANDALONE=true
ENV NEXT_DISABLE_SOURCEMAPS=true


RUN  bun --bun next build

# This saves 20MB by purging the binary for the build container, leaving only our run container one.
RUN rm ./.next/standalone/node_modules/.prisma/client/libquery_engine-debian-openssl-1.1.x.so.node

FROM oven/bun:1.2.5-alpine

WORKDIR /app

ENV HOSTNAME=0.0.0.0 \
    NODE_ENV=production

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE ${PORT}

CMD ["bun", "server.js"]