"use client";

import { useLocalization } from "@hooks";
import { useSession } from "next-auth/react";

export function MainApp({
  className,
  email,
}: {
  className?: string;
  email?: string;
}) {
  const { tx } = useLocalization("mainApp");
  const { data: clientSession, status } = useSession();

  const isLoggedIn =
    status === "loading"
      ? email !== undefined
      : status === "authenticated" && !!clientSession?.user?.email;

  const welcomeText = isLoggedIn
    ? `${tx("welcome")} ${email}`
    : tx("pleaseLogin");

  return <div className={className}>{welcomeText}</div>;
}
