import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import home from "../assets/home2.jpg"

function Home() {
    
    const { token } = useContext(AuthContext);

    return (
        <div>
    <div className="min-h-[80vh] flex flex-col-reverse lg:flex-row items-center">


        <div className="flex-1 text-center">
            <h1 className="text-5xl md:text-6xl lg:text-6xl mb-3 text-violet-900 font-extrabold tracking-tight">SHOP SMARTER</h1>
            <p className="text-lg md:text-xl mb-8 max-w-md mx-auto text-gray-500">Discover quality products at great prices with fast delivery and a seamless shopping experience.</p>
            <button className="p-3  bg-violet-900 hover:bg-white hover:text-violet-800 border border-violet-400 rounded-md text-white text-center rounded shadow">Explore Collection</button>
        </div>
        <div className="flex-1 flex justify-center">
            <img src={home} alt="home" className="w-full max-w-sm md:max-w-md lg:max-w-xl object-contain transition-transform duration-500 hover:scale-105"/>
        </div>
    </div>

    <div className="bg-white rounded-xl shadow-xl
                grid grid-cols-2 md:grid-cols-4 gap-8
                p-8 max-w-5xl mx-auto  md:-mt-10 relative z-10">

  <div className="text-center">
    <h3 className="text-3xl font-bold text-violet-900">10K+</h3>
    <p className="text-gray-500">Happy Customers</p>
  </div>

  <div className="text-center">
    <h3 className="text-3xl font-bold text-violet-900">500+</h3>
    <p className="text-gray-500">Products</p>
  </div>

  <div className="text-center">
    <h3 className="text-3xl font-bold text-violet-900">24/7</h3>
    <p className="text-gray-500">Support</p>
  </div>

  <div className="text-center">
    <h3 className="text-3xl font-bold text-violet-900">99%</h3>
    <p className="text-gray-500">Customer Satisfaction</p>
  </div>
</div>

</div>
)
}

export default Home