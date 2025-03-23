import { Button } from "@shad/button";
import { ArrowUp } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen">
      <div className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <ol className="list-inside list-decimal">
          <li>
            Get started by editing <code>app/page.tsx</code>
          </li>
          <li>Save and see your changes instantly</li>
        </ol>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Button variant="destructive" asChild size="lg">
            <Link
              href="https://vercel.com/new"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ArrowUp />
              Deploy Now
            </Link>
          </Button>
          <Button asChild size="lg">
            <Link
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read Our Docs
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
