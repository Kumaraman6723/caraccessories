import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { useAdmin } from "../../contexts/AdminContext.jsx";

function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const navigate = useNavigate();
  const { isAdmin, user, login, logout } = useAdmin();

  const links = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/collections", label: "Collections" },
    { to: "/about", label: "About" },
  ];

  if (isAdmin) {
    links.push({ to: "/admin", label: "Admin" });
  }

  const handleGoogleSuccess = async (credentialResponse) => {
    setAuthLoading(true);
    const { ok, isAdmin: adminFlag, user: loggedUser } = await login(credentialResponse);
    setAuthLoading(false);
    if (!ok) {
      toast.error("Google Sign-In failed. Please try again.");
      return;
    }
    if (adminFlag) {
      toast.success("Admin logged in");
      navigate("/admin");
    } else {
      toast.success(`Signed in as ${loggedUser?.email || "customer"}`);
    }
  };

  const handleGoogleError = () => {
    toast.error("Google Sign-In failed. Please try again.");
  };

  return (
    <>
      <nav className="sticky top-0 z-40 border-b border-white/10 bg-black/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 gap-4">
          <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#f97316] via-[#ef4444] to-[#22d3ee] ring-2 ring-[#22d3ee]/70 ring-offset-2 ring-offset-black shadow-[0_0_25px_rgba(248,113,113,0.65)]">
              <span className="text-xs font-extrabold tracking-widest text-white">BA</span>
              <span className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_0,#ffffff40,transparent_55%)] mix-blend-screen" />
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-semibold tracking-[0.25em] text-[#f97316]">BANTY</p>
              <p className="text-[11px] text-white/70">Car Accessories</p>
            </div>
          </Link>

          <div className="hidden gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-white/80 shadow-sm backdrop-blur lg:flex">
            {links.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-full px-3 py-1 transition hover:bg-white/5 hover:text-[#f97316] ${
                    isActive ? "bg-white/5 text-[#f97316]" : ""
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop: Google sign-in OR signed-in user + logout */}
          <div className="hidden lg:flex items-center">
            {!user ? (
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                useOneTap={false}
                size="medium"
                theme="outline"
                text="signin_with"
                shape="pill"
                width="190"
                disabled={authLoading}
              />
            ) : (
              <div className="flex items-center gap-3">
                <span className="max-w-[160px] truncate text-xs text-white/80" title={user.email}>
                  {user.name || user.email}
                </span>
                <button
                  type="button"
                  onClick={logout}
                  className="rounded-full border border-white/20 px-3 py-1.5 text-[11px] font-semibold text-white/80 transition hover:border-[#f97316] hover:text-[#f97316]"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 text-xs sm:text-sm lg:hidden">
            <Link
              to="/shop"
              className="rounded-full bg-gradient-to-r from-[#f97316] via-[#ef4444] to-[#22d3ee] px-4 py-2 font-semibold text-black shadow-lg shadow-black/60 transition hover:-translate-y-0.5 hover:brightness-110"
            >
              Shop Now
            </Link>
            <button
              type="button"
              className={`relative flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border transition-all ${
                isMobileMenuOpen ? "border-[#f97316] bg-white/5" : "border-white/20 hover:border-[#f97316]"
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              <span className={`h-0.5 w-5 rounded-full bg-current transition-all ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`h-0.5 w-5 rounded-full bg-current transition-all ${isMobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`h-0.5 w-5 rounded-full bg-current transition-all ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          type="button"
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close navigation menu"
        />
        <div
          className={`absolute right-0 top-0 h-full w-80 max-w-[85vw] flex flex-col bg-gradient-to-b from-[#031D33] to-[#031D33]/98 shadow-2xl border-l border-white/10 backdrop-blur-xl transition-transform duration-300 ease-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 transition-opacity hover:opacity-80">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#f97316] via-[#ef4444] to-[#22d3ee] ring-2 ring-[#22d3ee]/70 ring-offset-2 ring-offset-black shadow-[0_0_25px_rgba(248,113,113,0.65)]">
                <span className="text-sm font-extrabold tracking-[0.25em] text-white">BA</span>
                <span className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_0,#ffffff40,transparent_55%)] mix-blend-screen" />
              </div>
              <div>
                <p className="text-xs font-semibold tracking-[0.25em] text-[#f97316]">BANTY</p>
                <p className="text-[11px] text-white/70">Car Accessories</p>
              </div>
            </Link>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition-all hover:border-[#f97316] hover:bg-white/5 hover:text-[#f97316]"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close navigation menu"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 py-6">
            <div className="space-y-2">
              {links.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="group flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium text-white/90 transition-all hover:bg-gradient-to-r hover:from-[#0A4FFF]/20 hover:to-transparent hover:text-[#F5C242] hover:pl-5 border border-transparent hover:border-[#0A4FFF]/30"
                >
                  <span className="flex-1">{item.label}</span>
                  <svg className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </nav>

          <div className="border-t border-white/10 p-6 space-y-4">
            {user ? (
              <div className="rounded-xl border border-white/10 bg-black/60 p-4">
                <p className="text-[11px] text-white/50 mb-1">Signed in as</p>
                <p className="text-xs font-semibold text-white truncate" title={user.email}>{user.email}</p>
                <button
                  type="button"
                  onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                  className="mt-2 w-full rounded-full border border-white/20 py-2 text-[11px] font-semibold text-white/80"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={(r) => { handleGoogleSuccess(r); setIsMobileMenuOpen(false); }}
                  onError={handleGoogleError}
                  useOneTap={false}
                  size="medium"
                  theme="outline"
                  text="signin_with"
                  shape="pill"
                  width="260"
                  disabled={authLoading}
                />
              </div>
            )}
            <div className="rounded-xl bg-gradient-to-r from-[#0f172a] via-black to-[#0f172a] p-4 border border-white/10 shadow-[0_0_30px_rgba(8,47,73,0.8)]">
              <p className="text-xs font-semibold text-[#f97316] mb-1 tracking-[0.25em] uppercase">Banty Picks</p>
              <p className="text-[11px] text-white/60 leading-relaxed">
                Build your dream setup with performance, aero and detail-perfect accessories.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
