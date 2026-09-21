import { Link } from "react-router-dom";
import {FiFacebook,FiTwitter,FiInstagram,FiYoutube,FiMail,FiMapPin,FiPhone,FiSend,FiChevronRight,} from "react-icons/fi";

function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
    { name: "Products", path: "/product" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms & Conditions", path: "/terms" },
    { name: "Returns Policy", path: "/returns" },
  ];

  const categories = [
    { name: "Electronics", path: "/product?category=electronics" },
    { name: "Fashion", path: "/product?category=fashion" },
    { name: "Home & Living", path: "/product?category=home" },
    { name: "Books", path: "/product?category=books" },
    { name: "Toys & Games", path: "/product?category=toys" },
    { name: "Sports", path: "/product?category=sports" },
  ];

  const socialLinks = [
    { icon: FiFacebook, href: "https://facebook.com", label: "Facebook" },
    { icon: FiTwitter, href: "https://twitter.com", label: "Twitter" },
    { icon: FiInstagram, href: "https://instagram.com", label: "Instagram" },
    { icon: FiYoutube, href: "https://youtube.com", label: "YouTube" },
  ];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();

    const email = e.target.elements.email.value;

    console.log("Newsletter subscription:", email);

    e.target.reset();
    alert("Thank you for subscribing!");
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          <div>
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-extrabold text-white">
                BuyNest
              </span>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed mb-5 max-w-xs">
              Your one-stop destination for quality products at great prices.
              Shop smarter with BuyNest.
            </p>

            <div className="space-y-3 text-sm">

              <div className="flex items-center gap-3">
                <FiMapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <span className="text-gray-400">
                  Bole, Addis Ababa, Ethiopia
                </span>
              </div>

              <div className="flex items-center gap-3">
                <FiMail className="w-4 h-4 text-gray-500 flex-shrink-0" />

                <a
                  href="mailto:support@buynest.com"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  support@buynest.com
                </a>
              </div>

              <div className="flex items-center gap-3">
                <FiPhone className="w-4 h-4 text-gray-500 flex-shrink-0" />

                <a
                  href="tel:+25191234567"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  +251 9123-4567
                </a>
              </div>

            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <FiChevronRight
                      className="w-3 h-3 text-gray-600 group-hover:text-white group-hover:translate-x-0.5 transition-all"
                    />

                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-5">
              Categories
            </h3>

            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    to={category.path}
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <FiChevronRight
                      className="w-3 h-3 text-gray-600 group-hover:text-white group-hover:translate-x-0.5 transition-all"
                    />

                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-5">
              Subscribe to Newsletter
            </h3>

            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Get the latest updates on new products and upcoming sales.
            </p>

            <form
              onSubmit={handleNewsletterSubmit}
              className="space-y-3"
            >
              <div className="relative">

                <input type="email" name="email" placeholder="Enter your email" required
                  className=" w-full px-4 py-3 pr-14 bg-gray-800  border border-gray-700 rounded-lg text-white placeholder-gray-500 outline-none focus:border-gray-500 focus:ring-1  focus:ring-gray-500  transition-all" />

                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute  right-2  top-1/2  -translate-y-1/2  w-9 h-9  bg-white text-gray-900  rounded-md flex  items-center justify-center hover:bg-gray-200 transition-colors">
                  <FiSend className="w-4 h-4" />
                </button>

              </div>

              <p className="text-xs text-gray-500">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-5">

          <p className="text-sm text-gray-500">
            © {currentYear} BuyNest. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className=" w-9 h-9 rounded-lg bg-gray-800 hover:bg-white flex items-center justify-center group  transition-all duration-200">
                <social.icon className=" w-4 h-4 text-gray-500 group-hover:text-gray-900 transition-colors"/>
              </a>
            ))}
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;