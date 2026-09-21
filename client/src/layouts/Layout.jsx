import { useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="mx-0 flex flex-col min-h-screen">
      <Header
        onMenuToggle={() => setMenuOpen(prev => !prev)}
        menuOpen={menuOpen}/>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;