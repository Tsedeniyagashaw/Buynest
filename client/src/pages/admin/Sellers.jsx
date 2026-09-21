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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="flex items-center justify-center min-h-[300px]">
          <p className="text-sm text-gray-500">
            Loading sellers...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 md:px-6 lg:px-8">

      <div className="mb-7">
        <h1 className="text-2xl font-bold text-gray-900">
          Sellers
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Manage registered sellers and review their approval status.
        </p>
      </div>

      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">
          <span className="font-medium text-gray-700">
            {sellers.length}
          </span>{" "}
          {sellers.length === 1 ? "seller" : "sellers"} registered
        </p>
      </div>

      {/* Sellers Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

        {sellers.length === 0 ? (
          <div className="p-12 text-center">
            <div className=" w-12 h-12 mx-auto rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-semibold mb-3 ">
              S
            </div>

            <h2 className="text-sm font-semibold text-gray-900">
              No sellers found
            </h2>

            <p className="text-xs text-gray-400 mt-1">
              Registered sellers will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">

              <thead className="bg-gray-50 border-b border-gray-200">
                <tr className="text-left text-xs uppercase tracking-wide text-gray-500">

                  <th className="px-6 py-4 font-semibold">
                    Seller
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Email
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Role
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

                {sellers.map((seller) => (
                  <tr key={seller._id} className=" text-sm hover:bg-gray-50 transition-colors duration-150 " >

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">

                        <div className=" w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-semibold flex-shrink-0 ">
                          {`${seller.firstName?.[0] || ""}${seller.lastName?.[0] || ""}`
                            .toUpperCase() || "S"}
                        </div>

                        <div className="min-w-0">
                          <p className="font-medium text-gray-900">
                            {`${seller.firstName || ""} ${seller.lastName || ""}`.trim() ||
                              "Unnamed seller"}
                          </p>

                          <p className="text-xs text-gray-400 mt-0.5">
                            Seller account
                          </p>
                        </div>

                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <p className="text-gray-600 truncate max-w-[240px]">
                        {seller.email || "N/A"}
                      </p>
                    </td>

                    <td className="px-6 py-5">
                      <span className=" inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200 ">
                        Seller
                      </span>
                    </td>

                    <td className="px-6 py-5">

                      {seller.isApproved ? ( <span className=" inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-green-50 text-green-700 border border-green-100 ">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                          Approved
                        </span>
                      ) : (
                        <span className=" inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-red-50 text-red-600 border border-red-100 ">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                          Not Approved
                        </span>
                      )}

                    </td>

                    <td className="px-6 py-5 text-right">

                      <button
                        onClick={() => toggleApproval(seller)}
                        className={` inline-flex items-center justify-center px-3 py-1.5 rounded-md text-xs font-medium border transition-colors duration-200
                          ${ seller.isApproved ? "text-red-600 bg-red-50 border-red-200 hover:bg-red-100" : "text-gray-900 bg-gray-100 border-gray-200 hover:bg-gray-200" }
                        `}
                      > {seller.isApproved ? "Revoke Approval" : "Approve Seller"}
                      </button>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>
          </div>
        )}

      </div>
    </div>
  );
}

export default Sellers;
