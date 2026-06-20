import { useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Header
        onMenuToggle={() => setMenuOpen(prev => !prev)}
        menuOpen={menuOpen}
      />
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </>
  );
}

export default Layout;