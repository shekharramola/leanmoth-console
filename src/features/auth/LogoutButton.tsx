"use client";
import { logout } from "./auth.api";

const logoutBtnStyle =
  "text-xs font-mono text-on-surface-variant/70 hover:text-white transition-colors uppercase tracking-widest cursor-pointer underline decoration-on-surface-variant/20 hover:decoration-white bg-transparent border-none p-0 self-start text-left";

export function LogoutButton() {
  async function handleClick() {
    await logout();
    window.location.href = "/login";
  }

  return (
    <button onClick={handleClick} className={logoutBtnStyle}>
      Log out
    </button>
  );
}
