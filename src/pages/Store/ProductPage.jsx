import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import EnquiryModal from "../../Components/EnquiryModal.jsx";

const API_URL = import.meta.env.VITE_API_URL || "";

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  useEffect(() => {
    const base = API_URL || (window.location.port === "5173" ? "" : "");
    axios.get(`${base}/api/products`)
      .then((res) => {
        if (res.data?.success && Array.isArray(res.data.products)) {
          const p = res.data.products.find((pr) => pr.id === id);
          setProduct(p || null);
        }
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <section className="px-6 py-16">
        <p className="text-center text-sm text-white/60">Loading…</p>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-3 text-2xl font-semibold">Product not found</h1>
          <p className="mb-6 text-sm text-white/70">
            The accessory you&apos;re looking for may have been removed.
          </p>
          <button
            type="button"
            onClick={() => navigate("/shop")}
            className="rounded-full bg-white px-6 py-2 text-xs font-semibold text-black hover:bg-[#f97316]"
          >
            Back to Shop
          </button>
        </div>
      </section>
    );
  }

  const images = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : product.image
      ? [product.image]
      : ["https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg?auto=compress&cs=tinysrgb&w=800"];
  const mainImage = images[selectedImage] || images[0];

  return (
    <section className="px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row">
        <div className="lg:w-1/2">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900/80 via-black to-black shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
            <div className="relative h-80 w-full overflow-hidden sm:h-96">
              <img
                src={mainImage}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto p-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedImage(i)}
                    className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition ${
                      selectedImage === i ? "border-[#f97316]" : "border-white/10"
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-4 lg:w-1/2">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#22d3ee]">
              {product.category || "General"}
            </p>
            <h1 className="mt-1 text-2xl font-semibold sm:text-3xl">{product.name}</h1>
          </div>
          <p className="text-sm text-white/70">{product.tagline}</p>

          <div className="mt-2 flex items-center gap-4">
            <p className="text-2xl font-bold text-[#f97316]">
              ₹{(product.price || 0).toLocaleString("en-IN")}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setEnquiryOpen(true)}
              className="rounded-full bg-gradient-to-r from-[#f97316] via-[#ef4444] to-[#22d3ee] px-7 py-2.5 text-xs font-semibold text-black shadow-[0_18px_45px_rgba(0,0,0,0.8)] transition hover:-translate-y-0.5 hover:brightness-110"
            >
              Send Enquiry
            </button>
            <Link
              to="/shop"
              className="rounded-full border border-white/20 px-7 py-2.5 text-xs font-semibold text-white/80 transition hover:border-[#22d3ee] hover:bg-white/5"
            >
              Back to Shop
            </Link>
          </div>

          <div className="mt-6 grid gap-4 text-xs text-white/70 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/50 p-4">
              <p className="mb-1 text-sm font-semibold text-white">What&apos;s included</p>
              <ul className="space-y-1">
                <li>• Main accessory with required hardware.</li>
                <li>• Basic install guide.</li>
                <li>• Banty quality checks & packaging.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/50 p-4">
              <p className="mb-1 text-sm font-semibold text-white">Shipping & fitment</p>
              <ul className="space-y-1">
                <li>• Ships in 2–4 working days.</li>
                <li>• COD available in select locations.</li>
                <li>• Fitment guidance provided.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        product={product}
      />
    </section>
  );
}

export default ProductPage;
