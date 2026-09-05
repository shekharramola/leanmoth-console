"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { useUserSession } from "@/context/UserSessionContext";
import { DeleteAccountButton } from "@/features/account/DeleteButton";
import { LogoutButton } from "@/features/auth/LogoutButton";

export function GlobalHeader() {
  const pathName = usePathname();

  const { isLoggedIn, truncatedUserId } = useUserSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (pathName.includes("login")) return null;
  if (isLoggedIn === null) return null;

  return (
    <header className="w-full border-b border-surface-variant/20 bg-surface-container-lowest/80 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <Link
        href="/"
        className="text-sm font-mono tracking-wider font-semibold text-white flex items-center gap-2"
      >
        <Image
          src="/brand/logo.webp"
          width={40}
          height={40}
          alt="LeanMoth-logo"
          className="object-contain filter drop-shadow-[0_0_8px_rgba(0,255,157,0.3)]"
        />
        <span>LeanMoth</span>
      </Link>

      <div className="flex items-center gap-6">
        {isLoggedIn === null && (
          <div className="w-2 h-2 rounded-full bg-surface-variant animate-pulse" />
        )}

        {isLoggedIn === false && (
          <Link
            href="/login"
            className="px-4 py-2 rounded bg-surface border border-surface-variant text-xs font-mono text-on-surface hover:border-primary-container transition-colors cursor-pointer"
          >
            Console Ingress
          </Link>
        )}
        {isLoggedIn && (
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-2 font-mono text-[11px] text-on-surface-variant hover:text-white transition-colors cursor-pointer bg-surface border border-surface-variant/40 px-3 py-1.5 rounded"
            >
              <span className="material-symbols-outlined text-sm text-primary-container">
                account_circle
              </span>
              <span>user // {truncatedUserId}</span>
              <span className="material-symbols-outlined text-xs opacity-40">
                keyboard_arrow_down
              </span>
            </button>
            {isMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40 bg-transparent"
                  onClick={() => setIsMenuOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-48 rounded bg-surface border border-surface-variant/40 p-4 shadow-2xl flex flex-col space-y-4 items-start text-left z-50 animate-fadeIn">
                  <Link
                    href="/dashboard/reports"
                    className="text-xs font-mono text-on-surface-variant/70 hover:text-white transition-colors uppercase tracking-widest cursor-pointer decoration-on-surface-variant/20 hover:decoration-white bg-transparent border-none p-0 self-start text-left"
                  >
                    View past reports
                  </Link>
                  <div className="border-b border-surface-variant/20 pb-2 w-full">
                    <LogoutButton />
                  </div>
                  <DeleteAccountButton />
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
