import logo from '../assets/logo2.png'
import { FaSearch, FaBell } from "react-icons/fa";


function Header() {
  return (
    <div className='flex justify-between items-center border b-1 p-2'>
        <div>
        <img
  src={logo}
  alt="BuyNest"
  className="h-15 w-auto object-contain"
/>
        </div>
        <div className='flex items-center'>
            <input type="text" className='border b-1' />
            <FaSearch />
        </div>
        <div className='flex items-center justify-between'>
            <FaBell />
          <img
  src={logo}
  alt="BuyNest"
  className="h-15 w-auto object-contain border b-1 rounded-full"
/>

        </div>
      
    </div>
  )
}

export default Header
