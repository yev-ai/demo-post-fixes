# Tech Stack

- TypeScript v5.8
- Bun v1.2.5
- ShadCN UI
- TailwindCSS 4
- React 19
- Redux 9
- NextJS 15.3 Canary with:
  - App Router
  - Partial page rendering (PPR)
  - React Compiler (RC) for optimized bundle size
  - Optimized CSS output
  - Route handlers for various connection types:
    - `/api/` - RESTful API endpoints
    - `/api/stream` - Server-Sent Events
    - `/api/ws` - WebSocket connections

# TypeScript Instructions

- Always use import instead of require. Do not use require.
- Access objects safely, properly using "?." and "??". Sparingly use "!" when appropriate.
- Use modern TypeScript 5+ features like "satisfies", "infer", "asserts", "as const", etc.
- Prefer the mapReduce pattern when possible, especially for arrays, sets, and maps.

# Documentation Instructions

- Use JSDoc-style comments, specifying types, parameters, and return values clearly.
- Your audience are seasoned engineers so avoid over-explaining simple concepts.
- Write clear and concise comments explaining the "why", not just the "what".
