import { Outlet, Link } from "react-router-dom";

function AdminLayout() {
    return (
        <div className="admin-container">
            
            <div className="sidebar">
                <h2>Admin Panel</h2>

                <Link to="/admin">Dashboard</Link>
                <Link to="/admin/users">Users</Link>
                <Link to="/admin/sellers">Sellers</Link>
                <Link to="/admin/products">Products</Link>
                <Link to="/admin/orders">Orders</Link>
            </div>

            <div className="main">
                
                <div className="topbar">
                    <h3>Welcome Admin</h3>
                </div>

                <div className="content">
                    <Outlet />
                </div>

            </div>
        </div>
    );
}

export default AdminLayout;