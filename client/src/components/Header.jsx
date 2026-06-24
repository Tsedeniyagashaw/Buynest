import logo from '../assets/logo.png'
import profile from '../assets/profile.png'
import { FiSearch,  FiShoppingCart } from "react-icons/fi";
import { CiMenuFries, CiCircleRemove } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';


function Header({ onMenuToggle, menuOpen }) {

  const [query, setQuery] = useState("");
const navigate = useNavigate();
  
  return (
    <div className="sticky h-20 top-0 z-50 bg-white/80 backdrop-blur-md flex justify-between  items-center border-b border-purple-200 py-2 px-4 md:px-6">
<Link to="/">
  <img src={logo} alt="BuyNest" className="h-10 md:h-12" />
</Link>
    

        <div className="flex items-center relative text-purple-500 flex-1 max-w-xl mx-2 sm:mx-4">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if(e.key === "Enter"){
              navigate(`/search?q=${query}`)
            }
          }}
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
          {menuOpen ? <div className="absolute -bottom-1 -right-1 bg-violet-900 text-white w-15 h-16  flex items-center justify-center rounded-tl-3xl  ">
  <RxCross2 size={18} />
</div> : <CiMenuFries size={28} />}
        </button>
      </div>
    </div>
  );
}

export default Header
