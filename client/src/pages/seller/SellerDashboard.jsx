import { useEffect, useState } from "react";
import API from "../../services/api";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";


function SellerDashboard() {

    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const fetchStats = async () => {

            try {

                const token = localStorage.getItem("token");

                const res = await API.get(
                    "/seller/stats",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setStats(res.data);


            } catch (error) {

                console.log(error.response?.data);

            }
            finally {

                setLoading(false);

            }

        };


        fetchStats();

    }, []);



    if (loading) {

        return (
            <div className="p-6 text-gray-500">
                Loading dashboard...
            </div>
        );

    }



    return (

        <div className="p-6 bg-gray-50 min-h-screen">


            {/* Header */}

            <div className="mb-8">

                <h1 className="text-3xl font-bold text-gray-800">
                    Welcome back 👋
                </h1>

                <p className="text-gray-500 mt-2">
                    Here is your store performance
                </p>

            </div>




            {/* Stats Cards */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">


                <StatCard
                    title="Products"
                    value={stats.products}
                    color="text-violet-600"
                />


                <StatCard
                    title="Orders"
                    value={stats.orders}
                    color="text-blue-600"
                />


                <StatCard
                    title="Revenue"
                    value={`$${stats.revenue.toLocaleString()}`}
                    color="text-green-600"
                />


                <StatCard
                    title="Pending Orders"
                    value={stats.pendingOrders}
                    color="text-yellow-500"
                />


            </div>





            <div className="grid lg:grid-cols-3 gap-6">



                {/* Recent Orders */}

                <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">


                    <div className="flex justify-between mb-5">

                        <h2 className="text-xl font-bold">
                            Recent Orders
                        </h2>


                        <span className="text-sm text-gray-500">
                            Latest activity
                        </span>

                    </div>



                    {
                        stats.recentOrders.length === 0 ?

                        (
                            <p className="text-gray-500">
                                No orders yet
                            </p>
                        )

                        :

                        (

                        <div className="overflow-x-auto">


                        <table className="w-full text-left">


                        <thead className="border-b text-gray-500 text-sm">

                            <tr>

                                <th className="py-3">
                                    Customer
                                </th>


                                <th>
                                    Product
                                </th>


                                <th>
                                    Amount
                                </th>


                                <th>
                                    Status
                                </th>


                            </tr>


                        </thead>




                        <tbody>


                        {
                            stats.recentOrders.map(order => (

                            <tr
                            key={order._id}
                            className="border-b last:border-none"
                            >


                                <td className="py-4 font-medium">

                                    {order.user.firstName}

                                </td>



                                <td>

                                    {
                                        order.orderItems[0]
                                        ?.product?.name
                                    }

                                </td>



                                <td className="font-semibold">

                                    $
                                    {
                                    order.totalPrice.toLocaleString()
                                    }

                                </td>



                                <td>

                                    <span
                                    className={`
                                    px-3 py-1 rounded-full text-xs font-medium

                                    ${
                                    order.status==="pending"
                                    ?
                                    "bg-yellow-100 text-yellow-600"
                                    :
                                    order.status==="shipped"
                                    ?
                                    "bg-purple-100 text-purple-600"
                                    :
                                    "bg-green-100 text-green-600"
                                    }

                                    `}
                                    >

                                    {order.status}

                                    </span>


                                </td>



                            </tr>


                            ))

                        }



                        </tbody>



                        </table>


                        </div>

                        )

                    }


                </div>






                {/* Order Status */}

                <div className="bg-white rounded-xl shadow p-6">


                    <h2 className="text-xl font-bold mb-5">
                        Order Status
                    </h2>


                    <StatusItem
                        label="Pending"
                        value={stats.orderStatus.pending}
                        color="bg-yellow-400"
                    />


                    <StatusItem
                        label="Shipped"
                        value={stats.orderStatus.shipped}
                        color="bg-purple-500"
                    />


                    <StatusItem
                        label="Delivered"
                        value={stats.orderStatus.delivered}
                        color="bg-green-500"
                    />


                </div>


            </div>






            {/* Recent Products */}


            <div className="mt-8 bg-white rounded-xl shadow p-6">


                <h2 className="text-xl font-bold mb-5">
                    Recent Products
                </h2>



                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">


                {
                    stats.recentProducts.map(product => (

                    <div
                    key={product._id}
                    className="border rounded-xl p-4 hover:shadow-md transition"
                    >


                        <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center mb-3">


                            <img
                            src={product.image}
                            alt={product.name}
                            className="h-full object-contain"
                            />

                        </div>



                        <h3 className="font-semibold">

                            {product.name}

                        </h3>


                        <p className="text-green-600 font-bold mt-2">

                            ${product.price.toLocaleString()}

                        </p>


                    </div>


                    ))

                }


                </div>


            </div>
            {/* Sales Chart */}

<div className="mt-8 bg-white rounded-xl shadow p-6">


<h2 className="text-xl font-bold mb-5">
    Sales Overview
</h2>


{
stats.monthlySales.length === 0 ?

(
<p className="text-gray-500">
No sales data yet
</p>
)

:

(

<div className="h-[350px]">

<ResponsiveContainer width="100%" height="100%">

<LineChart data={stats.monthlySales}>


<CartesianGrid strokeDasharray="3 3" />


<XAxis 
dataKey="month"
/>


<YAxis />


<Tooltip />



<Line
type="monotone"
dataKey="sales"
stroke="#7c3aed"
strokeWidth={3}
/>


</LineChart>

</ResponsiveContainer>


</div>

)

}


</div>



        </div>

    );

}




// reusable components


function StatCard({title,value,color}){

return (

<div className="bg-white rounded-xl shadow p-6">

<p className="text-gray-500">
{title}
</p>


<h2 className={`text-3xl font-bold mt-3 ${color}`}>
{value}
</h2>


</div>

)

}




function StatusItem({label,value,color}){


return (

<div className="flex justify-between items-center mb-5">


<div className="flex items-center gap-3">


<div className={`w-3 h-3 rounded-full ${color}`}>
</div>


<span>
{label}
</span>


</div>


<span className="font-bold">
{value}
</span>


</div>


)


}



export default SellerDashboard;