import React from "react";

const ADMIN_GMAIL = import.meta.env.VITE_ADMIN_GMAIL || "kumarprasadaman1234@gmail.com";

function AdminOrdersPage() {

  return (
    <section className="px-6 py-10">
      <div className="mx-auto max-w-2xl space-y-5 text-sm text-white/80">
        <header className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.3em] text-[#f97316] uppercase">Admin • Enquiries</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">Product enquiries</h1>
          </div>
        </header>

        <div className="rounded-2xl border border-white/10 bg-black/70 p-6 text-sm">
          <p className="text-white/90">
            Product enquiries from customers are sent directly to your admin Gmail and an auto-reply is sent to the
            customer. There is no in-app list of enquiries.
          </p>
          <p className="mt-4 text-white/80">
            Check your inbox: <strong className="text-white">{ADMIN_GMAIL}</strong>
          </p>
          <p className="mt-2 text-xs text-white/60">
            Each enquiry includes: customer name, email, phone, address, and the product they enquired about.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AdminOrdersPage;
