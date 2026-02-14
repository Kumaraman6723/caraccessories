import React from "react";

function WebServices() {
  return (
    <section
      id="what-we-do"
      className="bg-[#031D33] px-6 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-[0.3em] text-[#F5C242]">
            WEB SERVICES
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            High-Performance Digital Experiences
          </h2>
          <p className="mt-3 text-sm text-white/80">
            We design and build modern websites and web platforms that are fast,
            secure, mobile-first, and SEO-friendly—optimized for both human users
            and search engines.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <article className="rounded-2xl border border-white/10 bg-[#071F32] p-5 text-sm text-white/85 shadow-sm shadow-black/30 transition hover:-translate-y-1 hover:border-[#F5C242] hover:shadow-xl">
            <h3 className="text-sm font-semibold sm:text-base">
              Corporate &amp; Marketing Websites
            </h3>
            <p className="mt-3 text-xs sm:text-sm">
              Premium corporate sites, product landing pages, and marketing
              microsites with clean information architecture and conversion-focused
              UX.
            </p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-[#071F32] p-5 text-sm text-white/85 shadow-sm shadow-black/30 transition hover:-translate-y-1 hover:border-[#F5C242] hover:shadow-xl">
            <h3 className="text-sm font-semibold sm:text-base">
              SEO-Optimized &amp; Performance Tuned
            </h3>
            <p className="mt-3 text-xs sm:text-sm">
              Technical SEO, core web vitals optimization, structured data, and
              analytics integration to ensure discoverability and measurable impact.
            </p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-[#071F32] p-5 text-sm text-white/85 shadow-sm shadow-black/30 transition hover:-translate-y-1 hover:border-[#F5C242] hover:shadow-xl">
            <h3 className="text-sm font-semibold sm:text-base">
              Headless &amp; CMS-Based Solutions
            </h3>
            <p className="mt-3 text-xs sm:text-sm">
              Headless architectures and CMS implementations that make content teams
              agile while keeping the front-end experience consistent and fast.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

export default WebServices;


