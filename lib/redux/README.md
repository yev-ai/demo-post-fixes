# Overview

I'm re-learning redux and a few other things after 5+ years of not using them so I'll walk you through my thought process.

- Its NextJS so the Redux store should be per request and not shared across requests.
- We're dealing with SSR/PPR which means the store is rendered on client and server.
  - Initialization should be done with the same data to prevent hydration errors.
- Hybrid client-side routing model means first page load gets SSR from server
  - Subsequent page navigation is handled client-side
  - With a singleton layout store, we need to:
    - Selectively reset data n route navigation
    - Retain non-route-specific data as-is
- Caching. NextJS can cache aggressively, especially if we "use cache" right.
  - We should account for this and take advantage of it when we can.
- Don't forget that components marked async are RSCs (React Server Components)
  - RSCs can't use hooks or context so they shouldn't read from or write to store.
  - If we end up going with an SPA approach we don't have to worry about this.
  - That said, the App router architecture does mean we shouldn't do a global store.
