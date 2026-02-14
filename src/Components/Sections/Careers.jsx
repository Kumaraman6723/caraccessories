import React from "react";

function Careers() {
  return (
    <section
      id="careers"
      className="bg-[#031D33] px-6 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-xs font-semibold tracking-[0.3em] text-[#F5C242]">
          CAREERS
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          Join the Veltronix Team
        </h2>
        <p className="mt-3 text-sm text-white/80">
          We are always looking for consultants, engineers, and designers who are
          passionate about solving complex technology challenges.
        </p>
        <p className="mt-2 text-sm text-white/70">
          Share your profile and interests with us and we will reach out when there
          is a relevant opportunity.
        </p>
        <a
          href="#contact"
          className="mt-6 inline-flex rounded-full bg-[#F5C242] px-6 py-3 text-sm font-semibold text-[#031D33] shadow-lg shadow-black/40 transition hover:-translate-y-0.5 hover:bg-[#ffd465]"
        >
          Talk to Our Talent Team
        </a>
      </div>
    </section>
  );
}

export default Careers;


