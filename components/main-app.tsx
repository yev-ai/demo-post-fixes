"use client";

import { useLocalization } from "@hooks";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function MainApp({
  className,
  email,
}: {
  className?: string;
  email?: string;
}) {
  const { tx } = useLocalization("mainApp");
  const { data: clientSession, status } = useSession();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Render a placeholder that reserves space.
    // Adjust styling to match the final component's size.
    return <div className={className}>Log in to use the app</div>;
  }

  const isLoggedIn =
    status === "loading"
      ? email !== undefined
      : status === "authenticated" && !!clientSession?.user?.email;

  const welcomeText = isLoggedIn
    ? `${tx("welcome")} ${email}`
    : tx("pleaseLogin");

  return <div className={className}>{welcomeText}</div>;
}
