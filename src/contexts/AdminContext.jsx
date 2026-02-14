import React, { createContext, useContext, useEffect, useState } from "react";
import { API_BASE } from "../utils/api.js";

const AdminContext = createContext(null);

const ADMIN_STORAGE_KEY = "banty_admin_auth_v2";

export function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminCredential, setAdminCredential] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(ADMIN_STORAGE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      if (data && data.email && data.expiry && data.expiry > Date.now()) {
        setAdminCredential(data.idToken);
        setIsAdmin(!!data.isAdmin);
        setUser({ email: data.email, name: data.name, isAdmin: !!data.isAdmin });
      } else {
        window.localStorage.removeItem(ADMIN_STORAGE_KEY);
      }
    } catch {
      window.localStorage.removeItem(ADMIN_STORAGE_KEY);
    }
  }, []);

  const login = async (credentialResponse) => {
    const idToken = credentialResponse?.credential;
    if (!idToken) return { ok: false };

    const url = `${API_BASE}/api/auth/admin`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_token: idToken }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) return { ok: false };

      const isAdminFlag = !!data.user?.isAdmin;
      const email = data.user?.email;
      const name = data.user?.name;

      setAdminCredential(idToken);
      setIsAdmin(isAdminFlag);
      setUser({ email, name, isAdmin: isAdminFlag });

      const payload = parseJwt(idToken);
      const expiry = (payload.exp || 0) * 1000;
      window.localStorage.setItem(
        ADMIN_STORAGE_KEY,
        JSON.stringify({
          idToken,
          email,
          name,
          isAdmin: isAdminFlag,
          expiry: expiry - 60000,
        })
      );
      return { ok: true, isAdmin: isAdminFlag, user: { email, name, isAdmin: isAdminFlag } };
    } catch (err) {
      console.error("Admin login error:", err);
      return { ok: false };
    }
  };

  const logout = () => {
    setIsAdmin(false);
    setAdminCredential(null);
    setUser(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(ADMIN_STORAGE_KEY);
    }
  };

  const getAdminToken = () => adminCredential;

  const value = { isAdmin, user, login, logout, getAdminToken };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

function parseJwt(token) {
  try {
    const base64 = token.split(".")[1];
    return JSON.parse(atob(base64));
  } catch {
    return {};
  }
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}
