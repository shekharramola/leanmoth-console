"use client";
import React, { useRef, useImperativeHandle } from "react";

export interface DialogHandle {
  open: () => void;
  close: () => void;
}

interface DialogProps {
  children: React.ReactNode;
  ariaLabelledBy: string;
  ref: React.RefObject<DialogHandle | null>;
}

// The core wrapper manages absolute browser focus bounds and structural grid math ONLY
export function Dialog({ children, ariaLabelledBy, ref }: DialogProps) {
  const localRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => ({
    open: () => localRef.current?.showModal(),
    close: () => localRef.current?.close(),
  }));

  const modalContainer =
    "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 margin-0 p-6 rounded bg-surface border border-outline-variant/40 max-w-sm w-full backdrop:bg-void-base/80 backdrop:backdrop-blur-md open:flex open:flex-col open:space-y-5 shadow-2xl shadow-black animate-fadeIn";

  return (
    <dialog
      ref={localRef}
      className={modalContainer}
      aria-labelledby={ariaLabelledBy}
      role="alertdialog"
    >
      {children}
    </dialog>
  );
}

Dialog.Header = function DialogHeader({ children }: { children: React.ReactNode }) {
  return <div className="space-y-1.5 pb-1">{children}</div>;
};

Dialog.Body = function DialogBody({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-main text-sm text-on-surface-variant/80 leading-relaxed">{children}</div>
  );
};

Dialog.Footer = function DialogFooter({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center justify-end gap-3 pt-2">{children}</div>;
};
