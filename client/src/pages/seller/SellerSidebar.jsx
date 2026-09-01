
import { Link, NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  BarChart3, 
  Settings,
  LogOut,
  ChevronDown,
  Store,
  User,
  Bell
} from "lucide-react";
import { useState, useEffect } from "react";
import API from "../../services/api";

function SellerSidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/seller/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/notifications", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotifications(res.data);
      } catch (err) {
        console.log(err.response?.data);
      }
    };

    fetchUser();
    fetchNotifications();

    const interval = setInterval(fetchNotifications, 10000);
    return () => clearInterval(interval);
  }, []);

  const getInitials = (first, last) =>
    `${first?.[0] || ""}${last?.[0] || ""}`.toUpperCase();

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const linkClass = ({ isActive }) =>
    isActive
      ? "flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-900 text-white shadow-lg shadow-gray-900/20 transition-all duration-200 group"
      : "flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 group";

  const iconClass = ({ isActive }) =>
    isActive
      ? "w-5 h-5 text-white"
      : "w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors";

  const navItems = [
    { to: "/seller", end: true, icon: LayoutDashboard, label: "Dashboard" },
    { to: "/seller/products", icon: Package, label: "Products" },
    { to: "/seller/orders", icon: ShoppingBag, label: "Orders" },
    { to: "/seller/analytics", icon: BarChart3, label: "Analytics" },
  ];

  return (
    <div className={`
      relative flex flex-col h-screen bg-white border-r border-gray-200 
      transition-all duration-300 ${isExpanded ? 'w-64' : 'w-20'}
      shadow-sm
    `}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-3 top-20 bg-white border border-gray-200 rounded-full p-1.5 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110 z-10"
      >
        <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${isExpanded ? 'rotate-0' : 'rotate-180'}`} />
      </button>

      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-6 border-b border-gray-100">
        <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center shadow-lg shadow-gray-900/20 flex-shrink-0">
          <Store className="w-5 h-5 text-white" />
        </div>
        {isExpanded && (
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-gray-900 truncate">
              Seller Panel
            </h2>
            <p className="text-xs text-gray-500 truncate">Manage your store</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={linkClass}
              title={!isExpanded ? item.label : ''}
            >
              {({ isActive }) => (
                <>
                  <item.icon className={iconClass({ isActive })} />
                  {isExpanded && (
                    <span className="font-medium text-sm truncate">
                      {item.label}
                    </span>
                  )}
                  {isActive && isExpanded && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-100" />

        {/* Bottom section */}
        <div className="space-y-1">
          <button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 group"
            title={!isExpanded ? 'Settings' : ''}
          >
            <Settings className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
            {isExpanded && (
              <span className="font-medium text-sm">Settings</span>
            )}
          </button>
          <button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 group"
            title={!isExpanded ? 'Logout' : ''}
          >
            <LogOut className="w-5 h-5 text-red-400 group-hover:text-red-600 transition-colors" />
            {isExpanded && (
              <span className="font-medium text-sm">Logout</span>
            )}
          </button>
        </div>
      </nav>

      {/* User Profile */}
      <div className="border-t border-gray-100 p-4">
        <button
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className="w-full flex items-center gap-3 hover:bg-gray-50 rounded-xl p-2 transition-colors group"
        >
          <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-md shadow-gray-900/20">
            {user && getInitials(user.firstName, user.lastName)}
          </div>
          {isExpanded && (
            <div className="flex-1 text-left min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.email || 'seller@example.com'}
              </p>
            </div>
          )}
          {isExpanded && (
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${showProfileMenu ? 'rotate-180' : ''}`} />
          )}
        </button>

        {/* Profile dropdown menu */}
        {isExpanded && showProfileMenu && (
          <div className="mt-2 py-1 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
             <Link
            to="/profile" >
            <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors text-left rounded-t-xl">
              My Profile
            </button></Link>
            <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors text-left">
              Store Settings
            </button>
            <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors text-left rounded-b-xl">
              Help & Support
            </button>
          </div>
        )}
      </div>

      {/* Notification Bell */}
      {isExpanded && (
        <div className="absolute top-4 right-4">
          <button 
            className="relative p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="w-5 h-5 text-gray-400" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 animate-pulse shadow-lg shadow-red-500/25">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <div>
                  <h2 className="font-bold text-gray-900 text-sm">
                    Notifications
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up!'}
                  </p>
                </div>
                {unreadCount > 0 && (
                  <button className="text-xs text-gray-900 hover:text-gray-700 font-medium px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-64 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 px-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                      <Bell className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-sm font-medium">
                      No notifications
                    </p>
                  </div>
                ) : (
                  notifications.slice(0, 5).map((notification) => (
                    <div
                      key={notification._id}
                      className={`
                        px-4 py-3 border-b border-gray-50 cursor-pointer 
                        transition-colors hover:bg-gray-50
                        ${!notification.isRead ? 'bg-gray-100/70 border-l-4 border-l-gray-900' : ''}
                      `}
                    >
                      <div className="flex items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm ${!notification.isRead ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(notification.createdAt).toLocaleString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        {!notification.isRead && (
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-900 flex-shrink-0 mt-1.5" />
                        )}
                      </div>
                    </div>
                  ))
                )}
                {notifications.length > 5 && (
                  <button className="w-full px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 transition-colors font-medium">
                    View all notifications
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SellerSidebar;

