import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../context/AuthContext"
import home from "../assets/home.png"
import banner from "../assets/banner3.png"
import API from "../services/api"
import ProductCard from "../components/ProductCard";
import { 
  FiShoppingBag, FiUsers, FiPackage, FiHeadphones, FiChevronRight,
  FiStar,
  FiTruck,
  FiShield,
  FiRefreshCw
} from "react-icons/fi";
import { Link } from "react-router-dom";

function Home() {
  const [newProducts, setNewProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
        const res = await API.get("/products/new");
        setNewProducts(res.data);
      } catch (error) {
        console.log(error.response?.data);
      } finally {
        setLoading(false);
        
      }
    };

    fetchNewProducts();
  }, []);

  const { token } = useContext(AuthContext);

  // Stats data
  const stats = [
    { number: "10K+", label: "Happy Customers", icon: FiUsers },
    { number: "500+", label: "Products", icon: FiPackage },
    { number: "24/7", label: "Support", icon: FiHeadphones },
    { number: "99%", label: "Satisfaction", icon: FiStar },
  ];

  // Features data
  const features = [
    { icon: FiTruck, title: "Free Delivery", description: "Free shipping on orders over $50" },
    { icon: FiShield, title: "Secure Payment", description: "100% secure payment processing" },
    { icon: FiRefreshCw, title: "Easy Returns", description: "30-day return policy" },
    { icon: FiHeadphones, title: "24/7 Support", description: "Dedicated customer support" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
            
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 rounded-full text-violet-700 text-sm font-medium mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                </span>
                Welcome to BuyNest
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4">
                <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                  SHOP SMARTER
                </span>
              </h1>
              
              <p className="text-lg md:text-xl mb-8 max-w-lg mx-auto lg:mx-0 text-gray-600 leading-relaxed">
                Discover quality products at great prices with fast delivery and a seamless shopping experience.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/product"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-medium hover:from-violet-700 hover:to-indigo-700 transition-all duration-200 shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/30 group"
                >
                  Explore Collection
                  <FiChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                {!token && (
                  <Link
                    to="/register"
                    className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-gray-700 rounded-xl font-medium border-2 border-gray-200 hover:border-violet-400 hover:text-violet-600 transition-all duration-200"
                  >
                    Get Started
                  </Link>
                )}
              </div>
            </div>

            {/* Right Image */}
            <div className="flex-1 flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-200 to-indigo-200 rounded-full blur-3xl opacity-20 -z-10"></div>
                <img 
                  src={home} 
                  alt="Shopping" 
                  className="w-full max-w-sm md:max-w-md lg:max-w-xl object-contain transition-transform duration-500 hover:scale-105 drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-5xl mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="flex justify-center mb-2">
                <div className="w-12 h-12 rounded-xl bg-violet-100 group-hover:bg-violet-200 transition-colors flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-violet-600" />
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                {stat.number}
              </h3>
              <p className="text-sm text-gray-500 mt-0.5">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group hover:border-violet-200"
            >
              <div className="w-12 h-12 rounded-xl bg-violet-100 group-hover:bg-violet-200 transition-colors flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-violet-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* New Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              New Arrivals
            </h2>
            <p className="text-gray-500 mt-1">
              Discover our latest products
            </p>
          </div>
          <Link 
            to="/product" 
            className="inline-flex items-center gap-1 text-violet-600 hover:text-violet-700 font-medium transition-colors group"
          >
            View All
            <FiChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 rounded-2xl h-64"></div>
                <div className="mt-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : newProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiPackage className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No products available
            </h3>
            <p className="text-gray-500">
              Check back later for new arrivals
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* CTA Section */}
      {!token && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-600 p-8 md:p-12 text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Ready to Start Shopping?
              </h2>
              <p className="text-white/80 text-lg mb-6 max-w-lg mx-auto">
                Join thousands of happy customers and discover amazing products.
              </p>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-violet-600 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Create Account
                <FiChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home