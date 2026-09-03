import { useState } from "react";
import API from "../../services/api";
import { useEffect } from "react";
import { useSearch } from "../../context/SearchContext";
import { FiSearch, FiBell, FiMessageSquare, FiShoppingBag } from "react-icons/fi";
import { FiCheckCircle } from "react-icons/fi";
import { Store, Bell, Package } from "lucide-react";
import UserMenu from "../../components/UserMenu";
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
          headers: { Authorization: `Bearer ${token}` },
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
            Authorization: `Bearer ${token}`,
          },
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
            Authorization: `Bearer ${token}`,
          },
        });

        // Filter to get only unread notifications
        const unreadNotifications = res.data.filter((n) => !n.read);

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
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Remove from UI
      setNotifications((prev) => prev.filter((item) => item._id !== notification._id));

      setUnreadCount((prev) => prev - 1);

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
            Authorization: `Bearer ${token}`,
          },
        },
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
    switch (type) {
      case "feedback":
        return <FiMessageSquare className="w-4 h-4" />;

      case "seller":
        return <Store className="w-4 h-4" />;

      case "order":
        return <Package className="w-4 h-4" />;

      default:
        return <FiBell className="w-4 h-4" />;
    }
  };

  return (
    <div className="h-30 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Left Section */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="min-w-0">
          <h1 className="text-lg font-semibold text-gray-900 truncate">
            Welcome back
            {admin?.firstName ? `, ${admin.firstName}` : ""}
          </h1>

          <p className="text-xs text-gray-500 mt-0.5 hidden sm:block">
            Here's what's happening with your platform today.
          </p>
        </div>

        {admin?.role && (
          <span className="hidden md:inline-flex items-center px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-md border border-gray-200">
            {admin.role}
          </span>
        )}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Search Bar */}
        <div className="relative w-52 md:w-64 lg:w-80">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                // Handle search submission if needed
              }
            }}
            className="
              w-full
              bg-gray-50
              border border-gray-200
              pl-10
              pr-4
              py-2.5
              rounded-lg
              text-sm
              text-gray-900
              placeholder:text-gray-400
              outline-none
              transition-all
              duration-200
              focus:bg-white
              focus:border-gray-400
              focus:ring-2
              focus:ring-gray-900/10
            "
            placeholder="Search..."
          />
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="
              relative
              p-2.5
              rounded-lg
              border
              border-transparent
              hover:border-gray-200
              hover:bg-gray-50
              transition-all
              duration-200
            "
            aria-label="Notifications"
          >
            <FiBell size={20} className="text-gray-600" />

            {unreadCount > 0 && (
              <span
                className="
                absolute
                -top-1
                -right-1
                min-w-[18px]
                h-[18px]
                px-1
                bg-red-500
                text-white
                text-[10px]
                rounded-full
                flex
                items-center
                justify-center
                font-bold
                border-2
                border-white
              "
              >
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <>
              {/* Overlay */}
              <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />

              {/* Dropdown */}
              <div
                className="
                absolute
                right-0
                mt-3
                w-80
                md:w-96
                bg-white
                rounded-xl
                shadow-xl
                border
                border-gray-200
                overflow-hidden
                z-50
              "
              >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>

                    <p className="text-xs text-gray-500 mt-0.5">
                      {unreadCount > 0
                        ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
                        : "You're all caught up"}
                    </p>
                  </div>

                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="
                        text-xs
                        text-gray-700
                        hover:text-gray-900
                        font-medium
                        px-2
                        py-1
                        rounded-md
                        hover:bg-gray-100
                        transition-colors
                      "
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                {/* Notifications List */}
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-10 text-center">
                      <div
                        className="
                        w-12
                        h-12
                        rounded-full
                        bg-gray-100
                        flex
                        items-center
                        justify-center
                        mb-3
                      "
                      >
                        <FiCheckCircle className="text-gray-500" size={22} />
                      </div>

                      <p className="text-sm font-medium text-gray-700">No new notifications</p>

                      <p className="text-xs text-gray-400 mt-1">You're all caught up!</p>
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification._id}
                        onClick={() => handleNotificationClick(notification)}
                        className="
                          px-4
                          py-3.5
                          border-b
                          border-gray-100
                          hover:bg-gray-50
                          cursor-pointer
                          transition-colors
                          group
                        "
                      >
                        <div className="flex items-start gap-3">
                          {/* Notification Icon */}
                          <div
                            className="
                            w-9
                            h-9
                            rounded-lg
                            bg-gray-100
                            text-gray-600
                            flex
                            items-center
                            justify-center
                            flex-shrink-0
                          "
                          >
                            {getNotificationIcon(notification.type)}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <p
                              className="
                              text-sm
                              text-gray-700
                              group-hover:text-gray-900
                              transition-colors
                              leading-5
                            "
                            >
                              {notification.message}
                            </p>

                            <p
                              className="
                              text-xs
                              text-gray-400
                              mt-1
                            "
                            >
                              {formatTime(notification.createdAt)}
                            </p>
                          </div>

                          {!notification.read && (
                            <span
                              className=" w-2 h-2 bg-gray-900 rounded-full  flex-shrink-0
                              mt-2"
                            />
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {notifications.length > 0 && (
                  <div
                    className="p-2
                    border-t
                    border-gray-100
                    bg-gray-50
                  "
                  >
                    <button
                      onClick={() => {
                        setShowNotifications(false);
                        navigate("/admin/notifications");
                      }}
                      className="
                        w-full
                        text-center
                        text-sm
                        text-gray-700
                        hover:text-gray-900
                        hover:bg-gray-100
                        font-medium
                        py-2
                        rounded-lg
                        transition-colors
                      "
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
