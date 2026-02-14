import React from "react";

const services = [
  {
    title: "IT Consulting & Strategy",
    body: "Technology roadmaps, architecture blueprints, and modernization programs aligned to your business outcomes.",
  },
  {
    title: "Digital Transformation",
    body: "Reimagining processes, experiences, and platforms to build connected, data-driven organizations.",
  },
  {
    title: "AI & Automation Solutions",
    body: "ML models, intelligent workflows, recommendation engines, and cognitive automation tailored to your use cases.",
  },
  {
    title: "Cloud Engineering",
    body: "Cloud migration, cloud-native development, DevOps, and scalable infrastructure on leading cloud providers.",
  },
  {
    title: "ERP & Business Applications",
    body: "ERP implementations, integrations, and custom business applications that streamline operations.",
  },
  {
    title: "Modern Software Development",
    body: "Secure, scalable web and mobile solutions with best-in-class UX and performance.",
  },
];

function DigitalAI() {
  return (
    <section
      id="digital-ai"
      className="bg-[#031D33] px-6 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.3em] text-[#F5C242]">
            SERVICES
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            End-to-End Technology Services for Modern Enterprises
          </h2>
          <p className="mt-3 text-sm text-white/80">
            From advisory to implementation and continuous evolution, we help you
            design, build, and operate digital platforms that stay ahead of change.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((item) => (
            <article
              key={item.title}
              className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#071F32] p-5 shadow-sm shadow-black/30 transition hover:-translate-y-1 hover:border-[#F5C242] hover:shadow-xl"
            >
              <div>
                <h3 className="text-sm font-semibold text-white sm:text-base">
                  {item.title}
                </h3>
                <p className="mt-3 text-xs text-white/80 sm:text-sm">{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DigitalAI;


