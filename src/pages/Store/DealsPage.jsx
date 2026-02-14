import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_BASE } from "../../utils/api.js";

function DealsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE}/api/products`).then((res) => {
      if (res.data?.success && Array.isArray(res.data.products)) {
        setProducts(res.data.products);
      }
    });
  }, []);

  const deals = products.filter((p) => p.isDeal);
  const getImage = (p) => (Array.isArray(p.images) && p.images[0]) || p.image || null;

  return (
    <section className="px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-4">
          <p className="text-xs font-semibold tracking-[0.3em] text-[#f97316] uppercase">Hot Deals</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">Banty limited drops</h1>
          <p className="mt-2 max-w-2xl text-sm text-white/70">
            Time-limited pricing on spoilers, lighting and premium parts.
          </p>
        </header>

        {deals.length === 0 ? (
          <p className="mt-8 text-sm text-white/70">
            No active deals right now. Check back soon or browse the full{" "}
            <Link to="/shop" className="text-[#22d3ee] hover:text-[#f97316]">shop</Link>.
          </p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {deals.map((p) => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                className="group overflow-hidden rounded-3xl border border-rose-500/40 bg-gradient-to-b from-rose-900/40 via-black to-black shadow-[0_22px_50px_rgba(0,0,0,0.9)]"
              >
                <div className="relative h-40 w-full overflow-hidden">
                  <img
                    src={getImage(p)}
                    alt={p.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110 group-hover:brightness-110"
                  />
                  <span className="absolute left-3 top-3 rounded-full border border-rose-500/60 bg-black/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-rose-300">
                    Hot Deal
                  </span>
                </div>
                <div className="space-y-1 px-4 py-3 text-xs">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-rose-300">{p.category || "General"}</p>
                  <p className="text-sm font-semibold text-white">{p.name}</p>
                  <p className="line-clamp-2 text-[11px] text-white/70">{p.tagline}</p>
                  <p className="mt-1 text-sm font-bold text-[#f97316]">₹{(p.price || 0).toLocaleString("en-IN")}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default DealsPage;
