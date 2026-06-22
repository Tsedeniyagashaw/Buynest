import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import profile from '../assets/profile.png'
import {   FiShoppingCart } from "react-icons/fi";



function Navbar({ menuOpen, setMenuOpen }) {
  const { token, logout } = useContext(AuthContext);



const linkClass =
  "relative flex items-center h-full transition-colors duration-300 " +
  "after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-white " +
  "after:transition-all after:duration-300 hover:after:w-full";

  return (
    <>

      <nav className="hidden md:flex bg-violet-900 text-white items-center justify-between h-16 px-6">
        <div className="flex gap-6 items-center h-full">
          <Link to="/" className={linkClass}>Home</Link>

          {!token ? (
            <>
              <Link to="/login" className={linkClass}>Login</Link>
              <Link to="/register" className={linkClass}>Register</Link>
            </>
          ) : (
            <>
              <Link to="/product" className={linkClass}>Products</Link>
              <Link to="/cart" className={linkClass}>Cart</Link>
              <Link to="/orders" className={linkClass}>Orders</Link>
              <Link to="/seller-orders" className={linkClass}>Dashboard</Link>
            </>
          )}
        </div>

        {token && (
          <button onClick={logout} className="px-4 py-2 border rounded">
            Logout
          </button>
        )}
      </nav>

    
    <div
  className={`md:hidden  bg-violet-900 text-white overflow-hidden transition-all duration-300
  ${menuOpen ? "h-screen py-5" : "max-h-0 py-0"}`}
>
  <div className="flex flex-col px-6">

    <Link onClick={() => setMenuOpen(false)} className="py-2" to="/">
      Home
    </Link>

    {!token ? (
      <>
        <Link onClick={() => setMenuOpen(false)} className="py-2" to="/login">
          Login
        </Link>
        <Link onClick={() => setMenuOpen(false)} className="py-2 " to="/register">
          Register
        </Link>
      </>
    ) : (
      <>
        <Link onClick={() => setMenuOpen(false)} className="py-2" to="/product">
          Products
        </Link>

        <Link onClick={() => setMenuOpen(false)} className="py-2" to="/cart">
          Cart
        </Link>

        <Link onClick={() => setMenuOpen(false)} className="py-2" to="/orders">
          Orders
        </Link>

        <Link onClick={() => setMenuOpen(false)} className="py-2" to="/seller-dashboard">
          Dashboard
        </Link>

        <Link onClick={() => setMenuOpen(false)} className="py-2" to="/seller-orders">
          Seller Orders
        </Link>

        <div className="mt-4 pt-4 px-3 border-t border-purple-200 flex flex-col gap-5">

          <Link onClick={() => setMenuOpen(false)} to="/profile" className="flex items-center gap-2">
             <img
                      src={profile}
                      alt="Profile"
                      className="h-9 w-9 object-cover border rounded-full"
                    /> 
                    My Profile
          </Link>

          <Link to="/cart" className="flex items-center gap-2">
             <FiShoppingCart className="text-2xl " /> My Cart
          </Link>


           <Link onClick={() => setMenuOpen(false)} to="/profile">
             Settings
          </Link>

       

           {token && (
          <button  onClick={() => {
              logout();
              setMenuOpen(false);
            }} onClick={logout} className="px-4 py-2 border rounded">
            Logout
          </button>
        )}
        </div>
      </>
    )}
  </div>
</div>
    </>
  );
}

export default Navbar;