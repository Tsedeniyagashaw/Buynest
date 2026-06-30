import { useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div class="mx-0 lg:mx-10  ">
        <Header
        onMenuToggle={() => setMenuOpen(prev => !prev)}
        menuOpen={menuOpen}
      />
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Outlet />
    </div>
  );
}

export default Layout;