import logo from '../assets/logo.png'
import profile from '../assets/profile.png'
import { FiSearch,  FiShoppingCart } from "react-icons/fi";
import { CiMenuFries, CiCircleRemove } from "react-icons/ci";


function Header({ onMenuToggle, menuOpen }) {
  return (
    <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md flex justify-between items-center border-b border-purple-200 py-3 px-4 md:px-6">

      <img src={logo} alt="BuyNest" className="h-10 md:h-12" />

        <div className="flex items-center relative text-purple-500 flex-1 max-w-xl mx-2 sm:mx-4">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          className="w-full border border-purple-200 pl-10 py-2 rounded-sm outline-none focus:ring-1 focus:ring-violet-300"
          placeholder="Search..."
        />
      </div>

      <div className="flex items-center gap-4 text-purple-500">

        <FiShoppingCart className="text-2xl hidden sm:block" />

        <img
          src={profile}
          alt="Profile"
          className="h-9 w-9 object-cover border rounded-full hidden sm:block"
        />

    
        <button
          onClick={onMenuToggle}
          className="text-purple-600 md:hidden flex items-center justify-center w-10 h-10"
        >
          {menuOpen ? <CiCircleRemove size={28} /> : <CiMenuFries size={28} />}
        </button>
      </div>
    </div>
  );
}

export default Header
