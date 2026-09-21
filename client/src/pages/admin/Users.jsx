import { useEffect, useState } from "react";
import API from "../../services/api";
import { useSearch } from "../../context/SearchContext";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { search } = useSearch();

  const filteredUsers = users.filter((user) =>
    `${user.firstName || ""} ${user.lastName || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/admin/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(res.data);
      } catch (error) {
        console.log(error.response?.data);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const toggleBlock = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.put(
        `/admin/users/${id}/block`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers((prev) =>
        prev.map((user) =>
          user._id === id
            ? {
                ...user,
                isBlocked: res.data.user.isBlocked,
              }
            : user
        )
      );
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="flex items-center justify-center min-h-[300px]">
          <p className="text-sm text-gray-500">
            Loading users...
          </p>
        </div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">
          <h2 className="text-lg font-semibold text-gray-900">
            No users found
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            There are currently no users to display.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 md:px-6 lg:px-8">

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-7">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Users
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage users, roles, approval status, and account access.
          </p>
        </div>

        <button className=" inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 shadow-sm transition-colors duration-200 " >
          <span className="text-lg leading-none">
            +
          </span>

          Add User
        </button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">
          Showing{" "}
          <span className="font-medium text-gray-700">
            {filteredUsers.length}
          </span>{" "}
          {filteredUsers.length === 1 ? "user" : "users"}
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

        <div className="overflow-x-auto">
          <table className="min-w-full">

            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="text-left text-xs uppercase tracking-wide text-gray-500">

                <th className="px-6 py-4 font-semibold">
                  Name
                </th>

                <th className="px-6 py-4 font-semibold">
                  Email
                </th>

                <th className="px-6 py-4 font-semibold">
                  Role
                </th>

                <th className="px-6 py-4 font-semibold">
                  Approved
                </th>

                <th className="px-6 py-4 font-semibold">
                  Status
                </th>

                <th className="px-6 py-4 font-semibold text-right">
                  Action
                </th>

              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">

              {filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center"
                  >
                    <p className="text-sm font-medium text-gray-700">
                      No matching users
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      Try adjusting your search.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (

                  <tr key={user._id} className=" text-sm hover:bg-gray-50 transition-colors duration-150 " >

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">

                        <div className=" w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-semibold flex-shrink-0 ">
                          {`${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase() || "U"}
                        </div>

                        <div>
                          <p className="font-medium text-gray-900">
                            {`${user.firstName || ""} ${user.lastName || ""}`.trim() || "N/A"}
                          </p>
                        </div>

                      </div>
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {user.email || "N/A"}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={` inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border
                          ${ user.role === "admin" ? "bg-gray-900 text-white border-gray-900" : user.role === "seller" ? "bg-gray-100 text-gray-700 border-gray-200" : "bg-gray-50 text-gray-600 border-gray-200" } `}
                      >
                        {user.role}
                      </span>
                    </td>

                    {/* Approved */}
                    <td className="px-6 py-4">

                      {user.role === "seller" ? (
                        user.isApproved ? (
                          <span className=" inline-flex items-center px-2.5 py-1 text-xs rounded-md bg-green-50 text-green-700 border border-green-100 font-medium ">
                            Approved
                          </span>
                        ) : (
                          <span className=" inline-flex items-center px-2.5 py-1 text-xs rounded-md bg-red-50 text-red-600 border border-red-100 font-medium ">
                            Not Approved
                          </span>
                        )
                      ) : (
                        <span className="text-gray-400">
                          —
                        </span>
                      )}

                    </td>

                    <td className="px-6 py-4">

                      {user.isBlocked ? (
                        <span className=" inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md bg-red-50 text-red-600 border border-red-100 font-medium ">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                          Suspended
                        </span>
                      ) : (
                        <span className=" inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md bg-green-50 text-green-700 border border-green-100 font-medium ">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                          Active
                        </span>
                      )}

                    </td>

                    <td className="px-6 py-4 text-right">

                      {user.role !== "admin" && (
                        <button
                          onClick={() => toggleBlock(user._id)}
                          className={` inline-flex items-center justify-center px-3 py-1.5 rounded-md text-xs font-medium border transition-colors duration-200
                            ${
                              user.isBlocked
                                ? "text-green-700 bg-green-50 border-green-200 hover:bg-green-100"
                                : "text-red-600 bg-red-50 border-red-200 hover:bg-red-100"
                            }
                          `}
                        >
                          {user.isBlocked ? "Activate" : "Suspend"}
                        </button>
                      )}

                    </td>

                  </tr>

                ))
              )}

            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
}

export default Users;
