#!/bin/bash
# Note - this is meant to be ran from package.json
DOCKER_BUILDKIT=1 docker build -f ./.cicd/Dockerfile -t nextjs-15-demo .

echo "Docker Image Layers:"
docker history nextjs-15-demo
echo "Docker Image Size: "
docker image ls nextjs-15-demo