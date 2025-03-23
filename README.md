# NextJS Starter Template

This is for production builds served via a tunnel or proxy.

- JS Bundle Size is 109KB
- Standalone artifact size is 74MB
- Overall Docker image size is 163MB

## Tech Stack

- TypeScript v5.8
- Bun v1.2.5
- ShadCN UI
- TailwindCSS 4
- React 19
- NextJS 15.3 Canary with:
  - Partial page rendering (PPR)
  - React Compiler (RC) for optimized bundle size
  - Optimized CSS output
  - Route handlers for various connection types:
    - `/api/*` - RESTful API endpoints
    - `/api/stream/*` - Server-Sent events
    - `/api/ws/*` - WebSocket connections
    - `/api/healthcheck` - Included by default
- System fronts to minimize client download size

## Project Structure

- `app/` - NextJS app router pages and layouts
- `components/` - Reusable UI components
- `.cicd/` - Build and deployment automation
- `public/` - Static assets

## Development

```bash
# Recommended alias
alias br="bun run"

# Set up dependencies
bun install

# Run development server
br dev

# Add ShadCN UI components
br add:ui [COMPONENT_NAMES]

# Run production server
br build
br start

# Run production in docker
br docker:build
br docker:start
```
