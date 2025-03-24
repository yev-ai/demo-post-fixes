#!/bin/bash
# Note - this is meant to be ran from package.json
set -e

ENV_FILE=".env.docker"
if [[ ! -f "$ENV_FILE" ]]; then
  echo "Error: $ENV_FILE not found!"
  exit 1
fi

echo "Building Docker image with build arguments from $ENV_FILE..."

BUILD_ARGS=$(grep -v '^#' "$ENV_FILE" | grep -v '^$' | sed 's/^/--build-arg /' | tr '\n' ' ' | sed 's/ $//')

DOCKER_BUILDKIT=1 docker build \
  -f ./.cicd/Dockerfile \
  -t nextjs-15-demo \
  $BUILD_ARGS \
  .

echo "Docker Image Size: "
docker image ls nextjs-15-demo