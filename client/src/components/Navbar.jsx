import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
    const { token, logout } = useContext(AuthContext);

    return (
        <nav className="bg-violet-900 text-white p-4 flex justify-start gap-5 items-center shadow-sm">
            
            <Link to="/" className=" border-b-2 border-transparent hover:border-white">Home</Link>
            {!token ? (
                <>
                <Link to="/login" className=" border-b-2 border-transparent hover:border-white">Login</Link>
                <Link to="/register" className=" border-b-2 border-transparent hover:border-white">Register</Link>
                </>
            ):(
                <>
                <Link to="/product" className=" border-b-2 border-transparent hover:border-white transition">Products</Link>
                <Link to="/cart" className=" border-b-2 border-transparent hover:border-white transition">Cart</Link>
                <Link to="/orders" className=" border-b-2 border-transparent hover:border-white transition">Orders</Link>
                <Link to="/seller-dashboard" className=" border-b-2 border-transparent hover:border-white transition">Dashboard</Link>
                <Link to="/seller-orders" className=" border-b-2 border-transparent hover:border-white transition">Orders</Link>

                
                <button onClick={logout}>
                    Logout
                </button>
                </>
            )}
        </nav>
    );
}

export default Navbar