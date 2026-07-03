import { useEffect, useState } from "react"
import API from "../../services/api"
import { useSearch } from "../../context/SearchContext";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { search } = useSearch();


  const filteredUsers = users.filter(user =>
    `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(search.toLowerCase())
);

  useEffect (() => {
    

    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/admin/users",{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsers(res.data);

      }
      catch(error) {
        console.log(error.response?.data);
      }
      finally {
        setLoading(false);
      }
    };
    fetchUsers();
  } , []);

  if (loading ) return <h2>Loading Users...</h2>
  if (users.length === 0) return <h2>No user found</h2>


  return (
<div className="p-6  min-h-screen">
  <div className="flex items-start justify-between mb-6">
    <div>
      <h1 className="text-2xl text-gray-600 font-semibold ">All users</h1>
      <p className="text-sm text-gray-500 mt-1">
        A list of all users including their name, email, role and approval status.
      </p>
    </div>

    <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-violet-900 shadow hover:opacity-90">
      <span className="text-lg">+</span>
      Add user
    </button>
  </div>

  <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
    
    <table className="min-w-full">
      <thead className="bg-gray-50">
        <tr className="text-left text-sm text-gray-600 border-b border-gray-300">
          <th className="px-6 py-4 font-medium">Name</th>
          <th className="px-6 py-4 font-medium">Email</th>
          <th className="px-6 py-4 font-medium">Role</th>
          <th className="px-6 py-4 font-medium">Approved</th>
          <th className="px-6 py-4 font-medium text-right">Action</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-100">
        {filteredUsers.map((user) => (
          <tr key={user._id} className="text-sm hover:bg-gray-50 transition">
            
            <td className="px-6 py-4 font-medium text-gray-900">
              {user.firstName + " " + user.lastName || "N/A"}
            </td>

            <td className="px-6 py-4 text-gray-600">
              {user.email}
            </td>

            <td className="px-6 py-4">
              <span className={`
                px-2.5 py-1 rounded-full text-xs font-medium
                ${user.role === "admin" && "bg-purple-100 text-purple-600"}
                ${user.role === "seller" && "bg-blue-100 text-blue-600"}
                ${user.role === "buyer" && "bg-green-100 text-green-600"}
              `}>
                {user.role}
              </span>
            </td>

            <td className="px-6 py-4">
              {user.role === "seller" ? (
                user.isApproved ? (
                  <span className="px-2.5 py-1 text-xs rounded-full bg-green-100 text-green-600">
                    Yes
                  </span>
                ) : (
                  <span className="px-2.5 py-1 text-xs rounded-full bg-red-100 text-red-500">
                    No
                  </span>
                )
              ) : (
                <span className="text-gray-400">-</span>
              )}
            </td>

            <td className="px-6 py-4 text-right">
              <button className="text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                </svg>
                Edit
              </button>
            </td>

          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
  )
}

export default Users
