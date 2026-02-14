import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "./layouts/MainLayout";
import HomeSectionPage from "./pages/Landing/HomeSectionPage";
import ContactPage from "./pages/Landing/ContactPage";
import ShopPage from "./pages/Store/ShopPage.jsx";
import ProductPage from "./pages/Store/ProductPage.jsx";
import AboutPage from "./pages/Store/AboutPage.jsx";
import CollectionsPage from "./pages/Store/CollectionsPage.jsx";
import DealsPage from "./pages/Store/DealsPage.jsx";
import GarageBuildsPage from "./pages/Store/GarageBuildsPage.jsx";
import NotFoundPage from "./pages/Store/NotFoundPage.jsx";
import AdminLoginPage from "./pages/Admin/AdminLoginPage.jsx";
import AdminDashboardPage from "./pages/Admin/AdminDashboardPage.jsx";
import AdminProductsPage from "./pages/Admin/AdminProductsPage.jsx";
import AdminOrdersPage from "./pages/Admin/AdminOrdersPage.jsx";
import AdminRoute from "./Components/PrivateRoute/AdminRoute.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomeSectionPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/deals" element={<DealsPage />} />
          <Route path="/garage-builds" element={<GarageBuildsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route element={<AdminRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/products" element={<AdminProductsPage />} />
            <Route path="/admin/enquiries" element={<AdminOrdersPage />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
}

export default App;
