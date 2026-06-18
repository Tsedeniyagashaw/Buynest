import logo from '../assets/logo.png'
import profile from '../assets/profile.png'
import { FiSearch, FiBell } from "react-icons/fi";


function Header() {
  return (
    <div className='flex justify-between items-center border-purple-200   border-b b-1  py-4'>
        <div>
        <img
  src={logo}
  alt="BuyNest"
  className="h-12 w-auto object-contain"
/>
        </div>
        <div className='flex items-center relative text-purple-500'>
            <FiSearch className='absolute m-1' />  <input type="text" className='border b-1 border-purple-200 pl-7 py-1 px-20 shadow-sm rounded-sm ' placeholder='Search...' />
          
        </div>
        <div className='flex items-center justify-between  text-purple-500'>
            <FiBell className='mr-6 '/>
          <img
  src={profile}
  alt="Profile"
  className="h-10 w-auto object-contain border b-1 rounded-full"
/>

        </div>
      
    </div>
  )
}

export default Header
