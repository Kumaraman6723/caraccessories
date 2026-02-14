const API_BASE = (
  import.meta.env.VITE_API_URL ||
  "https://caraccessoriesbackend.vercel.app"
).replace(/\/+$/, "");

export { API_BASE };
