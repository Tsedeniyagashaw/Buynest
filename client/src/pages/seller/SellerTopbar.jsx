import { useState, useEffect } from "react";
import API from "../../services/api";
import { useSearch } from "../../context/SearchContext";



function SellerTopbar() {
  const [user, setUser] = useState(null);
const { search, setSearch } = useSearch();

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

    fetchUser();
  }, []);

  const getInitials = (first, last) =>
    `${first?.[0] || ""}${last?.[0] || ""}`.toUpperCase();

  return (
    <div className="h-16 bg-white border-b flex items-center justify-between px-6">

    
    <input
  type="text"
  placeholder="Search..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="border px-3 py-1 rounded-md w-80"
/>

   
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