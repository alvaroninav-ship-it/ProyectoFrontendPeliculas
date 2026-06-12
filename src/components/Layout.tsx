import { Outlet } from "react-router-dom";


import Navbar from "./navbar";
import Footer from "./footer";

export default function Layout() {
  return (
    <>
       <Navbar />

      <div className="container">
        <main className="main">
          <Outlet />
        </main>

      </div>

      <Footer title="Movie Reviews" description="Proyecto de críticas y reseñas cinematográficas." />
    </>
  );
}