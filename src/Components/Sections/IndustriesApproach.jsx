import React from "react";

function IndustriesApproach() {
  return (
    <section
      id="industries"
      className="bg-[#031D33] px-6 py-16 sm:py-20"
    >
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold tracking-[0.3em] text-[#F5C242]">
            INDUSTRIES
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Built for Enterprise, Scaled for Growth
          </h2>
          <p className="mt-3 text-sm text-white/80">
            Veltronix Technologies works with digital-native businesses,
            enterprises, and fast-growing organizations across multiple sectors.
          </p>
          <div className="mt-5 grid gap-3 text-xs text-white/85 sm:grid-cols-2 sm:text-sm">
            <ul className="space-y-2">
              <li>• Banking &amp; Financial Services</li>
              <li>• Retail &amp; E-commerce</li>
              <li>• Manufacturing &amp; Supply Chain</li>
              <li>• Healthcare &amp; Life Sciences</li>
            </ul>
            <ul className="space-y-2">
              <li>• Technology &amp; SaaS</li>
              <li>• Education &amp; E-learning</li>
              <li>• Public Sector &amp; Smart Cities</li>
              <li>• Startups &amp; Innovation Labs</li>
            </ul>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.3em] text-[#F5C242]">
            OUR APPROACH
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            From Vision to Value, Iteratively
          </h2>
          <ol className="mt-4 space-y-3 text-sm text-white/85">
            <li>
              <span className="font-semibold text-[#F5C242]">1. Discover</span>{" "}
              – Understand business objectives, current landscape, and desired
              outcomes.
            </li>
            <li>
              <span className="font-semibold text-[#F5C242]">2. Design</span>{" "}
              – Define solution architecture, experience design, and success
              metrics.
            </li>
            <li>
              <span className="font-semibold text-[#F5C242]">3. Build</span>{" "}
              – Implement secure, scalable solutions with modern engineering
              practices.
            </li>
            <li>
              <span className="font-semibold text-[#F5C242]">4. Evolve</span>{" "}
              – Continuously optimize, support, and scale platforms as your
              business grows.
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}

export default IndustriesApproach;


