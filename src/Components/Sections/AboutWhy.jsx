import React from "react";

function AboutWhy() {
  return (
    <section
      id="about"
      className="bg-[#031D33] px-6 py-16 sm:py-20"
    >
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.2fr,1fr]">
        <div>
          <p className="text-xs font-semibold tracking-[0.3em] text-[#F5C242]">
            ABOUT VELTRONIX
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            A Partner for Intelligent, Future-Ready Enterprises
          </h2>
          <p className="mt-3 text-sm text-white/80">
            Veltronix Technologies combines deep domain expertise with modern
            engineering and AI capabilities. Our teams bring together consultants,
            architects, data scientists, designers, and engineers who collaborate
            to deliver solutions that are robust, secure, and experience-led.
          </p>
          <p className="mt-3 text-sm text-white/80">
            We think beyond implementation—focusing on adoption, reliability, and
            long-term value so that your technology investments continue to deliver
            measurable business impact.
          </p>
        </div>
        <div
          id="why-veltronix"
          className="space-y-3 rounded-2xl border border-white/10 bg-[#071F32] p-5 text-sm text-white/85"
        >
          <p className="text-xs font-semibold tracking-[0.25em] text-[#F5C242]">
            WHY CLIENTS CHOOSE US
          </p>
          <ul className="space-y-2">
            <li>• Enterprise-grade delivery governance and SLAs</li>
            <li>• Transparent communication and outcome-focused engagement</li>
            <li>• Strong focus on security, compliance, and quality</li>
            <li>• Design thinking and user-centric digital experiences</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default AboutWhy;


