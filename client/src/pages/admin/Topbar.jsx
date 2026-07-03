import { useState } from "react";
import API from "../../services/api"
import { useEffect } from "react";
import { useSearch } from "../../context/SearchContext";
import { FiSearch } from "react-icons/fi";


function Topbar() {
  const [admin, setAdmin] = useState(null);
  const { search, setSearch } = useSearch();

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/admin/profile", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setAdmin(res.data);
        console.log("ADMIN RESPONSE:", res.data);
      }
      catch (err) {
        console.log(err);
      }
    };
    fetchAdmin();
  }, []);

  const getInitials = (firstName, lastName) => {
    if (!firstName && !lastName) return "";
    return (
      (firstName?.[0] || "") +
      (lastName?.[0] || "")
    ).toUpperCase();
  };


  return (
    <div className="h-30 text-gray-600 shadow flex items-center justify-between px-6">
     
   
        <div className="text-xl font-semibold">
          Welcome back! {admin?.firstName}
        </div>
      
        <div className="flex items-center gap-3">
 <div className="flex items-center relative text-violet-500 flex-1 max-w-xl mx-2 sm:mx-4">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") return;
          }}
          className="w-full border border-violet-200 pl-10 py-2 rounded-sm outline-none focus:ring-1 focus:ring-violet-300"
          placeholder="Search..."
        />
      </div>
  <div className="w-10 h-10 rounded-full border border-violet-900 bg-transparent text-violet-900 flex items-center justify-center font-bold">
          {admin ? getInitials(admin.firstName, admin.lastName) : "A"}
        </div>
 </div>
    </div>
  );
}

export default Topbar;