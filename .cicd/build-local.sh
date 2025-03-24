#!/bin/bash
# Note - this is meant to be ran from package.json
rm -rf .next

NEXT_TELEMETRY_DISABLED=1 NEXT_PRIVATE_STANDALONE=true NEXT_DISABLE_SOURCEMAPS=true bun --env-file .env.local --bun next build

cd .next/standalone

# This saves 17MB by purging the binary for the docker container, leaving only our native one.
rm node_modules/.prisma/client/libquery_engine-linux-musl-openssl-3.0.x.so.node

cp -r ../static ./.next
cp -r ../../public ./
echo "Standalone Artifact Size: $(du -sh)"