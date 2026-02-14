import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAdmin } from "../../contexts/AdminContext.jsx";

function AdminRoute() {
  const { isAdmin } = useAdmin();
  const location = useLocation();

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export default AdminRoute;


