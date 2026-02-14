import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext.jsx";
import { createOrder } from "../../utils/shopStorage.js";
import { toast } from "react-toastify";

function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!items.length) {
      navigate("/shop", { replace: true });
    }
  }, [items.length, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      toast.error("Please fill in name, phone and address.");
      return;
    }
    if (!items.length) {
      toast.error("Your cart is empty.");
      return;
    }

    setSubmitting(true);
    try {
      const order = createOrder({
        customer: {
          name: form.name.trim(),
          phone: form.phone.trim(),
          address: form.address.trim(),
        },
        items: items.map((it) => ({
          id: it.id,
          name: it.name,
          price: it.price,
          qty: it.qty,
        })),
        total: cartTotal,
        note: form.note.trim(),
      });
      clearCart();
      toast.success(`Order placed! Your ID is ${order.id}`);
      navigate("/orders");
    } catch (err) {
      console.error("Failed to place order", err);
      toast.error("Could not place order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!items.length) {
    return null;
  }

  return (
    <section className="px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <header className="mb-6">
          <p className="text-xs font-semibold tracking-[0.3em] text-[#f97316] uppercase">
            Checkout
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            Confirm your Banty order
          </h1>
        </header>

        <form
          onSubmit={handleSubmit}
          className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)]"
        >
          <div className="space-y-4 rounded-2xl border border-white/10 bg-black/60 p-4 text-xs sm:text-sm">
            <p className="mb-1 text-xs font-semibold tracking-[0.2em] text-white/60 uppercase">
              Delivery details
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-[11px] text-white/70">
                  Full name*
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-md border border-white/15 bg-black/70 px-3 py-2 text-xs text-white outline-none focus:border-[#22d3ee]"
                />
              </div>
              <div>
                <label className="mb-1 block text-[11px] text-white/70">
                  Phone number*
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full rounded-md border border-white/15 bg-black/70 px-3 py-2 text-xs text-white outline-none focus:border-[#22d3ee]"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-[11px] text-white/70">
                Delivery address*
              </label>
              <textarea
                name="address"
                rows={3}
                value={form.address}
                onChange={handleChange}
                className="w-full rounded-md border border-white/15 bg-black/70 px-3 py-2 text-xs text-white outline-none focus:border-[#22d3ee]"
              />
            </div>
            <div>
              <label className="mb-1 block text-[11px] text-white/70">
                Notes for Banty team (optional)
              </label>
              <textarea
                name="note"
                rows={2}
                value={form.note}
                onChange={handleChange}
                className="w-full rounded-md border border-white/15 bg-black/70 px-3 py-2 text-xs text-white outline-none focus:border-[#22d3ee]"
              />
            </div>
            <p className="text-[11px] text-white/60">
              We currently support Cash on Delivery (COD) and UPI on delivery in select
              locations. Our support will confirm fitment and shipping before dispatch.
            </p>
          </div>

          <aside className="space-y-3 rounded-2xl border border-white/10 bg-black/70 p-4 text-xs text-white/80">
            <p className="text-xs font-semibold tracking-[0.2em] text-white/60 uppercase">
              Order summary
            </p>
            <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-2">
                  <span className="text-[11px] text-white/70">
                    {item.name} × {item.qty}
                  </span>
                  <span className="text-[11px] text-white/90">
                    ₹{(item.price * item.qty).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>
            <hr className="border-white/10" />
            <div className="flex items-center justify-between">
              <span>Total</span>
              <span className="text-sm font-semibold text-[#f97316]">
                ₹{cartTotal.toLocaleString("en-IN")}
              </span>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="mt-3 w-full rounded-full bg-gradient-to-r from-[#f97316] via-[#ef4444] to-[#22d3ee] px-4 py-2.5 text-xs font-semibold text-black shadow-[0_16px_40px_rgba(0,0,0,0.9)] hover:-translate-y-0.5 hover:brightness-110 transition disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {submitting ? "Placing order…" : "Place Order (COD/UPI on delivery)"}
            </button>
          </aside>
        </form>
      </div>
    </section>
  );
}

export default CheckoutPage;


