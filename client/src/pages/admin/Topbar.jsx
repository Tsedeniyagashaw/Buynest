import { useState } from "react";
import API from "../../services/api"
import { useEffect } from "react";
import { useSearch } from "../../context/SearchContext";
import { FiSearch } from "react-icons/fi";
import UserMenu from "../../components/UserMenu";
import { FiBell } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function Topbar() {
  const [admin, setAdmin] = useState(null);
  const { search, setSearch } = useSearch();
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  // Fetch user profile
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        
        const res = await API.get("/auth/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
      } catch (error) {
        console.log("Error fetching user:", error.response?.data);
      }
    };
    fetchUser();
  }, []);

  // Fetch admin profile
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        
        const res = await API.get("/admin/profile", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setAdmin(res.data);
      } catch (err) {
        console.log("Error fetching admin:", err);
      }
    };
    fetchAdmin();
  }, []);

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        
        const res = await API.get("/notifications", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        // Filter to get only unread notifications
        const unreadNotifications = res.data.filter(n => !n.read);
        setNotifications(unreadNotifications);
        setUnreadCount(unreadNotifications.length);
      } catch (error) {
        console.log("Error fetching notifications:", error.response?.data);
      }
    };

    fetchNotifications();

    // Set up polling for new notifications every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const handleNotificationClick = async (notification) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      // Mark notification as read
      await API.put(
        `/notifications/${notification._id}`,
        { read: true },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Remove from UI
      setNotifications(prev => 
        prev.filter(item => item._id !== notification._id)
      );
      setUnreadCount(prev => prev - 1);

      // Close notification dropdown
      setShowNotifications(false);

      // Navigate based on type
      if (notification.type === "feedback") {
        navigate("/admin/feedback");
      } else if (notification.type === "seller") {
        navigate("/admin/sellers");
      } else if (notification.type === "order") {
        navigate("/admin/orders");
      }

    } catch (error) {
      console.log("Error handling notification:", error.response?.data);
    }
  };

  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await API.put(
        "/notifications/mark-all-read",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setNotifications([]);
      setUnreadCount(0);
      setShowNotifications(false);
    } catch (error) {
      console.log("Error marking all as read:", error.response?.data);
    }
  };

  // Format time
  const formatTime = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return new Date(date).toLocaleDateString();
  };

  // Get notification icon
  const getNotificationIcon = (type) => {
    switch(type) {
      case "feedback": return "💬";
      case "seller": return "🏪";
      case "order": return "📦";
      default: return "🔔";
    }
  };

  return (
    <div className="h-20 bg-white shadow-sm flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <div className="text-xl font-semibold text-gray-800">
          Welcome back{admin?.firstName ? `, ${admin.firstName}` : ''}!
        </div>
        {admin?.role && (
          <span className="px-2 py-1 text-xs font-medium bg-violet-100 text-violet-700 rounded-full">
            {admin.role}
          </span>
        )}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative flex-1 min-w-[200px] max-w-xl">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                // Handle search submission if needed
              }
            }}
            className="w-full border border-gray-200 pl-10 pr-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-violet-300 focus:border-transparent transition-all"
            placeholder="Search..."
          />
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Notifications"
          >
            <FiBell size={22} className="text-gray-600" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium animate-pulse">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <>
              <div 
                className="fixed inset-0 z-40"
                onClick={() => setShowNotifications(false)}
              />
              <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-800">Notifications</h3>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-violet-600 hover:text-violet-700 font-medium transition-colors"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                {/* Notifications List */}
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-8 text-center">
                      <div className="text-4xl mb-2">🔔</div>
                      <p className="text-sm text-gray-500">No new notifications</p>
                      <p className="text-xs text-gray-400 mt-1">You're all caught up!</p>
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification._id}
                        onClick={() => handleNotificationClick(notification)}
                        className="p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors group"
                      >
                        <div className="flex items-start gap-3">
                          <div className="text-xl">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-800 group-hover:text-violet-600 transition-colors">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {formatTime(notification.createdAt)}
                            </p>
                          </div>
                          {!notification.read && (
                            <span className="w-2 h-2 bg-violet-500 rounded-full flex-shrink-0 mt-1" />
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer */}
                {notifications.length > 0 && (
                  <div className="p-2 border-t border-gray-100 bg-gray-50">
                    <button
                      onClick={() => {
                        setShowNotifications(false);
                        navigate("/admin/notifications");
                      }}
                      className="w-full text-center text-sm text-violet-600 hover:text-violet-700 font-medium py-2 transition-colors"
                    >
                      View all notifications
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* User Menu */}
        <UserMenu user={user} />
      </div>
    </div>
  );
}

export default Topbar;