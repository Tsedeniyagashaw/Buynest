import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
    const { token, logout } = useContext(AuthContext);

    return (
        <nav className="bg-violet-900 text-white flex align-middle  gap-5 items-center shadow-sm h-20 px-3">
    

            
            <Link to="/" className="relative flex items-center bottom-0 text-center transition-colors duration-300 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full h-full">Home</Link>
            {!token ? (
                <>
                <Link to="/login"  className="relative flex items-center bottom-0 text-center transition-colors duration-300 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full h-full">Login</Link>
                <Link to="/register"  className="relative flex items-center bottom-0  text-center transition-colors duration-300 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full h-full">Register</Link>
                </>
            ):(
                <div className="flex justify-between w-full h-full">
                <div className="flex gap-4">
                <Link to="/product" className="relative flex items-center bottom-0  text-center transition-colors duration-300 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full h-full">Products</Link>
                <Link to="/cart"  className="relative flex items-center bottom-0  text-center transition-colors duration-300 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full h-full">Cart</Link>
                <Link to="/orders"  className="relative flex items-center bottom-0  text-center transition-colors duration-300 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full h-full">Orders</Link>
                <Link to="/seller-dashboard"  className="relative flex items-center bottom-0  text-center transition-colors duration-300 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full h-full">Dashboard</Link>
                <Link to="/seller-orders"   className="relative flex items-center bottom-0  text-center transition-colors duration-300 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full h-full">S_Orders</Link>
              </div>
                <div className=" flex items-center">
                    <button class="bg-transparent hover:bg-purple-700 font-semibold py-2 px-4 border border-purple-500 rounded shadow" onClick={logout}>
                    Logout
                </button>  
                </div>
              
                </div>
                
            )}
        </nav>
    );
}

export default Navbar