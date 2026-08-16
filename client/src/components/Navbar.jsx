import { Link, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import profile from '../assets/profile.png';
import {  FiShoppingCart,  FiHome, FiPackage, FiLogIn, FiUserPlus,FiClipboard,FiInfo,FiPhone,FiUser,FiSettings,
  FiLogOut, FiGrid, FiHeart, FiChevronRight} from "react-icons/fi";

function Navbar({ menuOpen, setMenuOpen }) {
  const { token, logout, user } = useContext(AuthContext);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const linkClass = (path) => {
    const isActive = location.pathname === path;
    return `
      relative flex items-center h-full transition-all duration-300 
      ${isActive ? 'text-white' : 'text-white/70 hover:text-white'}
      after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-white 
      after:transition-all after:duration-300 
      ${isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'}
      px-3 py-2 rounded-lg hover:bg-white/10
    `;
  };

  const mobileLinkClass = (path) => {
    const isActive = location.pathname === path;
    return `
      flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
      ${isActive 
        ? 'bg-white/20 text-white' 
        : 'text-white/70 hover:text-white hover:bg-white/10'
      }
    `;
  };

const navItems = [
  { path: '/', label: 'Home', icon: FiHome },
  { path: '/product', label: 'Products', icon: FiPackage },
  { path: '/cart', label: 'Cart', icon: FiShoppingCart },
  { path: '/orders', label: 'Orders', icon: FiClipboard },
  { path: '/wishlist', label: 'Wishlist', icon: FiHeart },
];

  return (
    <>
      <nav className={`
        hidden md:flex bg-blue-950 text-white 
        items-center justify-between h-16 px-6 lg:px-13  shadow-lg
        transition-all duration-300
        ${scrolled ? 'shadow-2xl backdrop-blur-md bg-opacity-95' : ''}
      `}>
        <div className="flex gap-1 items-center h-full">
          {navItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className={linkClass(item.path)}
            >
              <item.icon className="w-4 h-4 mr-2" />
              {item.label}
            </Link>
          ))}

          {!token ? (
            <>
              <Link to="/login" className={linkClass('/login')}>
                <FiLogIn className="w-4 h-4 mr-2" />
                Login
              </Link>
              <Link to="/register" className={linkClass('/register')}>
                <FiUserPlus className="w-4 h-4 mr-2" />
                Register
              </Link>
            </>
          ) : (
            <>
              <Link to="/about" className={linkClass('/about')}>
                <FiInfo className="w-4 h-4 mr-2" />
                About
              </Link>
              <Link to="/contact" className={linkClass('/contact')}>
                <FiPhone className="w-4 h-4 mr-2" />
                Contact
              </Link>
            </>
          )}
        </div>

        {token && (
   
            <button 
              onClick={logout} 
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 hover:scale-105"
            >
              <FiLogOut className="w-4 h-4" />
              Logout
            </button>
      
        )}
      </nav>

      <div className={`
        md:hidden fixed inset-y-0 left-0 z-50 w-80 
        bg-gradient-to-b from-violet-900 to-indigo-900 text-white
        transform transition-transform duration-300 ease-in-out
        ${menuOpen ? 'translate-x-0' : '-translate-x-full'}
        shadow-2xl overflow-y-auto
      `}>
        <div className="flex items-center justify-between p-4 border-b border-white/10 sticky top-0 bg-gradient-to-b from-violet-900 to-indigo-900 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 flex items-center justify-center">
              {token ? (
                <img 
                  src={user?.profileImage || profile} 
                  alt="Profile" 
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <FiUser className="w-5 h-5" />
              )}
            </div>
            <div>
              <p className="font-semibold">
                {token ? user?.firstName || 'User' : 'Guest'}
              </p>
              <p className="text-xs text-white/60">
                {token ? 'Online' : 'Please login'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setMenuOpen(false)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 space-y-1">
          <p className="text-xs font-semibold text-white/40 uppercase tracking-wider px-4 py-2">
            Main Menu
          </p>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className={mobileLinkClass(item.path)}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
              {location.pathname === item.path && (
                <FiChevronRight className="w-4 h-4 ml-auto text-white/40" />
              )}
            </Link>
          ))}

          {!token ? (
            <>
              <div className="my-4 border-t border-white/10"></div>
              <p className="text-xs font-semibold text-white/40 uppercase tracking-wider px-4 py-2">
                Account
              </p>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className={mobileLinkClass('/login')}
              >
                <FiLogIn className="w-5 h-5" />
                <span>Login</span>
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className={mobileLinkClass('/register')}
              >
                <FiUserPlus className="w-5 h-5" />
                <span>Register</span>
              </Link>
            </>
          ) : (
            <>
              <div className="my-4 border-t border-white/10"></div>
              <p className="text-xs font-semibold text-white/40 uppercase tracking-wider px-4 py-2">
                More
              </p>
              <Link
                to="/about"
                onClick={() => setMenuOpen(false)}
                className={mobileLinkClass('/about')}
              >
                <FiInfo className="w-5 h-5" />
                <span>About Us</span>
              </Link>
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className={mobileLinkClass('/contact')}
              >
                <FiPhone className="w-5 h-5" />
                <span>Contact Us</span>
              </Link>

              <div className="my-4 border-t border-white/10"></div>
              <p className="text-xs font-semibold text-white/40 uppercase tracking-wider px-4 py-2">
                Profile
              </p>
              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className={mobileLinkClass('/profile')}
              >
                <FiUser className="w-5 h-5" />
                <span>My Profile</span>
              </Link>
              <Link
                to="/settings"
                onClick={() => setMenuOpen(false)}
                className={mobileLinkClass('/settings')}
              >
                <FiSettings className="w-5 h-5" />
                <span>Settings</span>
              </Link>
              <Link
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
                className={mobileLinkClass('/dashboard')}
              >
                <FiGrid className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>

              <div className="mt-6 p-4">
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-200 rounded-xl transition-all duration-200"
                >
                  <FiLogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </>
          )}
        </div>

        <div className="p-4 text-center text-xs text-white/30 border-t border-white/10 mt-auto">
          <p>© 2024 BuyNest. All rights reserved.</p>
        </div>
      </div>

      <div 
        className={`
          md:hidden fixed inset-0 bg-black/50 z-40
          transition-opacity duration-300
          ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        onClick={() => setMenuOpen(false)}
      />
    </>
  );
}

export default Navbar;