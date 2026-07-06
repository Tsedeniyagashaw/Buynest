import { useState, useEffect } from "react";
import API from "../../services/api";

function SellerTopbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, []);

  const getInitials = (first, last) =>
    `${first?.[0] || ""}${last?.[0] || ""}`.toUpperCase();

  return (
    <div className="h-16 bg-white border-b flex items-center justify-between px-6">

      {/* Search (later we can make global) */}
      <input
        type="text"
        placeholder="Search..."
        className="border px-3 py-1 rounded-md w-80"
      />

      {/* Profile */}
      <div className="flex items-center gap-3">

        <div className="w-10 h-10 bg-violet-600 text-white flex items-center justify-center rounded-full font-bold">
          {user && getInitials(user.firstName, user.lastName)}
        </div>

        <div className="text-sm text-gray-600">
          {user?.firstName}
        </div>

      </div>

    </div>
  );
}

export default SellerTopbar;