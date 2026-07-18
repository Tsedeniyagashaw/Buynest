import { useEffect, useState } from "react";
import API from "../../services/api";
import { useSearch } from "../../context/SearchContext";

function AdminFeedback() {

    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);

    const { search } = useSearch();

    const filteredFeedback = feedbacks.filter((feedback) =>
        `${feedback.user.firstName} ${feedback.user.lastName}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    useEffect(() => {

        const fetchFeedback = async () => {

            try {

                const token = localStorage.getItem("token");

                const res = await API.get("/feedback", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setFeedbacks(res.data);

            }

            catch (error) {

                console.log(error.response?.data);

            }

            finally {

                setLoading(false);

            }

        };

        fetchFeedback();

    }, []);

    if (loading) return <h2>Loading...</h2>;

    if (feedbacks.length === 0) return <h2>No feedback found.</h2>;

    return (

<div className="p-6 min-h-screen">

<div className="mb-6">

<h1 className="text-2xl font-semibold text-gray-700">

Customer Feedback

</h1>

<p className="text-sm text-gray-500 mt-1">

Review suggestions, bug reports, complaints and questions submitted by users.

</p>

</div>


<div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

<table className="min-w-full">

<thead className="bg-gray-50">

<tr className="text-left text-sm text-gray-600 border-b">

<th className="px-6 py-4">User</th>

<th className="px-6 py-4">Type</th>

<th className="px-6 py-4">Subject</th>

<th className="px-6 py-4">Priority</th>

<th className="px-6 py-4">Status</th>

<th className="px-6 py-4">Date</th>

<th className="px-6 py-4 text-right">

Action

</th>

</tr>

</thead>

<tbody className="divide-y divide-gray-100">

{filteredFeedback.map((feedback)=>(

<tr
key={feedback._id}
className="hover:bg-gray-50 text-sm"
>

<td className="px-6 py-4 font-medium">

{feedback.user.firstName} {feedback.user.lastName}

</td>

<td className="px-6 py-4">

{feedback.type}

</td>

<td className="px-6 py-4">

{feedback.subject}

</td>

<td className="px-6 py-4">

<span
className={`
px-2 py-1 rounded-full text-xs font-medium

${feedback.priority==="high" && "bg-red-100 text-red-600"}

${feedback.priority==="medium" && "bg-yellow-100 text-yellow-700"}

${feedback.priority==="low" && "bg-green-100 text-green-600"}

`}
>

{feedback.priority}

</span>

</td>

<td className="px-6 py-4">

<span
className={`
px-2 py-1 rounded-full text-xs font-medium

${feedback.status==="new" && "bg-blue-100 text-blue-700"}

${feedback.status==="reviewed" && "bg-orange-100 text-orange-700"}

${feedback.status==="resolved" && "bg-green-100 text-green-700"}

`}
>

{feedback.status}

</span>

</td>

<td className="px-6 py-4">

{new Date(feedback.createdAt).toLocaleDateString()}

</td>

<td className="px-6 py-4 text-right">

<button

className="text-violet-700 hover:text-violet-900 font-medium"

>

View

</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

    );

}

export default AdminFeedback;