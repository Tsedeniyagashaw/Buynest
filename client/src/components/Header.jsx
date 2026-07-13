import logo from '../assets/logo.png'
import profile from '../assets/profile.png'
import { FiSearch, FiShoppingCart, FiUser, FiHeart, FiMenu, FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';
import API from "../services/api";

function Header({ onMenuToggle, menuOpen }) {
  const [query, setQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  const searchInputRef = useRef(null);
    const [user,setUser] = useState(null);

    useEffect(() => {

    // setCartCount(3);
    const fetchUser = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await API.get(
                "/auth/profile",
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            );

            setUser(res.data);

        }
        catch(error){

            console.log(error.response?.data);

        }

    };


    fetchUser();


}, []);



 const getInitials = (firstName, lastName) => {
    if (!firstName && !lastName) return "";
    return (
      (firstName?.[0] || "") +
      (lastName?.[0] || "")
    ).toUpperCase();
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSearchClick = () => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50  backdrop-blur-md ">
      <div className="flex items-center justify-between  h-20 mx-auto">

        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <img 
            src={logo} 
            alt="BuyNest" 
            className="h-8 md:h-9 object-contain hover:scale-105 transition-transform duration-200" 
          />
      
        </Link>

        {/* Search Bar */}
        <div className={`
          flex-1 max-w-2xl mx-4 md:mx-8 relative transition-all duration-200
          ${isSearchFocused ? 'scale-[1.02]' : ''}
        `}>
          <div className={`
            relative flex items-center bg-gray-50 border rounded-xl transition-all duration-200
            ${isSearchFocused 
              ? 'border-violet-400 ring-2 ring-violet-500/20 bg-white' 
              : 'border-gray-200 hover:border-gray-300'
            }
          `}>
            <FiSearch className={`
              absolute left-4 text-lg transition-colors duration-200
              ${isSearchFocused ? 'text-violet-600' : 'text-gray-400'}
            `} />
            <input
              ref={searchInputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearch}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="w-full bg-transparent pl-11 pr-4 py-2.5 outline-none text-sm placeholder-gray-400"
              placeholder="Search for products, brands, categories..."
              aria-label="Search"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 p-1 hover:bg-gray-200 rounded-full transition-colors"
                aria-label="Clear search"
              >
                <FiX className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>
          
          {/* Search Suggestions - Optional */}
          {isSearchFocused && query && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-2">
                <div className="text-xs font-semibold text-gray-400 px-3 py-2">
                  Recent Searches
                </div>
                <button className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors text-sm text-gray-700">
                  Trending products
                </button>
                <button className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors text-sm text-gray-700">
                  Best sellers
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 md:gap-5 flex-shrink-0">
          
          {/* Wishlist */}
          <button 
            className="hidden md:flex flex-col items-center gap-0.5 text-gray-500 hover:text-violet-600 transition-colors group relative"
            aria-label="Wishlist"
          >
            <FiHeart className="text-xl group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-medium">Wishlist</span>
          </button>

          {/* Cart */}
          <Link 
            to="/cart" 
            className="flex flex-col items-center gap-0.5 text-gray-500 hover:text-violet-600 transition-colors group relative"
          >
            <div className="relative">
              <FiShoppingCart className="text-2xl group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 min-w-[18px] h-[18px] bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 shadow-lg shadow-violet-500/25 animate-pulse">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </div>
            <span className="text-[10px] font-medium">Cart</span>
          </Link>

          {/* Profile */}
          <Link 
            to="/profile" 
            className="hidden md:flex flex-col items-center gap-0.5 text-gray-500 hover:text-violet-600 transition-colors group"
          >
          <div className="relative group">
  {/* Smaller Avatar */}
  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-violet-800 text-white flex items-center justify-center text-sm font-medium shadow-md ring-2 ring-violet-200/50 hover:ring-violet-300 transition-all duration-300 hover:scale-105">
    {getInitials(user?.firstName, user?.lastName)}
  </div>
  
  {/* Smaller Status Indicator */}
  <div className="absolute -bottom-0.5 -right-0.5">
    <div className="relative">
      <div className="w-2.5 h-2.5 bg-green-500 rounded-full border border-white shadow-sm"></div>
      <div className="absolute inset-0 w-2.5 h-2.5 bg-green-400 rounded-full blur-sm opacity-50 animate-ping"></div>
    </div>
  </div>
</div>
            <span className="text-[10px] font-medium">Account</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={onMenuToggle}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl hover:bg-gray-100 transition-colors relative"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <FiX className="text-2xl text-violet-600" />
            ) : (
              <FiMenu className="text-2xl text-gray-600" />
            )}
            {menuOpen && (
              <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-violet-600 to-indigo-600 text-white w-16 h-16 flex items-center justify-center rounded-tl-3xl shadow-lg">
                <FiX size={20} />
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Profile & Wishlist - Visible only on mobile */}
      <div className="md:hidden flex items-center justify-around px-4 py-2 bg-gray-50/50 border-t border-gray-100">
        <Link to="/profile" className="flex items-center gap-2 text-sm text-gray-600 hover:text-violet-600 transition-colors">
          <FiUser className="text-lg" />
          <span>Profile</span>
        </Link>
        <Link to="/wishlist" className="flex items-center gap-2 text-sm text-gray-600 hover:text-violet-600 transition-colors">
          <FiHeart className="text-lg" />
          <span>Wishlist</span>
        </Link>
        <Link to="/orders" className="flex items-center gap-2 text-sm text-gray-600 hover:text-violet-600 transition-colors">
          <FiShoppingCart className="text-lg" />
          <span>Orders</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;