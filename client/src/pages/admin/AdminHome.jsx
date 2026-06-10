
function AdminHome() {
  return (
    <div>
          <h1>Dashboard</h1>

            <div style={{ display: "flex", gap: "20px" }}>
                <div className="card">Users</div>
                <div className="card">Sellers</div>
                <div className="card">Orders</div>
                <div className="card">Products</div>
            </div>
    </div>
  )
}

export default AdminHome
