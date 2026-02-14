import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import EnquiryModal from "../../Components/EnquiryModal.jsx";
import { API_BASE } from "../../utils/api.js";
const categories = ["All", "Performance", "Lighting", "Interior", "Care"];

function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [enquiryProduct, setEnquiryProduct] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE}/api/products`)
      .then((res) => {
        if (res.data?.success && Array.isArray(res.data.products)) {
          setProducts(res.data.products);
        }
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const visibleProducts = products.filter((p) => {
    const matchCategory = category === "All" || p.category === category;
    const term = search.trim().toLowerCase();
    const matchSearch =
      !term ||
      (p.name || "").toLowerCase().includes(term) ||
      (p.tagline || "").toLowerCase().includes(term);
    return matchCategory && matchSearch;
  });

  const getImage = (p) => (Array.isArray(p.images) && p.images[0]) || p.image || "https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg?auto=compress&cs=tinysrgb&w=800";

  return (
    <section className="px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-[#f97316] uppercase">Shop</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              Banty Car Accessories Store
            </h1>
            <p className="mt-2 max-w-xl text-sm text-white/70">
              Browse curated performance, lighting, interior and care accessories.
            </p>
          </div>
          <input
            type="text"
            placeholder="Search accessories…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-white/10 bg-black/50 px-4 py-2 text-xs text-white placeholder-white/40 outline-none focus:border-[#22d3ee] sm:w-60"
          />
        </header>

        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                category === cat
                  ? "border-[#f97316] bg-[#f97316]/10 text-[#f97316]"
                  : "border-white/10 bg-black/40 text-white/70 hover:border-[#22d3ee] hover:text-[#22d3ee]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-sm text-white/60">Loading products…</p>
        ) : visibleProducts.length === 0 ? (
          <p className="mt-8 text-sm text-white/60">
            No products match your filters.
          </p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visibleProducts.map((product) => (
              <article
                key={product.id}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900/80 via-black to-black shadow-[0_18px_40px_rgba(0,0,0,0.85)] transition hover:-translate-y-1 hover:border-[#f97316]"
              >
                <Link to={`/product/${product.id}`}>
                  <div className="relative h-44 w-full overflow-hidden">
                    <img
                      src={getImage(product)}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110 group-hover:brightness-110"
                    />
                  </div>
                </Link>
                <div className="space-y-2 px-4 py-3">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#22d3ee]">
                    {product.category || "General"}
                  </p>
                  <Link
                    to={`/product/${product.id}`}
                    className="block text-sm font-semibold text-white hover:text-[#f97316]"
                  >
                    {product.name}
                  </Link>
                  <p className="line-clamp-2 text-xs text-white/60">{product.tagline}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm font-bold text-[#f97316]">
                      ₹{(product.price || 0).toLocaleString("en-IN")}
                    </p>
                    <button
                      type="button"
                      onClick={() => setEnquiryProduct(product)}
                      className="rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-black transition hover:bg-[#f97316]"
                    >
                      Send Enquiry
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <EnquiryModal
        isOpen={!!enquiryProduct}
        onClose={() => setEnquiryProduct(null)}
        product={enquiryProduct}
      />
    </section>
  );
}

export default ShopPage;
