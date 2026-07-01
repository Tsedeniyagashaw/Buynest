import { useState } from "react";
import API from "../../services/api"
import { useEffect } from "react";
import { useSearch } from "../../context/SearchContext";

function Topbar() {
 const [admin, setAdmin] = useState(null);
 const { search, setSearch } = useSearch();

 useEffect(() =>{
  const fetchAdmin = async () => {
    try {
      const res = await API.get("/admin/profile");
      setAdmin(res.data);
    }
    catch (err) {
      console.log(err);
    }
  };
  fetchAdmin();
 },[]);



  return (
    <div className="h-20 bg-white shadow flex items-center justify-between px-6">

     <input
    type="text"
    placeholder="Search..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="border rounded-lg px-4 py-2 w-80"
/>

      <div className="text-sm text-gray-600">
        Welcome {admin?.firstName}
      </div>

    </div>
  );
}

export default Topbar;