import React, { useState } from "react";
import { toast } from "react-toastify";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Please fill in your name, email and message.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      toast.success("Thanks! Banty team will reach out soon.");
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 700);
  };

  return (
    <section id="contact" className="px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold tracking-[0.3em] text-[#f97316]">
            SUPPORT
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Talk to Banty Car Accessories
          </h2>
          <p className="mt-3 text-sm text-white/80">
            Ask about fitment, delivery, bulk orders or custom builds. Share a quick note and
            our team will get back on WhatsApp or email.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-white/10 bg-black/70 p-6 text-sm"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-white/80">
                Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-white/10 bg-black/80 px-3 py-2 text-sm text-white placeholder-white/40 outline-none focus:border-[#22d3ee]"
                placeholder="Your name"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-white/80">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-white/10 bg-black/80 px-3 py-2 text-sm text-white placeholder-white/40 outline-none focus:border-[#22d3ee]"
                placeholder="you@example.com"
                disabled={isSubmitting}
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-white/80">
              How can we help? <span className="text-red-400">*</span>
            </label>
            <textarea
              rows={4}
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-white/10 bg-black/80 px-3 py-2 text-sm text-white placeholder-white/40 outline-none focus:border-[#22d3ee]"
              placeholder="Share your car model and what you’re planning to upgrade."
              disabled={isSubmitting}
            />
          </div>
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-gradient-to-r from-[#f97316] via-[#ef4444] to-[#22d3ee] px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-black/40 transition hover:-translate-y-0.5 hover:brightness-110 disabled:opacity-50 disabled:hover:translate-y-0"
            >
              {isSubmitting ? "Sending…" : "Send message"}
            </button>
            <p className="text-xs text-white/60">
              We usually reply within a few hours on working days.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Contact;

