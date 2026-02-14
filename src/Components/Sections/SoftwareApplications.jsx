import React from "react";

function SoftwareApplications() {
  return (
    <section
      id="software-applications"
      className="bg-[#031D33] px-6 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.3em] text-[#F5C242]">
            SOFTWARE APPLICATIONS
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Secure, Scalable Applications for Critical Workloads
          </h2>
          <p className="mt-3 text-sm text-white/80">
            We build custom web and mobile applications, line-of-business tools,
            and integration layers that connect your ecosystem and support
            day-to-day operations.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <article className="rounded-2xl border border-white/10 bg-[#071F32] p-5 text-sm text-white/85 shadow-sm shadow-black/30 transition hover:-translate-y-1 hover:border-[#F5C242] hover:shadow-xl">
            <h3 className="text-sm font-semibold sm:text-base">
              Custom Line-of-Business Apps
            </h3>
            <p className="mt-3 text-xs sm:text-sm">
              Tailor-made applications that digitize workflows, approvals, and
              business processes with strong role-based access and audit trails.
            </p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-[#071F32] p-5 text-sm text-white/85 shadow-sm shadow-black/30 transition hover:-translate-y-1 hover:border-[#F5C242] hover:shadow-xl">
            <h3 className="text-sm font-semibold sm:text-base">
              Integration &amp; API Platforms
            </h3>
            <p className="mt-3 text-xs sm:text-sm">
              API-led connectivity, microservices, and integration with ERP, CRM,
              and third-party systems to create a unified digital core.
            </p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-[#071F32] p-5 text-sm text-white/85 shadow-sm shadow-black/30 transition hover:-translate-y-1 hover:border-[#F5C242] hover:shadow-xl">
            <h3 className="text-sm font-semibold sm:text-base">
              Cloud-Native &amp; Mobile Solutions
            </h3>
            <p className="mt-3 text-xs sm:text-sm">
              Applications engineered for scalability, resilience, and security
              across web, mobile, and cloud-native environments.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

export default SoftwareApplications;


