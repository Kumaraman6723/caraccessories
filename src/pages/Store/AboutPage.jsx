import React from "react";

function AboutPage() {
  return (
    <section className="px-6 py-10">
      <div className="mx-auto max-w-4xl space-y-4 text-sm text-white/80">
        <header>
          <p className="text-xs font-semibold tracking-[0.3em] text-[#f97316] uppercase">
            About
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            Banty Car Accessories
          </h1>
        </header>
        <p>
          Banty Car Accessories is built for enthusiasts who want their daily drives to feel
          like something special. We curate spoilers, lighting, interior upgrades and care
          products that actually work in Indian conditions – from tight city streets to long
          highway runs.
        </p>
        <p>
          Instead of endless catalogs, we keep a focused lineup of proven parts and kits with
          clear fitment guidance. The goal is simple: make it easier for you to give your car
          the personality it deserves, without guesswork.
        </p>
        <p>
          From first body kit to subtle detailing, the Banty team is constantly testing, tuning
          and refining what we list on the store. If we wouldn&apos;t run it on our own builds,
          we don&apos;t list it.
        </p>
      </div>
    </section>
  );
}

export default AboutPage;


