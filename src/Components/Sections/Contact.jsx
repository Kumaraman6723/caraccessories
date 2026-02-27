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
        <div className="space-y-4 rounded-2xl border border-white/10 bg-black/70 p-6 text-sm">
          <p className="text-sm text-white/80">
            You can reach Banty Car Accessories directly on call or visit the shop at the address
            below. Use the enquiry button on products for specific order questions.
          </p>
          <div className="rounded-xl border border-white/15 bg-black/60 p-4 text-xs text-white/80">
            <p className="text-[11px] font-semibold text-white">Shop details</p>
            <p className="mt-2">
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
            <p className="mt-1">
              Address:{" "}
              <span className="text-white/90">
                Shop no 3, Sheetla Mata Road, Rajiv Nagar, Sector 13
              </span>
            </p>
            <a
              href="https://www.google.com/maps?q=28.4797587,77.0398615"
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex text-[#22d3ee] hover:text-[#f97316]"
            >
              View on Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;

