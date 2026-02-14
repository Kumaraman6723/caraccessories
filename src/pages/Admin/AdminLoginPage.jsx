import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useAdmin } from "../../contexts/AdminContext.jsx";
import { toast } from "react-toastify";

function AdminLoginPage() {
  const { login } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const handleSuccess = async (credentialResponse) => {
    setLoading(true);
    const { ok, isAdmin } = await login(credentialResponse);
    setLoading(false);
    if (!ok) {
      toast.error("Google Sign-In failed. Please try again.");
      return;
    }
    if (!isAdmin) {
      toast.error("This Google account is not an admin. Use the admin email to access the dashboard.");
      return;
    }
    toast.success("Admin logged in");
    const redirectTo = location.state?.from?.pathname || "/admin";
    navigate(redirectTo, { replace: true });
  };

  const handleError = () => {
    toast.error("Google Sign-In failed. Please try again.");
  };

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-black/70 p-6 text-sm text-white/80 shadow-[0_22px_60px_rgba(0,0,0,0.95)]">
        <p className="text-[11px] font-semibold tracking-[0.3em] text-[#f97316] uppercase">
          Admin
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">
          Banty admin login
        </h1>
        <p className="mt-2 text-xs text-white/60">
          Sign in with your admin Google account to manage products and enquiries.
        </p>

        <div className="mt-6 flex flex-col items-center gap-4">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
            useOneTap={false}
            theme="filled_black"
            size="large"
            text="continue_with"
            shape="pill"
            width="320"
            disabled={loading}
          />
          {loading && (
            <p className="text-xs text-white/50">Verifying…</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default AdminLoginPage;
