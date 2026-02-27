import React from "react";

function EnquiryModal({ isOpen, onClose, product }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close"
      />
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-black/95 p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Send Enquiry</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-white/60 hover:bg-white/10 hover:text-white"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {product && (
          <p className="mb-4 text-xs text-white/60">
            Enquiry for: <span className="font-semibold text-white">{product.name}</span>
          </p>
        )}

        <div className="space-y-4">
          <div className="rounded-lg border border-white/15 bg-black/70 p-3 text-xs text-white/80">
            <p className="mb-2 text-[12px] font-bold text-white">Shop details</p>
            <p className="mt-1">
              <span className="font-bold text-white">Mobile:&nbsp;</span>
              <a
                href="tel:+919717781953"
                className="font-bold text-[#22d3ee] hover:text-[#f97316]"
              >
                9717781953
              </a>
              <span className="mx-1 font-bold text-white">/</span>
              <a
                href="tel:+918285310740"
                className="font-bold text-[#22d3ee] hover:text-[#f97316]"
              >
                8285310740
              </a>
            </p>
            <p className="mt-2">
              <span className="font-bold text-white">Address:&nbsp;</span>
              <span className="font-bold text-white">
                Shop no 3, Sheetla Mata Road, Rajiv Nagar, Sector 13
              </span>
            </p>
          </div>

          <div className="rounded-lg border border-white/15 bg-black/70 p-3">
            <p className="mb-2 text-[12px] font-bold text-white">
              Google Map Location
            </p>
            <div className="h-48 w-full overflow-hidden rounded-md">
              <iframe
                title="Shop location"
                src="https://www.google.com/maps?q=28.4797587,77.0398615&z=17&output=embed"
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-full border border-white/20 px-4 py-2.5 text-xs font-semibold text-white/90 hover:bg-white/5"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default EnquiryModal;
