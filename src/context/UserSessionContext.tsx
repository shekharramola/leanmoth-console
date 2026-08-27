"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import { checkSession } from "@/features/auth/auth.api";

interface SessionContextType {
  isLoggedIn: boolean | null;
  truncatedUserId: string | null;
}

const UserSessionContext = createContext<SessionContextType | undefined>(undefined);

export function UserSessionProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [truncatedUserId, setTruncatedUserId] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function runTokenVerification() {
      try {
        const session = await checkSession(controller.signal);
        if (session) {
          setIsLoggedIn(true);
          const truncatedId = session.userId.toString().slice(0, 6);
          setTruncatedUserId(`id_${truncatedId}`);
        } else {
          setIsLoggedIn(false);
          setTruncatedUserId(null);
        }
      } catch (error: unknown) {
        if (error instanceof Error && error.name === "AbortError") return;

        setIsLoggedIn(false);
        setTruncatedUserId(null);
      }
    }
    void runTokenVerification();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <UserSessionContext.Provider value={{ isLoggedIn, truncatedUserId }}>
      {children}
    </UserSessionContext.Provider>
  );
}

export function useUserSession() {
  const context = useContext(UserSessionContext);
  if (context === undefined) {
    throw new Error("useUserSession must be wrapped within a valid UserSessionProvider boundary");
  }
  return context;
}
