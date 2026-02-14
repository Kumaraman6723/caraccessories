import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadOrders } from "../../utils/shopStorage.js";

const statusColors = {
  Pending: "bg-amber-500/15 text-amber-300 border-amber-500/40",
  Processing: "bg-sky-500/15 text-sky-300 border-sky-500/40",
  Shipped: "bg-indigo-500/15 text-indigo-300 border-indigo-500/40",
  Completed: "bg-emerald-500/15 text-emerald-300 border-emerald-500/40",
  Cancelled: "bg-rose-500/15 text-rose-300 border-rose-500/40",
};

function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(loadOrders());
  }, []);

  if (!orders.length) {
    return (
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-3 text-2xl font-semibold">No orders yet</h1>
          <p className="mb-6 text-sm text-white/70">
            When you place an order, it will appear here with its status and details.
          </p>
          <Link
            to="/shop"
            className="rounded-full bg-white px-6 py-2 text-xs font-semibold text-black hover:bg-[#f97316]"
          >
            Start shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6">
          <p className="text-xs font-semibold tracking-[0.3em] text-[#f97316] uppercase">
            Orders
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            Your Banty orders
          </h1>
          <p className="mt-2 text-sm text-white/70">
            Track what you&apos;ve ordered and see the latest status updated by the Banty team.
          </p>
        </header>

        <div className="space-y-4">
          {orders.map((order) => {
            const color =
              statusColors[order.status] ||
              "bg-slate-500/15 text-slate-200 border-slate-500/40";
            const created = new Date(order.createdAt);
            return (
              <article
                key={order.id}
                className="rounded-2xl border border-white/10 bg-black/60 p-4 text-xs sm:text-sm"
              >
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-[11px] text-white/50">Order ID</p>
                    <p className="font-mono text-xs text-white">
                      {order.id}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="text-[11px] text-white/50">Placed on</p>
                      <p className="text-xs text-white/80">
                        {created.toLocaleString("en-IN", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-semibold ${color}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                {order.customer ? (
                  <p className="mb-2 text-[11px] text-white/70">
                    {order.customer.name} • {order.customer.phone}
                  </p>
                ) : null}

                <div className="mt-2 space-y-1">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-2 text-[11px] text-white/75"
                    >
                      <span>
                        {item.name} × {item.qty}
                      </span>
                      <span>
                        ₹{(item.price * item.qty).toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
                  <span className="text-[11px] text-white/60">Order total</span>
                  <span className="text-sm font-semibold text-[#f97316]">
                    ₹{order.total.toLocaleString("en-IN")}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default OrdersPage;


