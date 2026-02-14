import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAdmin } from "../../contexts/AdminContext.jsx";

const API_URL = import.meta.env.VITE_API_URL || "";

function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", price: "", category: "Performance", tagline: "" });
  const [images, setImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", price: "", category: "Performance", tagline: "" });
  const [editExistingImages, setEditExistingImages] = useState([]);
  const [editNewImages, setEditNewImages] = useState([]);
  const [editSubmitting, setEditSubmitting] = useState(false);
  const { getAdminToken } = useAdmin();

  const base = () => API_URL || (window.location.port === "5173" ? "" : "");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    setLoading(true);
    axios
      .get(`${base()}/api/products`)
      .then((res) => {
        if (res.data?.success && Array.isArray(res.data.products)) {
          setProducts(res.data.products);
        }
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    setImages((prev) => [...prev, ...files].slice(0, 10));
  };

  const removeImage = (i) => {
    setImages((prev) => prev.filter((_, idx) => idx !== i));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.price.trim()) {
      toast.error("Name and price are required.");
      return;
    }
    if (images.length === 0) {
      toast.error("Please add at least one product image.");
      return;
    }

    const token = getAdminToken();
    if (!token) {
      toast.error("Please sign in again.");
      return;
    }

    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("adminToken", token);
      fd.append("name", form.name.trim());
      fd.append("price", form.price.trim());
      fd.append("category", form.category || "General");
      fd.append("tagline", form.tagline.trim());
      images.forEach((file) => fd.append("images", file));

      const res = await axios.post(`${base()}/api/products`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data?.success) {
        toast.success("Product added.");
        setForm({ name: "", price: "", category: "Performance", tagline: "" });
        setImages([]);
        fetchProducts();
      } else {
        toast.error(res.data?.message || "Failed to add product.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add product.");
    } finally {
      setSubmitting(false);
    }
  };

  const openEdit = (p) => {
    setEditingProduct(p);
    setEditForm({
      name: p.name || "",
      price: String(p.price ?? ""),
      category: p.category || "Performance",
      tagline: p.tagline || "",
    });
    setEditExistingImages(Array.isArray(p.images) ? [...p.images] : p.image ? [p.image] : []);
    setEditNewImages([]);
  };

  const closeEdit = () => {
    setEditingProduct(null);
    setEditForm({ name: "", price: "", category: "Performance", tagline: "" });
    setEditExistingImages([]);
    setEditNewImages([]);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const removeEditExistingImage = (i) => {
    setEditExistingImages((prev) => prev.filter((_, idx) => idx !== i));
  };

  const handleEditNewImages = (e) => {
    const files = Array.from(e.target.files || []);
    const total = editExistingImages.length + editNewImages.length + files.length;
    if (total > 10) {
      toast.error("Maximum 10 images allowed.");
      return;
    }
    setEditNewImages((prev) => [...prev, ...files].slice(0, 10 - editExistingImages.length));
  };

  const removeEditNewImage = (i) => {
    setEditNewImages((prev) => prev.filter((_, idx) => idx !== i));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingProduct) return;
    if (!editForm.name.trim() || !editForm.price.trim()) {
      toast.error("Name and price are required.");
      return;
    }
    const allImages = [...editExistingImages, ...editNewImages];
    if (allImages.length === 0) {
      toast.error("Please add at least one product image.");
      return;
    }
    const token = getAdminToken();
    if (!token) {
      toast.error("Please sign in again.");
      return;
    }
    setEditSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("adminToken", token);
      fd.append("name", editForm.name.trim());
      fd.append("price", editForm.price.trim());
      fd.append("category", editForm.category || "General");
      fd.append("tagline", editForm.tagline.trim());
      fd.append("existingImages", JSON.stringify(editExistingImages));
      editNewImages.forEach((file) => fd.append("images", file));
      const res = await axios.put(`${base()}/api/products/${editingProduct.id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data?.success) {
        toast.success("Product updated.");
        closeEdit();
        fetchProducts();
      } else {
        toast.error(res.data?.message || "Failed to update product.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update product.");
    } finally {
      setEditSubmitting(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    const token = getAdminToken();
    if (!token) {
      toast.error("Please sign in again.");
      return;
    }
    try {
      const res = await axios.delete(`${base()}/api/products/${id}`, {
        headers: { "X-Admin-Token": token },
      });
      if (res.data?.success) {
        toast.success("Product deleted.");
        fetchProducts();
      } else {
        toast.error(res.data?.message || "Failed to delete.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete product.");
    }
  };

  const getImage = (p) => (Array.isArray(p.images) && p.images[0]) || p.image || null;

  return (
    <section className="px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-5 text-xs text-white/80">
        <header>
          <p className="text-[11px] font-semibold tracking-[0.3em] text-[#f97316] uppercase">Admin • Products</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">Manage catalog</h1>
        </header>

        <form onSubmit={handleAdd} className="grid gap-3 rounded-2xl border border-white/10 bg-black/70 p-4 sm:grid-cols-[2fr_1fr_1.5fr_auto]">
          <div>
            <label className="mb-1 block text-[11px] text-white/70">Product name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-md border border-white/15 bg-black/70 px-3 py-2 text-white outline-none focus:border-[#22d3ee]"
            />
          </div>
          <div>
            <label className="mb-1 block text-[11px] text-white/70">Price (₹)</label>
            <input
              type="number"
              min="0"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="w-full rounded-md border border-white/15 bg-black/70 px-3 py-2 text-white outline-none focus:border-[#22d3ee]"
            />
          </div>
          <div>
            <label className="mb-1 block text-[11px] text-white/70">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full rounded-md border border-white/15 bg-black/70 px-3 py-2 text-white outline-none focus:border-[#22d3ee]"
            >
              <option value="Performance">Performance</option>
              <option value="Lighting">Lighting</option>
              <option value="Interior">Interior</option>
              <option value="Care">Care</option>
              <option value="General">General</option>
            </select>
          </div>
          <div className="flex flex-col justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-full bg-white px-4 py-2 text-[11px] font-semibold text-black hover:bg-[#f97316] disabled:opacity-60"
            >
              {submitting ? "Adding…" : "Add product"}
            </button>
          </div>
          <div className="sm:col-span-4">
            <label className="mb-1 block text-[11px] text-white/70">Images (at least 1, max 10)</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="w-full rounded-md border border-white/15 bg-black/70 px-3 py-2 text-white outline-none focus:border-[#22d3ee] file:mr-2 file:rounded file:border-0 file:bg-[#f97316] file:px-3 file:py-1 file:text-xs file:font-semibold file:text-black"
            />
            {images.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {images.map((file, i) => (
                  <div key={i} className="relative">
                    <img src={URL.createObjectURL(file)} alt="" className="h-12 w-12 rounded object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute -right-1 -top-1 rounded-full bg-rose-500 px-1.5 py-0.5 text-[10px] text-white"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="sm:col-span-4">
            <label className="mb-1 block text-[11px] text-white/70">Tagline (optional)</label>
            <input
              type="text"
              name="tagline"
              value={form.tagline}
              onChange={handleChange}
              placeholder="Short description"
              className="w-full rounded-md border border-white/15 bg-black/70 px-3 py-2 text-white outline-none focus:border-[#22d3ee]"
            />
          </div>
        </form>

        {loading ? (
          <p className="text-sm text-white/60">Loading products…</p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/70">
            <table className="min-w-full text-left text-[11px] text-white/70">
              <thead className="border-b border-white/10 text-[10px] uppercase tracking-[0.18em] text-white/50">
                <tr>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b border-white/5 last:border-0">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {getImage(p) ? (
                          <img src={getImage(p)} alt="" className="h-10 w-10 rounded object-cover" />
                        ) : null}
                        <div>
                          <p className="font-semibold text-white">{p.name}</p>
                          <p className="text-[10px] text-white/50">{p.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">{p.category || "General"}</td>
                    <td className="px-4 py-3">₹{(p.price || 0).toLocaleString("en-IN")}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => openEdit(p)}
                          className="text-[11px] text-[#22d3ee] hover:text-[#22d3ee]/80"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteProduct(p.id)}
                          className="text-[11px] text-rose-300 hover:text-rose-200"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {editingProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-black/90 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">Edit product</h2>
                <button
                  type="button"
                  onClick={closeEdit}
                  className="rounded-full p-1.5 text-white/60 hover:bg-white/10 hover:text-white transition"
                  aria-label="Close"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-[11px] text-white/70">Product name</label>
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleEditChange}
                      className="w-full rounded-md border border-white/15 bg-black/70 px-3 py-2 text-white outline-none focus:border-[#22d3ee]"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[11px] text-white/70">Price (₹)</label>
                    <input
                      type="number"
                      min="0"
                      name="price"
                      value={editForm.price}
                      onChange={handleEditChange}
                      className="w-full rounded-md border border-white/15 bg-black/70 px-3 py-2 text-white outline-none focus:border-[#22d3ee]"
                    />
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-[11px] text-white/70">Category</label>
                    <select
                      name="category"
                      value={editForm.category}
                      onChange={handleEditChange}
                      className="w-full rounded-md border border-white/15 bg-black/70 px-3 py-2 text-white outline-none focus:border-[#22d3ee]"
                    >
                      <option value="Performance">Performance</option>
                      <option value="Lighting">Lighting</option>
                      <option value="Interior">Interior</option>
                      <option value="Care">Care</option>
                      <option value="General">General</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-[11px] text-white/70">Tagline (optional)</label>
                    <input
                      type="text"
                      name="tagline"
                      value={editForm.tagline}
                      onChange={handleEditChange}
                      placeholder="Short description"
                      className="w-full rounded-md border border-white/15 bg-black/70 px-3 py-2 text-white outline-none focus:border-[#22d3ee]"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-[11px] text-white/70">Images (1–10 total, existing + new)</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {editExistingImages.map((url, i) => (
                      <div key={`ex-${i}`} className="relative">
                        <img src={url} alt="" className="h-14 w-14 rounded object-cover border border-white/10" />
                        <button
                          type="button"
                          onClick={() => removeEditExistingImage(i)}
                          className="absolute -right-1 -top-1 rounded-full bg-rose-500 px-1.5 py-0.5 text-[10px] text-white hover:bg-rose-400"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    {editNewImages.map((file, i) => (
                      <div key={`new-${i}`} className="relative">
                        <img src={URL.createObjectURL(file)} alt="" className="h-14 w-14 rounded object-cover border border-white/10" />
                        <button
                          type="button"
                          onClick={() => removeEditNewImage(i)}
                          className="absolute -right-1 -top-1 rounded-full bg-rose-500 px-1.5 py-0.5 text-[10px] text-white hover:bg-rose-400"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  {(editExistingImages.length + editNewImages.length) < 10 && (
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleEditNewImages}
                      className="w-full rounded-md border border-white/15 bg-black/70 px-3 py-2 text-white outline-none focus:border-[#22d3ee] file:mr-2 file:rounded file:border-0 file:bg-[#f97316] file:px-3 file:py-1 file:text-xs file:font-semibold file:text-black"
                    />
                  )}
                  <p className="mt-1 text-[10px] text-white/50">
                    {editExistingImages.length + editNewImages.length} / 10 images
                  </p>
                </div>
                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={closeEdit}
                    className="rounded-full border border-white/20 px-4 py-2 text-[11px] font-semibold text-white/80 hover:bg-white/5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={editSubmitting}
                    className="rounded-full bg-[#22d3ee] px-4 py-2 text-[11px] font-semibold text-black hover:bg-[#22d3ee]/90 disabled:opacity-60"
                  >
                    {editSubmitting ? "Saving…" : "Save changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default AdminProductsPage;
