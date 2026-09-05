const footerLayout =
  "w-full max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between px-6 py-8 border-t border-surface-variant/20 text-[10px] font-mono text-on-surface-variant/30 tracking-widest uppercase";

export const GlobalFooter = () => {
  return (
    <footer className={footerLayout}>
      <div className="flex items-center gap-x-2 gap-y-1 flex-wrap justify-center sm:justify-start mb-4 sm:mb-0">
        <a
          href="https://ramolatech.com/privacy.html"
          className="text-on-surface-variant/50 hover:text-white transition-colors"
        >
          Privacy
        </a>
        <span className="text-surface-variant/40 select-none">/</span>
        <a
          href="https://ramolatech.com/terms.html"
          className="text-on-surface-variant/50 hover:text-white transition-colors"
        >
          Terms
        </a>
        <span className="text-surface-variant/40 select-none">/</span>
        <a
          href="https://ramolatech.com/refunds.html"
          className="text-on-surface-variant/50 hover:text-white transition-colors"
        >
          Refunds
        </a>
        <span className="text-surface-variant/40 select-none">/</span>
        <a
          href="https://ramolatech.com/contact.html"
          className="text-on-surface-variant/50 hover:text-white transition-colors"
        >
          Contact
        </a>
      </div>

      <p className="m-0 text-center sm:text-right normal-case tracking-normal font-sans text-on-surface-variant/40">
        &copy; 2026 LeanMoth. Built and operated by Shekhar Ramola on behalf of RamolaTech. All
        Rights Reserved.
      </p>
    </footer>
  );
};
