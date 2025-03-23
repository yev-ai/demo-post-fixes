FROM oven/bun:1.2.5 AS BUILDER

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .

RUN NEXT_TELEMETRY_DISABLED=1 NEXT_PRIVATE_STANDALONE=true NEXT_DISABLE_SOURCEMAPS=true bun --bun next build

FROM oven/bun:1.2.5-alpine

WORKDIR /app

ENV HOSTNAME=0.0.0.0 \
    NODE_ENV=production

COPY --from=BUILDER /app/.next/standalone ./
COPY --from=BUILDER /app/.next/static ./.next/static
COPY --from=BUILDER /app/public ./public

EXPOSE ${PORT}

CMD ["bun", "server.js"]