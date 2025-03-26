"use client";

import { SessionProvider } from "next-auth/react";

/**
 * Authentication provider component that wraps the application with session management.
 * This component is memoized to prevent unnecessary re-renders.
 *
 * @component
 * @param {Object} props - The component props
 * @param {React.ReactNode} props.children - The child components to be wrapped with session management
 * @returns {JSX.Element} A SessionProvider component configured with specific refetch settings
 *
 * @example
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 */
export const AuthProvider = function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider
      refetchInterval={60}
      refetchOnWindowFocus={false}
      refetchWhenOffline={false}
    >
      {children}
    </SessionProvider>
  );
};
