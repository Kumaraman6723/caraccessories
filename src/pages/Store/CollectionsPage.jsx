import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "";

function CollectionsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const base = API_URL || (window.location.port === "5173" ? "" : "");
    axios.get(`${base}/api/products`).then((res) => {
      if (res.data?.success && Array.isArray(res.data.products)) {
        setProducts(res.data.products);
      }
    });
  }, []);

  const byCategory = (cat) => products.filter((p) => (p.category || "General") === cat);
  const categories = [...new Set(products.map((p) => p.category || "General"))];

  const getImage = (p) => (Array.isArray(p.images) && p.images[0]) || p.image || null;

  return (
    <section className="px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <header>
          <p className="text-xs font-semibold tracking-[0.3em] text-[#f97316] uppercase">Collections</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">Curated Banty builds</h1>
          <p className="mt-2 max-w-2xl text-sm text-white/70">
            Explore products by category. Browse performance, lighting, interior and care accessories.
          </p>
        </header>

        {categories.length === 0 ? (
          <p className="text-sm text-white/60">No products yet. Admin can add products from the admin panel.</p>
        ) : (
          categories.map((cat) => {
            const items = byCategory(cat);
            if (!items.length) return null;
            return (
              <div key={cat} className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-lg font-semibold text-white">{cat}</h2>
                  <Link to="/shop" className="text-[11px] text-[#22d3ee] hover:text-[#f97316]">
                    View all in shop
                  </Link>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((p) => (
                    <Link
                      key={p.id}
                      to={`/product/${p.id}`}
                      className="group overflow-hidden rounded-2xl border border-white/10 bg-black/60 transition hover:border-[#f97316]"
                    >
                      <div className="relative h-32 w-full overflow-hidden">
                        <img
                          src={getImage(p)}
                          alt={p.name}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-110 group-hover:brightness-110"
                        />
                        <span className="absolute left-3 top-3 rounded-full bg-black/80 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-white/80">
                          {p.category || "General"}
                        </span>
                      </div>
                      <div className="space-y-1 px-3 py-2 text-xs">
                        <p className="font-semibold text-white">{p.name}</p>
                        <p className="line-clamp-2 text-[11px] text-white/60">{p.tagline}</p>
                        <p className="text-sm font-bold text-[#f97316]">₹{(p.price || 0).toLocaleString("en-IN")}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}

export default CollectionsPage;
