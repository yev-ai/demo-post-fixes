# SPA template for user-facing GenAI and ML

Also: I _HIGHLY_ encourage you to install Cline. It's availbe as a [VS Code plugin] and compensates for a lot of Copilot Enterprise's weaknesses. Using them together is awesome - just set up the proper keybinds for it.

I'll be using this to properly rewrite the questionable _(at best)_ [result of a timed coding exercise](https://github.com/yev-ai/sai-transcription-demo)

Disclaimer: this is a prescriptive project built primarily for my own educational purposes.

As of the latest commit(s), I'm playing around with:

- Redux to re-learn best practices and the changes
- Specifically how to use redux with NextJS SSR/PPR
- How to use NextJS to get the most out of SSR

My idea right now is, for /lib/redux/slices/ui-state, to make a factory for it that:

- Defaults to what a first-time load user would see, fully SSR'd.
- Stores any UI state preferences and changes in cookies.
- Uses those cookies server-side to fully SSR the base UI.

I'm a performance fanatic and am learning a lot about NextJS. I've included the less obvious things I think are cool to share in [NEXTJS.md](https://github.com/yev-ai/demo-post-fixes/blob/main/NEXTJS.md)

## Template versions

- [V1 template: the alpine of NextJS SPAs](https://github.com/yev-ai/demo-post-fixes/tree/starter-template)
  - 109kB initial load
  - 74MB standalone artifact
  - 163MB docker image
- [V2 template: V1 + NextAuth and Prisma](https://github.com/yev-ai/demo-post-fixes/tree/starter-template-2)
  - 122kB initial load
  - 91MB standalone artifact
  - 180MB docker image
- [V3 template: V2 + Themes and Localization](https://github.com/yev-ai/demo-post-fixes/tree/starter-template-3)
  - 140kB initial load
  - 85MB standalone artifact (optimized down from v2)
  - 175MB docker image (optimized down from v2)
- [V4 template: V3 + Redux 9.2 for new localization](https://github.com/yev-ai/demo-post-fixes/tree/starter-template-4)
  - 164kB initial load
  - 91MB standalone artifact
  - 180MB docker image
- [V5 template: V4 + persisted Redux UI state](https://github.com/yev-ai/demo-post-fixes/tree/starter-template-5-ready)
  - 168kB initial load
  - 91MB standalone artifact
  - 180MB docker image
- [V6 template: V5 + Redux updates and SSR/PPR](https://github.com/yev-ai/demo-post-fixes/tree/starter-template-6)
  - 161kB initial JS load but this is now [non-blocking because SSR/ISR/PPR](https://i.imgur.com/CsE7zAt.png):
    - <120ms LCP, 0 LCS, 110ms DOMContentLoaded, 112ms Load, 151ms Finish.
  - 91MB standalone artifact
  - 180MB docker image

## V5 Template Overview (Current)

- TypeScript 5.8
- Bun 1.2.5 because:
  - As of January 2025, [it should be your default](https://bun.sh/blog/bun-v1.2)
  - S3 API is 350-700%+ faster than Node + NPM
    - We'll use this heavily in downstream projects
  - Many other things are 150%+ faster than Node
- React 19
- Redux 9.2
  - Set up to persist and SSR UI state (theme, language) preferences.
    - This uses dynamic client/server imports and cookie storage.
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
  - Optimized React compiler
  - Streaming RSC components
  - Partial page rendering
- NextAuth 5.0 Beta with:
  - Configured Prisma adapter
  - Configured email provder
  - Email provider allow mask
  - Login also works as signup
- Prisma 6.5 with:
  - Configured PostgreSQL
  - Optimized binaries
  - NextAuth schema
- **This is not meant to be served by exposing a public IP**
  - This is meant to be used behind a proxy tunnel
  - SSL/TLS termination optimizations nonexistent
  - _Many_ security concerns offloaded to tunnel

## TODOs

- Re-implement OAT realtime RTC
- Backend Python API socket bridge
- Robust server <-> client interop
  - [RTK query](https://redux-toolkit.js.org/rtk-query/overview) store synchronization
  - [Dynamic client UI](https://sdk.vercel.ai/docs/ai-sdk-rsc/streaming-react-components) rendering
  - [Model context protocol](https://docs.anthropic.com/en/docs/agents-and-tools/mcp)

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
