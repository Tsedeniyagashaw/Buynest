function AdminHome() {
  const cards = [
    {
      title: "Users",
      value: "1,245",
      change: "+12%",
      icon: "👤",
    },
    {
      title: "Sellers",
      value: "85",
      change: "+5%",
      icon: "🏪",
    },
    {
      title: "Products",
      value: "520",
      change: "+18",
      icon: "📦",
    },
    {
      title: "Orders",
      value: "1,842",
      change: "+21%",
      icon: "🛒",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome back, Admin 
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-xl shadow-sm hover:shadow-lg transition p-6 border border-gray-100"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">{card.title}</p>

                <h2 className="text-3xl font-bold mt-2">
                  {card.value}
                </h2>

                <p className="text-green-600 mt-2 text-sm font-medium">
                  {card.change} this month
                </p>
              </div>

              <div className="text-5xl">
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mt-10">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-5">
            Recent Activity
          </h2>

          <div className="space-y-4">
            <div className="border-l-4 border-violet-900 pl-4">
              New seller registered.
            </div>

            <div className="border-l-4 border-violet-900 pl-4">
              3 new orders placed.
            </div>

            <div className="border-l-4 border-violet-900 pl-4">
              New product added.
            </div>

            <div className="border-l-4 border-violet-900 pl-4">
              User updated profile.
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-5">
            Quick Actions
          </h2>

          <div className="grid gap-4">
            <button className="bg-violet-900 hover:bg-violet-800 text-white py-3 rounded-lg">
              Add Product
            </button>

            <button className="border border-violet-900 text-violet-900 hover:bg-violet-50 py-3 rounded-lg">
              Manage Sellers
            </button>

            <button className="border border-violet-900 text-violet-900 hover:bg-violet-50 py-3 rounded-lg">
              View Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;