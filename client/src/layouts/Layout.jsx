import { useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
        <Header
        onMenuToggle={() => setMenuOpen(prev => !prev)}
        menuOpen={menuOpen}
      />
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Outlet />
    </>
  );
}

export default Layout;