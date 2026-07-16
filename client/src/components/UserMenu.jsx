import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  FiUser, 
  FiLock, 
  FiSettings, 
  FiLogOut, 
  FiChevronDown,
  FiShield,
  FiShoppingBag,
  FiHeart,
  FiGrid
} from "react-icons/fi";

function UserMenu({ user }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const getInitials = (first, last) => {
    return `${first?.[0] || ""}${last?.[0] || ""}`.toUpperCase();
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const basePath =
  user?.role === "admin"
    ? "/admin"
    : user?.role === "seller"
    ? "/seller"
    : "";

  if (!user) {
    return (
      <Link 
        to="/login"
        className="flex items-center gap-1.5 group focus:outline-none px-2 py-1 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <div className="w-9 h-9 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-semibold text-sm">
          <FiUser className="w-5 h-5" />
        </div>
        <span className="text-sm font-medium text-gray-700 hidden lg:inline">Login</span>
      </Link>
    );
  }

  return (
    <div className="relative inline-block" ref={menuRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 group focus:outline-none px-1 py-1 rounded-lg hover:bg-gray-50 transition-colors"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white flex items-center justify-center font-semibold text-xs sm:text-sm hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300 group-hover:scale-105">
          {getInitials(user?.firstName, user?.lastName)}
        </div>
        <div className="hidden lg:flex items-center gap-1">
          <span className="text-sm font-medium text-gray-700 max-w-[80px] truncate">
            {user?.firstName}
          </span>
          <FiChevronDown 
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
              open ? 'rotate-180' : ''
            }`} 
          />
        </div>
        <FiChevronDown 
          className={`lg:hidden w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-64 sm:w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden animate-slideDown">
          {/* User Info */}
          <div className="px-4 sm:px-5 py-3 sm:py-4 bg-gradient-to-r from-violet-50 to-indigo-50 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white flex items-center justify-center font-bold text-base sm:text-lg shadow-md flex-shrink-0">
                {getInitials(user?.firstName, user?.lastName)}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-gray-800 truncate text-sm sm:text-base">
                  {user?.firstName} {user?.lastName}
                </p>
                <div className="flex items-center gap-2">
                  <FiShield className="w-3 h-3 text-violet-600 flex-shrink-0" />
                  <p className="text-xs text-gray-500 capitalize truncate">
                    {user?.role || "User"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2 max-h-[calc(100vh-200px)] overflow-y-auto">
            <Link
              to={`${basePath}/profile`}
              className="flex items-center gap-3 px-4 sm:px-5 py-2.5 text-sm text-gray-700 hover:bg-violet-50 hover:text-violet-700 transition-colors duration-150"
              onClick={() => setOpen(false)}
            >
              <FiUser className="w-4 h-4 flex-shrink-0" />
              <span>My Profile</span>
            </Link>

            <Link
              to="/dashboard"
              className="flex items-center gap-3 px-4 sm:px-5 py-2.5 text-sm text-gray-700 hover:bg-violet-50 hover:text-violet-700 transition-colors duration-150"
              onClick={() => setOpen(false)}
            >
              <FiGrid className="w-4 h-4 flex-shrink-0" />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/orders"
              className="flex items-center gap-3 px-4 sm:px-5 py-2.5 text-sm text-gray-700 hover:bg-violet-50 hover:text-violet-700 transition-colors duration-150"
              onClick={() => setOpen(false)}
            >
              <FiShoppingBag className="w-4 h-4 flex-shrink-0" />
              <span>My Orders</span>
            </Link>

            <Link
              to="/wishlist"
              className="flex items-center gap-3 px-4 sm:px-5 py-2.5 text-sm text-gray-700 hover:bg-violet-50 hover:text-violet-700 transition-colors duration-150"
              onClick={() => setOpen(false)}
            >
              <FiHeart className="w-4 h-4 flex-shrink-0" />
              <span>Wishlist</span>
            </Link>

            <Link
              to={`${basePath}/change-password`}
              className="flex items-center gap-3 px-4 sm:px-5 py-2.5 text-sm text-gray-700 hover:bg-violet-50 hover:text-violet-700 transition-colors duration-150"
              onClick={() => setOpen(false)}
            >
              <FiLock className="w-4 h-4 flex-shrink-0" />
              <span>Change Password</span>
            </Link>

            <Link
              to="/settings"
              className="flex items-center gap-3 px-4 sm:px-5 py-2.5 text-sm text-gray-700 hover:bg-violet-50 hover:text-violet-700 transition-colors duration-150"
              onClick={() => setOpen(false)}
            >
              <FiSettings className="w-4 h-4 flex-shrink-0" />
              <span>Settings</span>
            </Link>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100"></div>

          {/* Logout */}
          <div className="py-1">
            <button
              onClick={() => {
                setOpen(false);
                logout();
              }}
              className="w-full flex items-center gap-3 px-4 sm:px-5 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
            >
              <FiLogOut className="w-4 h-4 flex-shrink-0" />
              <span>Logout</span>
            </button>
          </div>

          
        </div>
      )}
    </div>
  );
}

export default UserMenu;