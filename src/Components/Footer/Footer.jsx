import React from "react";

function Footer() {
  return (
    <footer className="bg-black/80 px-6 py-8 text-xs text-white/60 border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-white tracking-[0.18em] text-xs uppercase">
            Banty Car Accessories
          </p>
          <p className="text-[11px] text-white/60">
            Premium car accessories, styling and performance upgrades for enthusiasts.
          </p>
        </div>
        <div className="flex flex-col items-start gap-1 text-[11px] text-white/50 sm:items-end">
          <p>
            © {new Date().getFullYear()} Banty Car Accessories. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;