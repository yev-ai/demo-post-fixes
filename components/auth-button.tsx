"use client";

import { signIn, signOut, useSession } from "next-auth/react";

import { useLocalization } from "@hooks";
import { Button } from "@ui-base/button";

export function AuthButton({
  className,
  email,
}: {
  className?: string;
  email?: string;
}) {
  const { tx } = useLocalization("authButton");
  const { data: clientSession, status } = useSession();

  const isLoggedIn =
    status === "loading"
      ? email !== undefined
      : status === "authenticated" && !!clientSession?.user?.email;

  const buttonText = isLoggedIn ? tx("logout") : tx("login");

  return (
    <div className={className}>
      <Button
        size="lg"
        className="w-[5.0rem]"
        onClick={() => (isLoggedIn ? signOut({ redirect: false }) : signIn())}
      >
        {buttonText}
      </Button>
    </div>
  );
}
