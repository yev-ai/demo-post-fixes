"use client";

import { signIn, signOut, useSession } from "next-auth/react";

import { useLocalization } from "@hooks";
import { Button } from "@ui-base/button";

export function AuthButton({ className }: { className?: string }) {
  const { tx } = useLocalization("auth");
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";
  const isLoading = status === "loading";

  const buttonText = isLoading
    ? tx("loading")
    : isLoggedIn
    ? tx("logout")
    : tx("login");

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
