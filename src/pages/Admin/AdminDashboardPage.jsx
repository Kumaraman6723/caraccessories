import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAdmin } from "../../contexts/AdminContext.jsx";
import { API_BASE } from "../../utils/api.js";

function AdminDashboardPage() {
  const [productsCount, setProductsCount] = useState(0);
  const { logout } = useAdmin();

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/products`)
      .then((res) => {
        if (res.data?.success && Array.isArray(res.data.products)) {
          setProductsCount(res.data.products.length);
        }
      })
      .catch(() => setProductsCount(0));
  }, []);

  return (
    <section className="px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-6 text-sm text-white/80">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.3em] text-[#f97316] uppercase">Admin</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">Banty admin overview</h1>
          </div>
          <button
            type="button"
            onClick={logout}
            className="rounded-full border border-white/20 px-4 py-1.5 text-[11px] text-white/70 hover:border-rose-400 hover:text-rose-300"
          >
            Logout
          </button>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-xs">
          <div className="rounded-2xl border border-white/10 bg-black/70 p-4">
            <p className="text-[11px] text-white/60">Products</p>
            <p className="mt-1 text-xl font-semibold text-white">{productsCount}</p>
            <Link to="/admin/products" className="mt-2 inline-block text-[11px] text-[#22d3ee] hover:text-[#f97316]">
              Manage products
            </Link>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/70 p-4">
            <p className="text-[11px] text-white/60">Enquiries</p>
            <p className="mt-1 text-xl font-semibold text-white">Sent to Gmail</p>
            <Link to="/admin/enquiries" className="mt-2 inline-block text-[11px] text-[#22d3ee] hover:text-[#f97316]">
              View info
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminDashboardPage;
