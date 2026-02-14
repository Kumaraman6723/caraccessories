import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAdmin } from "../contexts/AdminContext.jsx";
import { API_BASE } from "../utils/api.js";

function EnquiryModal({ isOpen, onClose, product }) {
  const [form, setForm] = useState({ name: "", email: "", address: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAdmin();

  useEffect(() => {
    if (isOpen && user) {
      setForm((prev) => ({
        ...prev,
        name: prev.name || user.name || "",
        email: prev.email || user.email || "",
      }));
    }
  }, [isOpen, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      toast.error("Please fill in name, email and phone.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await axios.post(`${API_BASE}/api/enquiry`, {
        name: form.name.trim(),
        email: form.email.trim(),
        address: form.address.trim(),
        phone: form.phone.trim(),
        productId: product?.id,
        productName: product?.name,
      });
      if (res.data?.success) {
        toast.success("Enquiry sent! We will contact you shortly.");
        setForm({ name: "", email: "", address: "", phone: "" });
        onClose();
      } else {
        toast.error(res.data?.message || "Failed to send enquiry.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send enquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

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
        <form onSubmit={handleSubmit} className="space-y-3 text-sm">
          <div>
            <label className="mb-1 block text-[11px] text-white/70">Name *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-white/15 bg-black/70 px-3 py-2 text-white outline-none focus:border-[#22d3ee]"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="mb-1 block text-[11px] text-white/70">Email *</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-white/15 bg-black/70 px-3 py-2 text-white outline-none focus:border-[#22d3ee]"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="mb-1 block text-[11px] text-white/70">Phone *</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-white/15 bg-black/70 px-3 py-2 text-white outline-none focus:border-[#22d3ee]"
              placeholder="10-digit mobile number"
            />
          </div>
          <div>
            <label className="mb-1 block text-[11px] text-white/70">Address</label>
            <textarea
              name="address"
              rows={2}
              value={form.address}
              onChange={handleChange}
              className="w-full rounded-md border border-white/15 bg-black/70 px-3 py-2 text-white outline-none focus:border-[#22d3ee]"
              placeholder="Your delivery address"
            />
          </div>
          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 rounded-full bg-gradient-to-r from-[#f97316] via-[#ef4444] to-[#22d3ee] px-4 py-2.5 text-xs font-semibold text-black transition hover:brightness-110 disabled:opacity-60"
            >
              {submitting ? "Sending…" : "Send Enquiry"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-white/20 px-4 py-2.5 text-xs font-semibold text-white/80 hover:bg-white/5"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EnquiryModal;
