#!/bin/bash
# Note - this is meant to be ran from package.json
rm -rf .next

NEXT_TELEMETRY_DISABLED=1 NEXT_PRIVATE_STANDALONE=true NEXT_DISABLE_SOURCEMAPS=true bun --bun next build

cd .next/standalone

cp -r ../static ./.next
cp -r ../../public ./
echo "Standalone Artifact Size: $(du -sh)"