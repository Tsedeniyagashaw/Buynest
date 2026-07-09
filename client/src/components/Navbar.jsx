import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import profile from '../assets/profile.png'
import { 
  FiShoppingCart, 
  FiHome, 
  FiPackage, 
  FiUser, 
  FiLogOut, 
  FiSettings,
  FiGrid,
  FiList,
  FiBarChart2,
  FiChevronDown,
  FiUserCheck
} from "react-icons/fi";

function Navbar({ menuOpen, setMenuOpen }) {
  const { token, logout, user } = useContext(AuthContext);
  const [scrolled, setScrolled] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const linkClass = 
    "relative flex items-center h-full transition-colors duration-300 " +
    "after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-white " +
    "after:transition-all after:duration-300 hover:after:w-full";

  const mobileLinkClass = 
    "flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-200 text-white/80 hover:text-white";

  const getInitials = (first, last) =>
    `${first?.[0] || ""}${last?.[0] || ""}`.toUpperCase();

  return (
    <>
      {/* Desktop Navbar */}
      <nav className={`
        hidden md:flex bg-gradient-to-r from-violet-800 to-indigo-800 text-white items-center justify-between 
        px-6 h-16 shadow-lg transition-all duration-300
        ${scrolled ? 'shadow-xl' : ''}
      `}>
        <div className="flex gap-1 items-center h-full">
          <Link to="/" className={linkClass}>
            <FiHome className="mr-1.5 text-lg" />
            Home
          </Link>  
          <Link to="/product" className={linkClass}>
            <FiPackage className="mr-1.5 text-lg" />
            Products
          </Link>

          {!token ? (
            <>
              <Link to="/login" className={linkClass}>Login</Link>
              <Link to="/register" className={linkClass}>Register</Link>
            </>
          ) : (
            <>
              <Link to="/cart" className={linkClass}>
                <FiShoppingCart className="mr-1.5 text-lg" />
                Cart
              </Link>
              <Link to="/orders" className={linkClass}>
                <FiList className="mr-1.5 text-lg" />
                Orders
              </Link>
              
              {/* Seller Links with Dropdown */}
              <div className="relative group h-full flex items-center">
                <button className="flex items-center gap-1 h-full hover:text-white/80 transition-colors">
                  <FiGrid className="text-lg" />
                  <span>Seller</span>
                  <FiChevronDown className="text-sm" />
                </button>
                <div className="absolute top-full left-0 mt-0 w-48 bg-white rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 border border-gray-100">
                  <Link to="/seller-dashboard" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-violet-50 hover:text-violet-600 transition-colors">
                    <FiBarChart2 className="text-violet-500" />
                    Dashboard
                  </Link>
                  <Link to="/seller-orders" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-violet-50 hover:text-violet-600 transition-colors">
                    <FiList className="text-violet-500" />
                    Orders
                  </Link>
                  <Link to="/seller/products" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-violet-50 hover:text-violet-600 transition-colors">
                    <FiPackage className="text-violet-500" />
                    Products
                  </Link>
                  <Link to="/seller/analytics" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-violet-50 hover:text-violet-600 transition-colors">
                    <FiBarChart2 className="text-violet-500" />
                    Analytics
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>

        {token && (
          <div className="flex items-center gap-4">
            {/* Profile with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center gap-3 hover:bg-white/10 rounded-full px-3 py-1.5 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-semibold text-sm">
                  {user ? getInitials(user.firstName, user.lastName) : 'U'}
                </div>
                <FiChevronDown className={`text-sm transition-transform duration-200 ${showProfileDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                    <p className="font-semibold text-gray-900">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {user?.email || 'user@example.com'}
                    </p>
                  </div>
                  <div className="py-1">
                    <Link to="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <FiUser className="text-gray-400" />
                      My Profile
                    </Link>
                    <Link to="/settings" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <FiSettings className="text-gray-400" />
                      Settings
                    </Link>
                  </div>
                  <div className="border-t border-gray-100 py-1">
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <FiLogOut className="text-red-400" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Navbar */}
      <div className={`
        md:hidden fixed inset-0 bg-gradient-to-b from-violet-900 to-indigo-900 text-white 
        overflow-y-auto transition-all duration-300 z-40
        ${menuOpen ? "translate-x-0" : "translate-x-full"}
      `}>
        <div className="flex flex-col px-6 py-4">
          {/* User Info at top */}
          {token && user && (
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
                {getInitials(user.firstName, user.lastName)}
              </div>
              <div>
                <p className="font-semibold text-lg">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-sm text-white/60">
                  {user.email}
                </p>
              </div>
            </div>
          )}

          {/* Main Links */}
          <div className="space-y-1">
            <Link onClick={() => setMenuOpen(false)} className={mobileLinkClass} to="/">
              <FiHome className="text-xl" />
              Home
            </Link>
            
            <Link onClick={() => setMenuOpen(false)} className={mobileLinkClass} to="/product">
              <FiPackage className="text-xl" />
              Products
            </Link>

            {!token ? (
              <>
                <Link onClick={() => setMenuOpen(false)} className={mobileLinkClass} to="/login">
                  <FiUser className="text-xl" />
                  Login
                </Link>
                <Link onClick={() => setMenuOpen(false)} className={mobileLinkClass} to="/register">
                  <FiUserCheck className="text-xl" />
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link onClick={() => setMenuOpen(false)} className={mobileLinkClass} to="/cart">
                  <FiShoppingCart className="text-xl" />
                  My Cart
                </Link>
                <Link onClick={() => setMenuOpen(false)} className={mobileLinkClass} to="/orders">
                  <FiList className="text-xl" />
                  My Orders
                </Link>

                {/* Seller Section */}
                <div className="mt-2">
                  <p className="text-xs font-semibold text-white/40 uppercase tracking-wider px-4 py-2">
                    Seller Panel
                  </p>
                  <Link onClick={() => setMenuOpen(false)} className={mobileLinkClass} to="/seller-dashboard">
                    <FiBarChart2 className="text-xl" />
                    Dashboard
                  </Link>
                  <Link onClick={() => setMenuOpen(false)} className={mobileLinkClass} to="/seller-orders">
                    <FiList className="text-xl" />
                    Orders
                  </Link>
                  <Link onClick={() => setMenuOpen(false)} className={mobileLinkClass} to="/seller/products">
                    <FiPackage className="text-xl" />
                    Products
                  </Link>
                  <Link onClick={() => setMenuOpen(false)} className={mobileLinkClass} to="/seller/analytics">
                    <FiBarChart2 className="text-xl" />
                    Analytics
                  </Link>
                </div>

                {/* Settings & Logout */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <Link onClick={() => setMenuOpen(false)} className={mobileLinkClass} to="/profile">
                    <FiSettings className="text-xl" />
                    Settings
                  </Link>
                  
                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-300 hover:bg-red-500/20 hover:text-red-200 transition-all duration-200"
                  >
                    <FiLogOut className="text-xl" />
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="mt-auto pt-6 text-center text-white/40 text-xs">
            <p>© 2024 BuyNest. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;