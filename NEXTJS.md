# NextJS TIL!

- Use "priority" to improve performance for "landing" type content:

```
import Image from 'next/image';
<Image
    src="/images/your-logo.png"
    alt="Your Logo"
    width={300}
    height={300}
    priority
    />
```

- SSG is great for things that don't change often. Use "getStaticProps":

```
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/posts');
  const yourProps = await res.json();
  return {
    props: { yourProps },
  };
}
export default function SSGComponent({ yourProps }) {
```

- Use ISR to pre-render pages that change often (cache busting):

```
// Take the above and add, to the return:
  return {
    props: { yourProps },
    revalidate: 30, // Revalidate after 30 seconds
  };
```

- Code splitting! This is a big one, vastly reduces initial page load:

```
import dynamic from 'next/dynamic';
const HeavyPayloadComponent = dynamic(() => import('../components/HeavyPayloadComponent'), {
  loading: () => <p>Loading...</p>, // Here, return a viable placeholder.
  // Hint: you can pre-render a placeholder! This thing is amazing.
});

export default function App() {
  return (
    <div>
      <h1>Home Page</h1>
      <HeavyPayloadComponent />
    </div>
  );
}
```

- Partial page rendering. This is top notch.

```
import { Suspense } from 'react'
import { StaticComponent, DynamicComponent } from 'trulyYours'

export const experimental_ppr = true; // This is CRITICAL

export default function IncrementalPage() {
  return (
      <>
      <StaticComponent />
        <Suspense fallback={}>
          <DynamicComponent />
        </Suspense>
      </>
  )
}
```

- Selective task deference wrapper (a "do this last" type thing):

```
import { unstable_after } from 'next/server'

export default function Layout({children}) {
  after(() => { runThisLast() })
  return <>{children}</>

}
```

- Middleware for NextJS specifically ...is super cool. But also complex. I'll dive into it last!
- Honorary mention: [Vitest](https://vitest.dev/). Same API as [Jest](https://jestjs.io/) but it runs MUCH faster.
