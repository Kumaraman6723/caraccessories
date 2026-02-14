import React from "react";

function SuccessStories() {
  return (
    <section
      id="success-stories"
      className="bg-[#031D33] px-6 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold tracking-[0.3em] text-[#F5C242]">
            PORTFOLIO
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Selected Engagement Themes
          </h2>
          <p className="mt-3 text-sm text-white/80">
            Representative work spanning digital transformation, platform
            modernization, and AI-led initiatives.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <article className="rounded-2xl border border-white/10 bg-[#031D33] p-5 text-sm text-white/85 shadow-sm shadow-black/30 transition hover:-translate-y-1 hover:border-[#F5C242] hover:shadow-xl">
            <h3 className="text-sm font-semibold sm:text-base">
              Global Retail Modernization
            </h3>
            <p className="mt-3 text-xs sm:text-sm">
              Migrated legacy commerce stack to a headless, cloud-native architecture
              with improved performance and reduced operational costs.
            </p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-[#031D33] p-5 text-sm text-white/85 shadow-sm shadow-black/30 transition hover:-translate-y-1 hover:border-[#F5C242] hover:shadow-xl">
            <h3 className="text-sm font-semibold sm:text-base">
              Intelligent Service Operations
            </h3>
            <p className="mt-3 text-xs sm:text-sm">
              Implemented AI-driven ticket triage and workflow automation for a
              technology services provider, improving resolution times.
            </p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-[#031D33] p-5 text-sm text-white/85 shadow-sm shadow-black/30 transition hover:-translate-y-1 hover:border-[#F5C242] hover:shadow-xl">
            <h3 className="text-sm font-semibold sm:text-base">
              Data &amp; Analytics Platform
            </h3>
            <p className="mt-3 text-xs sm:text-sm">
              Built a centralized analytics layer, dashboards, and predictive models
              to support leadership decision-making in manufacturing.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

export default SuccessStories;


