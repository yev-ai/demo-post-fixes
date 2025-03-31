#!/bin/bash
# Note - this is meant to be ran from package.json
rm -rf bun.lock .next node_modules

# Adding the below to package.json and doing "npm install" instead of "bun install" saves us 16MB in Standalone Artifact Size
#   "overrides": {
#     "next-auth": {
#       "next": "^15.3.0-canary.21"
#     }
#   },
bun install
bun run prisma:generate
NEXT_TELEMETRY_DISABLED=1 NEXT_PRIVATE_STANDALONE=true NEXT_DISABLE_SOURCEMAPS=true bun --env-file .env.local --bun next build

cd .next/standalone

# This saves 17MB by purging the binary for the docker container
rm node_modules/.prisma/client/libquery_engine-linux-musl-openssl-3.0.x.so.node

cp -r ../static ./.next
cp -r ../../public ./
echo "Standalone Artifact Size: $(du -sh)"