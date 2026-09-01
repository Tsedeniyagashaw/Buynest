import { useEffect, useState } from "react";
import API from "../../services/api";
import { useSearch } from "../../context/SearchContext";

function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const { search } = useSearch();

  const filteredFeedback = feedbacks.filter((feedback) =>
    `${feedback.user?.firstName || ""} ${feedback.user?.lastName || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/feedback", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFeedbacks(res.data);
      } catch (error) {
        console.log(error.response?.data);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  const getInitials = (firstName, lastName) => {
    return `${firstName?.[0] || ""}${lastName?.[0] || ""}`
      .toUpperCase() || "U";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="flex items-center justify-center min-h-[300px]">
          <p className="text-sm text-gray-500">
            Loading feedback...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 md:px-6 lg:px-8">

      {/* Page Header */}
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-gray-900">
          Customer Feedback
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Review suggestions, bug reports, complaints and questions
          submitted by users.
        </p>
      </div>

      {/* Feedback Count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">
          <span className="font-medium text-gray-700">
            {filteredFeedback.length}
          </span>{" "}
          {filteredFeedback.length === 1
            ? "feedback submission"
            : "feedback submissions"}
        </p>
      </div>

      {/* Feedback Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

        {feedbacks.length === 0 ? (
          <div className="p-12 text-center">
            <div
              className="
                w-12
                h-12
                mx-auto
                rounded-full
                bg-gray-100
                flex
                items-center
                justify-center
                text-gray-500
                font-semibold
                mb-3
              "
            >
              F
            </div>

            <h2 className="text-sm font-semibold text-gray-900">
              No feedback found
            </h2>

            <p className="text-xs text-gray-400 mt-1">
              Customer feedback will appear here.
            </p>
          </div>
        ) : filteredFeedback.length === 0 ? (
          <div className="p-12 text-center">
            <h2 className="text-sm font-semibold text-gray-900">
              No matching feedback
            </h2>

            <p className="text-xs text-gray-400 mt-1">
              Try searching for a different user.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">

              {/* Table Header */}
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr className="text-left text-xs uppercase tracking-wide text-gray-500">

                  <th className="px-6 py-4 font-semibold">
                    User
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Type
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Subject
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Priority
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Status
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Date
                  </th>

                  <th className="px-6 py-4 font-semibold text-right">
                    Action
                  </th>

                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-gray-100">

                {filteredFeedback.map((feedback) => (
                  <tr
                    key={feedback._id}
                    className="
                      text-sm
                      hover:bg-gray-50
                      transition-colors
                      duration-150
                    "
                  >

                    {/* User */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">

                        <div
                          className="
                            w-9
                            h-9
                            rounded-full
                            bg-gray-900
                            text-white
                            flex
                            items-center
                            justify-center
                            text-xs
                            font-semibold
                            flex-shrink-0
                          "
                        >
                          {getInitials(
                            feedback.user?.firstName,
                            feedback.user?.lastName
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="font-medium text-gray-900">
                            {feedback.user?.firstName}{" "}
                            {feedback.user?.lastName}
                          </p>

                          <p className="text-xs text-gray-400 mt-0.5">
                            Customer
                          </p>
                        </div>

                      </div>
                    </td>

                    {/* Type */}
                    <td className="px-6 py-5">
                      <span
                        className="
                          inline-flex
                          px-2.5
                          py-1
                          rounded-md
                          text-xs
                          font-medium
                          bg-gray-100
                          text-gray-700
                          border
                          border-gray-200
                        "
                      >
                        {feedback.type}
                      </span>
                    </td>

                    {/* Subject */}
                    <td className="px-6 py-5">
                      <p className="font-medium text-gray-800 max-w-[220px] truncate">
                        {feedback.subject}
                      </p>
                    </td>

                    {/* Priority */}
                    <td className="px-6 py-5">
                      <span
                        className={`
                          inline-flex
                          items-center
                          gap-1.5
                          px-2.5
                          py-1
                          rounded-md
                          text-xs
                          font-medium
                          border

                          ${
                            feedback.priority === "high"
                              ? "bg-red-50 text-red-700 border-red-100"
                              : feedback.priority === "medium"
                              ? "bg-yellow-50 text-yellow-700 border-yellow-100"
                              : "bg-green-50 text-green-700 border-green-100"
                          }
                        `}
                      >
                        <span
                          className={`
                            w-1.5
                            h-1.5
                            rounded-full

                            ${
                              feedback.priority === "high"
                                ? "bg-red-500"
                                : feedback.priority === "medium"
                                ? "bg-yellow-500"
                                : "bg-green-500"
                            }
                          `}
                        />

                        {feedback.priority}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">
                      <span
                        className={`
                          inline-flex
                          items-center
                          gap-1.5
                          px-2.5
                          py-1
                          rounded-md
                          text-xs
                          font-medium
                          border

                          ${
                            feedback.status === "new"
                              ? "bg-gray-100 text-gray-700 border-gray-200"
                              : feedback.status === "reviewed"
                              ? "bg-yellow-50 text-yellow-700 border-yellow-100"
                              : "bg-green-50 text-green-700 border-green-100"
                          }
                        `}
                      >
                        <span
                          className={`
                            w-1.5
                            h-1.5
                            rounded-full

                            ${
                              feedback.status === "new"
                                ? "bg-gray-500"
                                : feedback.status === "reviewed"
                                ? "bg-yellow-500"
                                : "bg-green-500"
                            }
                          `}
                        />

                        {feedback.status}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-5 text-gray-500 whitespace-nowrap">
                      {new Date(
                        feedback.createdAt
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>

                    {/* Action */}
                    <td className="px-6 py-5 text-right">
                      <button
                        className="
                          inline-flex
                          items-center
                          justify-center
                          px-3
                          py-1.5
                          rounded-md
                          text-xs
                          font-medium
                          text-gray-900
                          bg-gray-100
                          border
                          border-gray-200
                          hover:bg-gray-200
                          transition-colors
                        "
                      >
                        View
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

export default AdminFeedback;
