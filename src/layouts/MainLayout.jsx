import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar/NavBar";
import Footer from "../Components/Footer/Footer";

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col text-white bg-gradient-to-b from-black via-[#020617] to-black">
      <NavBar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;


