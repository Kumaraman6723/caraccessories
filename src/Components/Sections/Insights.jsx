import React from "react";

function Insights() {
  return (
    <section
      id="insights"
      className="bg-[#031D33] px-6 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold tracking-[0.3em] text-[#F5C242]">
            TESTIMONIALS
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            What Clients Appreciate About Veltronix
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <article className="rounded-2xl border border-white/10 bg-[#031D33] p-5 text-xs text-white/80 sm:text-sm shadow-sm shadow-black/30 transition hover:-translate-y-1 hover:border-[#F5C242] hover:shadow-xl">
            <p>
              “Veltronix quickly understood our landscape and delivered a roadmap
              that balanced modernization with business continuity.”
            </p>
            <p className="mt-3 font-semibold text-[#F5C242]">
              CIO, Financial Services
            </p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-[#031D33] p-5 text-xs text-white/80 sm:text-sm shadow-sm shadow-black/30 transition hover:-translate-y-1 hover:border-[#F5C242] hover:shadow-xl">
            <p>
              “Their engineering team combines strong technical depth with a
              practical, outcome-driven mindset.”
            </p>
            <p className="mt-3 font-semibold text-[#F5C242]">
              VP Technology, Retail
            </p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-[#031D33] p-5 text-xs text-white/80 sm:text-sm shadow-sm shadow-black/30 transition hover:-translate-y-1 hover:border-[#F5C242] hover:shadow-xl">
            <p>
              “We value the transparency, governance, and the way they embed
              quality into every release.”
            </p>
            <p className="mt-3 font-semibold text-[#F5C242]">
              Head of Digital, Manufacturing
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

export default Insights;


