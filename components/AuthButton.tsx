"use client";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

export function AuthButton() {
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";
  const isLoading = status === "loading";

  const buttonText = isLoading
    ? "Loading"
    : isLoggedIn
    ? `Log out of ${session.user?.email}`
    : "Log in or sign up";

  return (
    <Button
      size="lg"
      onClick={() => (isLoggedIn ? signOut({ redirect: false }) : signIn())}
    >
      {" "}
      {buttonText}
    </Button>
  );
}
