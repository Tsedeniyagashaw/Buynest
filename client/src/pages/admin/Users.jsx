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
    <div>
      <h1>All users</h1>
                  <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Approved</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredUsers.map((user) => (
                        <tr key={user._id}>
                            <td>{user.name || "N/A"}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                {user.role === "seller"
                                    ? user.isApproved ? "Yes" : "No"
                                    : "-"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


    </div>
  )
}

export default Users
