// pages/AboutUs.jsx
import { FiUsers, FiPackage, FiHeadphones, FiStar, FiShield, FiTruck, FiRefreshCw, FiAward, FiHeart, FiGlobe, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

function AboutUs() {
  const stats = [
    { number: "10K+", label: "Happy Customers", icon: FiUsers },
    { number: "500+", label: "Products", icon: FiPackage },
    { number: "24/7", label: "Support", icon: FiHeadphones },
    { number: "99%", label: "Satisfaction", icon: FiStar },
  ];

  const values = [
    {
      icon: FiShield,
      title: "Quality First",
      description: "We carefully curate our product selection to ensure only the highest quality items reach our customers."
    },
    {
      icon: FiHeart,
      title: "Customer Centric",
      description: "Your satisfaction is our priority. We're committed to providing exceptional service at every step."
    },
    {
      icon: FiGlobe,
      title: "Global Reach",
      description: "Connecting customers worldwide with products that bring joy and convenience to their lives."
    },
    {
      icon: FiAward,
      title: "Excellence",
      description: "We strive for excellence in everything we do, from product selection to delivery and support."
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=7C3AED&color=fff&size=128"
    },
    {
      name: "Michael Chen",
      role: "Head of Operations",
      image: "https://ui-avatars.com/api/?name=Michael+Chen&background=7C3AED&color=fff&size=128"
    },
    {
      name: "Emily Rodriguez",
      role: "Customer Experience",
      image: "https://ui-avatars.com/api/?name=Emily+Rodriguez&background=7C3AED&color=fff&size=128"
    },
    {
      name: "David Kim",
      role: "Product Manager",
      image: "https://ui-avatars.com/api/?name=David+Kim&background=7C3AED&color=fff&size=128"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-violet-600 to-indigo-600 py-16 md:py-24">
        {/* <div className=`absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20`></div> */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            About BuyNest
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4">
            Your Trusted Shopping
            <span className="block">Destination</span>
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            We're passionate about bringing you the best products with unmatched service and convenience.
          </p>
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

      {/* Our Story */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Story
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full mb-6"></div>
            <p className="text-gray-600 leading-relaxed mb-4">
              Founded in 2024, BuyNest was born from a simple idea: make quality products accessible to everyone. 
              What started as a small online store has grown into a trusted shopping destination for thousands of customers.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              We believe in the power of great products to enhance lives. That's why we carefully select every item 
              in our collection, ensuring it meets our high standards for quality, value, and sustainability.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <FiShield className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm text-gray-700">Quality Guaranteed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <FiTruck className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm text-gray-700">Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <FiRefreshCw className="w-4 h-4 text-purple-600" />
                </div>
                <span className="text-sm text-gray-700">Easy Returns</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-200 to-indigo-200 rounded-3xl blur-3xl opacity-30"></div>
            <img 
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop" 
              alt="Our Story" 
              className="relative rounded-2xl shadow-2xl w-full object-cover h-[300px] md:h-[400px]"
            />
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              The principles that guide everything we do at BuyNest
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-violet-200 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-xl bg-violet-100 group-hover:bg-violet-200 transition-colors flex items-center justify-center mb-4">
                  <value.icon className="w-7 h-7 text-violet-600" />
                </div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Meet Our Team
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            The passionate people behind BuyNest who work tirelessly to bring you the best shopping experience
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-violet-100"
              />
              <h3 className="font-semibold text-gray-900">
                {member.name}
              </h3>
              <p className="text-sm text-violet-600">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-600 p-8 md:p-12 text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Want to Work With Us?
            </h2>
            <p className="text-white/80 text-lg mb-6 max-w-lg mx-auto">
              We're always looking for talented individuals to join our team.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-violet-600 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Get in Touch
              <FiChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;