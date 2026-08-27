"use client";
import { useState, useRef } from "react";

import { Dialog, DialogHandle } from "@/components/Dialog";

import { deleteAccount } from "./account.api";

const entryPurgeBtn =
  "text-xs font-mono text-error/70 hover:text-error transition-colors uppercase tracking-widest cursor-pointer underline decoration-error/20 hover:decoration-error bg-transparent border-none p-0 self-start text-left";

const executeDangerBtn =
  "px-4 py-2 rounded bg-error text-on-error font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer shadow-[0_0_15px_rgba(255,180,171,0.15)] disabled:opacity-50 disabled:cursor-not-allowed";
const dismissActionBtn =
  "px-4 py-2 rounded bg-surface-variant border border-outline-variant/30 text-white font-mono text-xs font-bold uppercase tracking-wider hover:border-white transition-colors cursor-pointer";

export function DeleteAccountButton() {
  const [status, setStatus] = useState<"idle" | "deleting" | "error">("idle");
  const actionModalRef = useRef<DialogHandle>(null);

  async function handlePurgeExecution() {
    setStatus("deleting");
    try {
      await deleteAccount();
      window.location.href = "/";
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="w-full text-left">
      <button
        type="button"
        onClick={() => actionModalRef.current?.open()}
        className={entryPurgeBtn}
      >
        Wipe Account
      </button>

      <Dialog ref={actionModalRef} ariaLabelledBy="purge-alert-title">
        <Dialog.Header>
          <h3
            id="purge-alert-title"
            className="font-mono text-xs font-semibold text-error uppercase tracking-wider flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[16px] text-error animate-pulse">
              warning
            </span>
            Critical Destruction Request
          </h3>
        </Dialog.Header>

        <Dialog.Body>
          This permanently deletes your account and all report history. This process cannot be
          undone. System records will be instantly wiped from the security enclave.
        </Dialog.Body>

        {status === "error" && (
          <p role="alert" className="font-mono text-xs text-error mt-1 flex items-center gap-2">
            <span className="material-symbols-outlined text-[14px]">error</span>
            Purge failed — system timeout.
          </p>
        )}

        <Dialog.Footer>
          <button
            type="button"
            onClick={() => actionModalRef.current?.close()}
            disabled={status === "deleting"}
            className={dismissActionBtn}
          >
            Abort
          </button>
          <button
            type="button"
            disabled={status === "deleting"}
            onClick={handlePurgeExecution}
            className={executeDangerBtn}
          >
            {status === "deleting" ? "Wiping..." : "Confirm Purge"}
          </button>
        </Dialog.Footer>
      </Dialog>
    </div>
  );
}
