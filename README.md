# NextJS Starter Template

This template is now ready for UI-based user-facing GenAI and ML SPAs.

This is for production builds served via a tunnel or proxy.

- First load bundle size is 168kB
- Standalone artifact size is 91MB
- Overall Docker image size is 180MB

## Setup

```bash
# Recommended alias
alias br="bun run"

# Install dependencies
bun install

# Generate secure NextAuth secret
bunx auth secret

# Create prisma client
br prisma:generate

# Start supporting services
br services:up

# Apply prisma migrations
br prisma:apply
```

## Development

```bash

# Run dev on host
br dev

# Run production on host
br build
br start

# Run production in docker
br build:docker
br start:docker

# Add ShadCN UI components
br add:ui COMPONENT_NAMES

# Update prisma schema
br prisma:generate
br prisma:apply

```

## Tech Stack

- TypeScript 5.8
- Bun 1.2.5 because:
  - As of January 2025, [it should be your default](https://bun.sh/blog/bun-v1.2)
  - S3 API is 350-700%+ faster than Node + NPM
    - We'll use this heavily in downstream projects
  - Many other things are 150%+ faster than Node
- React 19
- Redux 9.2
  - Set up to persist language and theme preferences
  - These are both done under "uiState" which we will use for:
    - API connection to server for dynamic UI rendering updates
    - Stream/WebSocket connection to server for LLMs via [RTK](https://redux-toolkit.js.org/rtk-query/overview)
- ShadCN UI with:
  - TailwindCSS 4
  - Theme Switcher
  - Localization
    - This was done in Redux for practice but has good performance
- NextJS 15.3 Canary with:
  - Route configuration (next.config.ts) for:
    - `/api/*` - RESTful API endpoints
    - `/api/stream/*` - Server-Sent events
    - `/api/ws/*` - WebSocket connections
    - `/api/healthcheck` - Included by default
  - React Compiler optimized for bundle size
  - Partial page rendering
  - Optimized CSS output
- NextAuth 5.0 Beta with:
  - Configured Prisma adapter
  - Configured email provder
  - Email provider allow mask
  - Login also works as signup
- Prisma 6.5 with:
  - Configured PostgreSQL
  - Optimized binaries
  - NextAuth schema
