import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="mb-3 text-3xl font-semibold">Page not found</h1>
        <p className="mb-6 text-sm text-white/70">
          The page you&apos;re looking for doesn&apos;t exist. Head back to the Banty
          homepage or explore the shop.
        </p>
        <div className="flex flex-wrap justify-center gap-3 text-xs">
          <Link
            to="/"
            className="rounded-full bg-white px-6 py-2 font-semibold text-black hover:bg-[#f97316]"
          >
            Go to Home
          </Link>
          <Link
            to="/shop"
            className="rounded-full border border-white/20 px-6 py-2 font-semibold text-white hover:border-[#22d3ee] hover:bg-white/5"
          >
            Browse Shop
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NotFoundPage;


