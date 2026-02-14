const PRODUCTS_KEY = "banty_products_v1";
const ORDERS_KEY = "banty_orders_v1";

const seedProducts = [
  {
    id: "carbon-street-spoiler",
    name: "Carbon Street Spoiler",
    category: "Performance",
    price: 8999,
    badge: "BEST SELLER",
    tagline: "Aggressive rear aero for hatchbacks and sedans.",
    image:
      "https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg?auto=compress&cs=tinysrgb&w=800",
    collections: ["Night Drive", "Track Ready"],
    isDeal: true,
    inStock: true,
  },
  {
    id: "neon-underglow-kit",
    name: "Neon Underglow Kit",
    category: "Lighting",
    price: 4499,
    badge: "NEW",
    tagline: "Full underbody RGB strips with remote and music sync.",
    image:
      "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=800",
    collections: ["Night Drive"],
    isDeal: false,
    inStock: true,
  },
  {
    id: "alcantara-racing-wheel-cover",
    name: "Alcantara Racing Wheel Cover",
    category: "Interior",
    price: 2199,
    badge: "TRENDING",
    tagline: "Enhanced grip and premium feel for spirited driving.",
    image:
      "https://images.pexels.com/photos/733745/pexels-photo-733745.jpeg?auto=compress&cs=tinysrgb&w=800",
    collections: ["Daily Drive"],
    isDeal: false,
    inStock: true,
  },
  {
    id: "smoked-led-tail-lamps",
    name: "Smoked LED Tail Lamps",
    category: "Lighting",
    price: 12999,
    badge: "LIMITED",
    tagline: "Plug-and-play smoked tails with dynamic indicators.",
    image:
      "https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&cs=tinysrgb&w=800",
    collections: ["Night Drive", "Premium"],
    isDeal: true,
    inStock: true,
  },
  {
    id: "ceramic-detailing-kit",
    name: "Ceramic Detailing Kit",
    category: "Care",
    price: 3499,
    badge: "CARE ESSENTIAL",
    tagline: "Shampoo, quick detailer and ceramic spray sealant.",
    image:
      "https://images.pexels.com/photos/6870323/pexels-photo-6870323.jpeg?auto=compress&cs=tinysrgb&w=800",
    collections: ["Daily Drive"],
    isDeal: false,
    inStock: true,
  },
  {
    id: "deep-dish-alloy-set",
    name: "Deep Dish Alloy Wheel Set (4PC)",
    category: "Performance",
    price: 44999,
    badge: "PREMIUM",
    tagline: "Lightweight deep-dish alloys for a wider, bolder stance.",
    image:
      "https://images.pexels.com/photos/4724391/pexels-photo-4724391.jpeg?auto=compress&cs=tinysrgb&w=800",
    collections: ["Track Ready", "Premium"],
    isDeal: false,
    inStock: true,
  },
];

function safeParse(json, fallback) {
  try {
    const parsed = JSON.parse(json);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

export function loadProducts() {
  if (typeof window === "undefined") return seedProducts;
  const raw = window.localStorage.getItem(PRODUCTS_KEY);
  if (!raw) return seedProducts;
  const parsed = safeParse(raw, []);
  if (!Array.isArray(parsed) || !parsed.length) return seedProducts;
  return parsed;
}

export function saveProducts(products) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

export function findProductById(id) {
  const products = loadProducts();
  return products.find((p) => p.id === id);
}

export function loadOrders() {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(ORDERS_KEY);
  const parsed = safeParse(raw, []);
  return Array.isArray(parsed) ? parsed : [];
}

export function saveOrders(orders) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export function createOrder({ customer, items, total, note }) {
  const orders = loadOrders();
  const now = new Date();
  const id = `ORD-${now.getTime().toString(36).toUpperCase()}`;
  const order = {
    id,
    customer,
    items,
    total,
    note: note || "",
    status: "Pending",
    createdAt: now.toISOString(),
  };
  const next = [order, ...orders];
  saveOrders(next);
  return order;
}

export function updateOrderStatus(orderId, status) {
  const orders = loadOrders();
  const next = orders.map((o) =>
    o.id === orderId ? { ...o, status } : o
  );
  saveOrders(next);
  return next;
}

export function deleteOrder(orderId) {
  const orders = loadOrders();
  const next = orders.filter((o) => o.id !== orderId);
  saveOrders(next);
  return next;
}


