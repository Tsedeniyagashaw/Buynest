import { useEffect, useState } from "react";
import API from "../../services/api";

function Sellers() {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/admin/sellers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setSellers(res.data);
      } catch (error) {
        console.log(error.response?.data);
      } finally {
        setLoading(false);
      }
    };

    fetchSellers();
  }, []);

  const toggleApproval = async (seller) => {
    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/admin/approve-seller/${seller._id}`,
        {
          isApproved: !seller.isApproved,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSellers((prev) =>
        prev.map((s) =>
          s._id === seller._id
            ? { ...s, isApproved: !s.isApproved }
            : s
        )
      );
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  if (loading)
    return (
      <div className="p-6">
        <h2>Loading sellers...</h2>
      </div>
    );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Sellers
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage all registered sellers and their approval status.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

        {sellers.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No sellers found.
          </div>
        ) : (
          <table className="min-w-full">

            <thead className="bg-gray-50">
              <tr className="text-left text-sm text-gray-600 border-b">
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Approved</th>
                <th className="px-6 py-4 font-medium text-right">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">

              {sellers.map((seller) => (
                <tr
                  key={seller._id}
                  className="hover:bg-gray-50 transition text-sm"
                >

                  <td className="px-6 py-5 font-medium text-gray-900">
                    {seller.firstName} {seller.lastName}
                  </td>

                  <td className="px-6 py-5 text-gray-600">
                    {seller.email}
                  </td>

                  <td className="px-6 py-5">
                    <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-medium">
                      Seller
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        seller.isApproved
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {seller.isApproved ? "Approved" : "Not Approved"}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-right">
                    <button
                      onClick={() => toggleApproval(seller)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium text-white transition ${
                        seller.isApproved
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-indigo-600 hover:bg-indigo-700"
                      }`}
                    >
                      {seller.isApproved
                        ? "Revoke"
                        : "Approve"}
                    </button>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>
        )}
      </div>
    </div>
  );
}

export default Sellers;