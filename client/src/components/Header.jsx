import logo from "../assets/logo.png";
import logosm from "../assets/logosm.png";
import { FiSearch, FiShoppingCart, FiUser, FiHeart, FiMenu, FiX, FiHome } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import API from "../services/api";
import UserMenu from "./UserMenu";

function Header({ onMenuToggle, menuOpen }) {
  const [query, setQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const searchInputRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await API.get("/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (error) {
        console.log(error.response?.data);
      }
    };
    fetchUser();
  }, []);

  const fetchCartCount = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
        const totalItems = localCart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        setCartCount(totalItems);
        return;
      }

      const res = await API.get("/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const cartData = res.data;
      if (cartData && cartData.items) {
        const totalItems = cartData.items.reduce((sum, item) => sum + (item.quantity || 0), 0);
        setCartCount(totalItems);
      } else {
        setCartCount(0);
      }
    } catch (error) {
      console.log("Error fetching cart:", error);
      const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const totalItems = localCart.reduce((sum, item) => sum + (item.quantity || 1), 0);
      setCartCount(totalItems);
    }
  };

  useEffect(() => {
    const handleAuthChange = (event) => {
      if (event.detail?.action === "logout") {
        setUser(null);
        setCartCount(0);
      } else if (event.detail?.action === "login") {
        const fetchUser = async () => {
          try {
            const token = localStorage.getItem("token");
            if (!token) {
              setUser(null);
              return;
            }

            const res = await API.get("/auth/profile", {
              headers: { Authorization: `Bearer ${token}` },
            });
            setUser(res.data);
          } catch (error) {
            console.log(error.response?.data);
          }
        };
        fetchUser();
      }
    };

    window.addEventListener("authChange", handleAuthChange);

    return () => {
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);
  useEffect(() => {
    fetchCartCount();

    const handleCartUpdate = () => {
      fetchCartCount();
    };

    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "token") {
        fetchCartCount();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (isMobileSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isMobileSearchOpen]);

  const handleSearch = (e) => {
    if (e.key === "Enter" && query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setIsMobileSearchOpen(false);
    }
  };

  const toggleMobileSearch = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen);
    document.body.style.overflow = isMobileSearchOpen ? "unset" : "hidden";
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm px-0  lg:px-10">
      {isMobileSearchOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-50 animate-slideDown">
          <div className="flex items-center gap-3 p-4">
            <button
              onClick={toggleMobileSearch}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close search"
            >
              <FiX className="w-6 h-6 text-gray-600" />
            </button>
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleSearch}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 outline-none text-sm"
                placeholder="Search products..."
                autoFocus
              />
            </div>
          </div>
          {query && (
            <div className="px-4 py-2">
              <div className="text-xs font-semibold text-gray-400 px-3 py-2">Suggestions</div>
              <button className="w-full text-left px-3 py-3 hover:bg-gray-50 rounded-lg transition-colors text-sm text-gray-700">
                Trending products
              </button>
              <button className="w-full text-left px-3 py-3 hover:bg-gray-50 rounded-lg transition-colors text-sm text-gray-700">
                Best sellers
              </button>
            </div>
          )}
        </div>
      )}

      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
          <Link to="/" className="hidden lg:flex items-center gap-2 flex-shrink-0">
            <img
              src={logo}
              alt="BuyNest"
              className="h-17 object-contain"
            />
          </Link>

          <Link to="/" className="lg:hidden flex items-center gap-2 flex-shrink-0">
            <img
              src={logosm}
              alt="BuyNest"
              className="h-8 sm:h-8 object-contain"
            />
          </Link>

          <div className="hidden md:flex flex-1 max-w-2xl mx-4 lg:mx-8 relative">
            <div
              className={`
              relative flex items-center bg-gray-50 border rounded-xl transition-all duration-200 w-full
              ${
                isSearchFocused
                  ? "border-gray-900 ring-1 ring-gray-900/20 bg-white shadow-lg"
                  : "border-gray-200 hover:border-gray-300"
              }
            `}
            >
              <FiSearch
                className={`
                absolute left-4 text-lg transition-colors duration-200
                ${isSearchFocused ? "text-gray-900" : "text-gray-400"}
              `}
              />
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
                  onClick={() => setQuery("")}
                  className="absolute right-3 p-1 hover:bg-gray-200 rounded-full transition-colors"
                  aria-label="Clear search"
                >
                  <FiX className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>

            {isSearchFocused && query && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-slideDown">
                <div className="p-2">
                  <div className="text-xs font-semibold text-gray-400 px-3 py-2">Recent Searches</div>
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

          <div className="flex items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 flex-shrink-0">
            <button
              onClick={toggleMobileSearch}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-colors"
              aria-label="Search"
            >
              <FiSearch className="w-5 h-5" />
            </button>

            <Link
              to="/wishlist"
              className="hidden sm:flex flex-col items-center gap-0.5 text-gray-500 hover:text-gray-900 transition-colors group px-1 md:px-2"
              aria-label="Wishlist"
            >
              <FiHeart className="text-xl group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-medium hidden lg:block">Wishlist</span>
            </Link>

            <Link
              to="/cart"
              className="flex flex-col items-center gap-0.5 text-gray-500 hover:text-gray-900 transition-colors group px-1 md:px-2 relative"
            >
              <div className="relative">
                <FiShoppingCart className="text-xl sm:text-2xl group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-2 min-w-[18px] h-[18px] bg-red-700 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 shadow-lg">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium hidden lg:block">Cart</span>
            </Link>

            <div className="hidden sm:block px-1 md:px-2">
              <UserMenu user={user} />
            </div>

            <Link
              to="/profile"
              className="sm:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-colors"
              aria-label="Profile"
            >
              <FiUser className="w-5 h-5" />
            </Link>

            <button
              onClick={onMenuToggle}
              className="md:hidden flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <FiX className="text-xl sm:text-2xl text-gray-900" />
              ) : (
                <FiMenu className="text-xl sm:text-2xl text-gray-600" />
              )}
            </button>
          </div>
        </div>

        <div className="sm:hidden flex items-center justify-around px-2 py-1.5 border-t border-gray-100 mt-0.5">
          <Link
            to="/"
            className="flex flex-col items-center gap-0.5 text-xs text-gray-500 hover:text-gray-900 transition-colors"
          >
            <FiHome className="text-lg" />
            <span>Home</span>
          </Link>
          <Link
            to="/wishlist"
            className="flex flex-col items-center gap-0.5 text-xs text-gray-500 hover:text-gray-900 transition-colors"
          >
            <FiHeart className="text-lg" />
            <span>Wishlist</span>
          </Link>
          <Link
            to="/orders"
            className="flex flex-col items-center gap-0.5 text-xs text-gray-500 hover:text-gray-900 transition-colors"
          >
            <FiShoppingCart className="text-lg" />
            <span>Orders</span>
          </Link>
          <Link
            to="/profile"
            className="flex flex-col items-center gap-0.5 text-xs text-gray-500 hover:text-gray-900 transition-colors"
          >
            <FiUser className="text-lg" />
            <span>Profile</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
