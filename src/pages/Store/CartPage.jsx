import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext.jsx";

function CartPage() {
  const { items, cartTotal, updateQty, removeFromCart } = useCart();
  const navigate = useNavigate();

  if (!items.length) {
    return (
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-3 text-2xl font-semibold">Your cart is empty</h1>
          <p className="mb-6 text-sm text-white/70">
            Start building your Banty setup with spoilers, lighting, interiors and more.
          </p>
          <Link
            to="/shop"
            className="rounded-full bg-white px-6 py-2 text-xs font-semibold text-black hover:bg-[#f97316]"
          >
            Browse Shop
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-[#f97316] uppercase">
              Cart
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
              Your Banty build
            </h1>
          </div>
          <p className="text-xs text-white/70">
            {items.length} item{items.length > 1 ? "s" : ""}
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 rounded-2xl border border-white/10 bg-black/50 p-3 sm:p-4"
              >
                <div className="h-20 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-slate-900">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-1 text-xs sm:text-sm">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[#22d3ee]">
                        {item.category}
                      </p>
                      <p className="font-semibold text-white">{item.name}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="text-[11px] text-white/50 hover:text-rose-400"
                    >
                      Remove
                    </button>
                  </div>
                  <p className="text-[11px] text-white/60">
                    ₹{item.price.toLocaleString("en-IN")} each
                  </p>
                  <div className="mt-2 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-white/60">Qty</span>
                      <input
                        type="number"
                        min={1}
                        value={item.qty}
                        onChange={(e) =>
                          updateQty(item.id, Math.max(1, Number(e.target.value) || 1))
                        }
                        className="w-16 rounded-md border border-white/15 bg-black/60 px-2 py-1 text-xs text-white outline-none"
                      />
                    </div>
                    <p className="text-sm font-semibold text-[#f97316]">
                      ₹{(item.price * item.qty).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="space-y-3 rounded-2xl border border-white/10 bg-black/60 p-4 text-xs text-white/80">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span className="text-sm font-semibold text-[#f97316]">
                ₹{cartTotal.toLocaleString("en-IN")}
              </span>
            </div>
            <p className="text-[11px] text-white/60">
              Taxes, shipping and fitment are calculated at checkout. COD available in select
              locations.
            </p>
            <button
              type="button"
              onClick={() => navigate("/checkout")}
              className="mt-3 w-full rounded-full bg-gradient-to-r from-[#f97316] via-[#ef4444] to-[#22d3ee] px-4 py-2.5 text-xs font-semibold text-black shadow-[0_16px_40px_rgba(0,0,0,0.9)] hover:-translate-y-0.5 hover:brightness-110 transition"
            >
              Proceed to Checkout
            </button>
            <Link
              to="/shop"
              className="mt-1 block text-center text-[11px] text-white/60 hover:text-white"
            >
              Continue shopping
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default CartPage;


