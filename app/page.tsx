import { AuthButton } from "@ui/AuthButton";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center">
        <div>NextAuth Button</div>
        <div>
          <AuthButton />
        </div>
      </div>
    </main>
  );
}
