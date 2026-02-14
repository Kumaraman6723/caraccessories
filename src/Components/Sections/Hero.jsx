import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_BASE } from "../../utils/api.js";
const fallbackFeatured = [
    {
      name: "Carbon Street Spoiler",
      tag: "Aero • Exterior",
      price: "₹8,999",
      badge: "BEST SELLER",
      image:
        "https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      name: "Neon Underglow Kit",
      tag: "Lighting • Ambience",
      price: "₹4,499",
      badge: "NEW",
      image:
        "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      name: "Alcantara Racing Wheel Cover",
      tag: "Interior • Grip",
      price: "₹2,199",
      badge: "TRENDING",
      image:
        "https://images.pexels.com/photos/733745/pexels-photo-733745.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ];

function Hero() {
  const [featured, setFeatured] = useState(fallbackFeatured);

  useEffect(() => {
    axios.get(`${API_BASE}/api/products`).then((res) => {
      if (res.data?.success && Array.isArray(res.data.products) && res.data.products.length > 0) {
        const prods = res.data.products.slice(0, 3).map((p) => ({
          id: p.id,
          name: p.name,
          tag: p.category || "General",
          price: `₹${(p.price || 0).toLocaleString("en-IN")}`,
          badge: "FEATURED",
          image: (Array.isArray(p.images) && p.images[0]) || p.image || fallbackFeatured[0].image,
        }));
        setFeatured(prods);
      }
    });
  }, []);

  return (
    <header id="home" className="relative overflow-hidden">
      {/* Neon background glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_#f9731620,_transparent_55%),radial-gradient(circle_at_10%_80%,_#22d3ee25,_transparent_55%),radial-gradient(circle_at_90%_20%,_#ef444425,_transparent_55%)]" />

      {/* Subtle grid overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-20 mix-blend-soft-light">
        <div className="h-full w-full bg-[linear-gradient(to_right,#1f29370d_1px,transparent_1px),linear-gradient(to_bottom,#1f29370d_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16 lg:flex-row lg:items-center lg:py-24">
        {/* Left: Hero copy */}
        <div className="flex-1">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/60 px-4 py-2 backdrop-blur shadow-[0_0_25px_rgba(8,47,73,0.8)]">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#f97316] via-[#ef4444] to-[#22d3ee] ring-2 ring-[#22d3ee]/80">
              <span className="text-[10px] font-extrabold tracking-[0.18em] text-white">
                BA
              </span>
              <span className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_0,#ffffff40,transparent_55%)] mix-blend-screen" />
            </div>
            <div>
              <h2 className="text-[11px] font-semibold tracking-[0.28em] text-[#f97316] uppercase">
                Banty Car Accessories
              </h2>
              <p className="text-xs text-white/70">
                Premium Car Accessories • Styling • Performance
              </p>
            </div>
          </div>

          <h1 className="mb-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl lg:leading-tight">
            <span className="block text-white">
              Turn Every Drive
            </span>
            <span className="block bg-gradient-to-r from-[#f97316] via-[#ef4444] to-[#22d3ee] bg-clip-text text-transparent">
              Into A Statement.
            </span>
          </h1>

          <p className="mb-8 max-w-xl text-sm text-white/80 sm:text-base">
            Build your dream setup with{" "}
            <strong>curated car accessories</strong>, performance upgrades and
            detail-perfect styling. From neon underglow and smoked lights to
            steering wheels, seat upgrades and care kits – everything you need
            to make your ride look and feel custom.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/shop"
              className="rounded-full bg-gradient-to-r from-[#f97316] via-[#ef4444] to-[#22d3ee] px-7 py-3 text-sm font-semibold text-black shadow-[0_18px_45px_rgba(0,0,0,0.8)] transition hover:-translate-y-0.5 hover:brightness-110"
            >
              Browse Featured Gear
            </Link>

            <Link
              to="/collections"
              className="rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white/90 transition hover:border-[#22d3ee] hover:bg-white/5"
            >
              View Night Drive Collections
            </Link>
          </div>

          {/* Highlights */}
          <div className="mt-8 grid gap-4 text-xs text-white/70 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur">
              <p className="text-lg font-semibold text-white mb-1">Performance</p>
              <p>Exhaust tips, aero kits and intakes tuned for daily drives.</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur">
              <p className="text-lg font-semibold text-white mb-1">Lighting</p>
              <p>Neon underglow, fog lamps, DRLs and interior ambience LEDs.</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur">
              <p className="text-lg font-semibold text-white mb-1">Interior</p>
              <p>Racing wheels, seat covers, floor mats and organizer kits.</p>
            </div>
          </div>
        </div>

        {/* Right: Featured product cards */}
        <div className="flex-1">
          <div className="mx-auto max-w-md space-y-4">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-black to-slate-950 p-4 shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
              <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-[#22d3ee33] blur-3xl" />
              <div className="absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-[#ef444433] blur-3xl" />

              <div className="relative flex items-center justify-between gap-4 pb-3">
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.2em] text-[#22d3ee] uppercase">
                    Limited Drop
                  </p>
                  <p className="text-sm text-white/70">
                    Night Garage Edition • Handpicked kits
                  </p>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold text-emerald-300 border border-emerald-500/40">
                  Free install guide
                </span>
              </div>

              <div className="relative grid gap-3 sm:grid-cols-3">
                {featured.map((item) => (
                  <Link
                    key={item.id || item.name}
                    to={item.id ? `/product/${item.id}` : "/shop"}
                    className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-[0_12px_30px_rgba(15,23,42,0.9)] transition hover:-translate-y-1 hover:border-[#f97316]"
                  >
                    <div className="relative h-24 w-full overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-110 group-hover:brightness-110"
                      />
                      <span className="absolute left-2 top-2 rounded-full bg-black/70 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-white/80">
                        {item.badge}
                      </span>
                    </div>
                    <div className="space-y-1 px-3 py-2">
                      <p className="text-[11px] text-white/50">{item.tag}</p>
                      <p className="text-xs font-semibold text-white line-clamp-2">
                        {item.name}
                      </p>
                      <p className="text-sm font-bold text-[#f97316]">
                        {item.price}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Shop location map, placed after main content */}
      <div className="mx-auto mt-10 max-w-4xl px-6 pb-12">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/70">
          <p className="px-4 pt-3 text-xs font-semibold text-white">
            Visit Banty Car Accessories
          </p>
          <div className="mt-2 h-40 w-full sm:h-52">
            <iframe
              title="Banty Car Accessories location"
              src="https://www.google.com/maps?q=28.4797587,77.0398615&z=17&output=embed"
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Hero;