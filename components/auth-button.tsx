"use client";
import { signIn, signOut, useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { useLocalization } from "@hooks";

export function AuthButton({ className }: { className?: string }) {
  const { tx: loc } = useLocalization("auth");
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";
  const isLoading = status === "loading";

  const buttonText = isLoading
    ? loc("loading", "Loading")
    : isLoggedIn
    ? loc("logout", "Loading")
    : loc("login", "Loading");

  return (
    <div className={className}>
      <Button
        size="lg"
        className={"w-[5.0rem]"}
        onClick={() => (isLoggedIn ? signOut({ redirect: false }) : signIn())}
      >
        {" "}
        {buttonText}
      </Button>
    </div>
  );
}
