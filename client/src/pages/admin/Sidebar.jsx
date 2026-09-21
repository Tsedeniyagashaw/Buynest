import { Link, NavLink } from "react-router-dom";
import { LayoutDashboard, Users, ShoppingBag, Package, Store, MessageSquare, ChevronDown, ShieldCheck, } from "lucide-react";
import { useState } from "react";

function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);

  const linkClass = ({ isActive }) =>
    isActive
      ? "flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-900 text-white shadow-lg shadow-gray-900/20 transition-all duration-200 group"
      : "flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 group";

  const iconClass = ({ isActive }) =>
    isActive
      ? "w-5 h-5 text-white"
      : "w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors";

  const navItems = [
    {
      to: "/admin",
      end: true,
      icon: LayoutDashboard,
      label: "Dashboard",
    },
    {
      to: "/admin/users",
      icon: Users,
      label: "Users",
    },
    {
      to: "/admin/orders",
      icon: ShoppingBag,
      label: "Orders",
    },
    {
      to: "/admin/products",
      icon: Package,
      label: "Products",
    },
    {
      to: "/admin/sellers",
      icon: Store,
      label: "Sellers",
    },
    {
      to: "/admin/feedback",
      icon: MessageSquare,
      label: "Users Feedback",
    },
  ];

  return (
    <div
      className={`
        relative flex flex-col h-screen bg-white border-r border-gray-200
        transition-all duration-300
        ${isExpanded ? "w-64" : "w-20"}
        shadow-sm
      `}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-3 top-20 bg-white border border-gray-200 rounded-full p-1.5 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110 z-10"
      >
        <ChevronDown
          className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${
            isExpanded ? "rotate-0" : "rotate-180"
          }`}
        />
      </button>

      <div className="flex items-center gap-3 px-4 py-6 border-b border-gray-100">
        <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center shadow-lg shadow-gray-900/20 flex-shrink-0">
          <ShieldCheck className="w-5 h-5 text-white" />
        </div>

        {isExpanded && (
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-gray-900 truncate">
              Admin Panel
            </h2>

            <p className="text-xs text-gray-500 truncate">
              Manage your platform
            </p>
          </div>
        )}
      </div>

      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={linkClass}
              title={!isExpanded ? item.label : ""}
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
      </nav>

      <div className="border-t border-gray-100 p-4">
        <div className="flex items-center justify-center">
          {isExpanded ? (
            <p className="text-xs text-gray-400">
              Admin Dashboard
            </p>
          ) : (
            <ShieldCheck className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
