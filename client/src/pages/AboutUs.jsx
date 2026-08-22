import {
  FiUsers,
  FiPackage,
  FiHeadphones,
  FiStar,
  FiShield,
  FiTruck,
  FiRefreshCw,
  FiAward,
  FiHeart,
  FiGlobe,
  FiChevronRight,
} from "react-icons/fi";
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
      description:
        "We carefully curate our product selection to ensure only the highest quality items reach our customers.",
    },
    {
      icon: FiHeart,
      title: "Customer Centric",
      description:
        "Your satisfaction is our priority. We're committed to providing exceptional service at every step.",
    },
    {
      icon: FiGlobe,
      title: "Global Reach",
      description:
        "Connecting customers worldwide with products that bring joy and convenience to their lives.",
    },
    {
      icon: FiAward,
      title: "Excellence",
      description:
        "We strive for excellence in everything we do, from product selection to delivery and support.",
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image:
        "https://ui-avatars.com/api/?name=Sarah+Johnson&background=111827&color=fff&size=128",
    },
    {
      name: "Michael Chen",
      role: "Head of Operations",
      image:
        "https://ui-avatars.com/api/?name=Michael+Chen&background=111827&color=fff&size=128",
    },
    {
      name: "Emily Rodriguez",
      role: "Customer Experience",
      image:
        "https://ui-avatars.com/api/?name=Emily+Rodriguez&background=111827&color=fff&size=128",
    },
    {
      name: "David Kim",
      role: "Product Manager",
      image:
        "https://ui-avatars.com/api/?name=David+Kim&background=111827&color=fff&size=128",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gray-900 px-4 py-20 text-white md:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            About BuyNest
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Your Trusted Shopping
            <span className="block text-gray-300">Destination</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">
            We're passionate about bringing you the best products with
            unmatched service and convenience.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 mx-auto -mt-8 max-w-5xl px-4">
        <div className="grid grid-cols-2 divide-x divide-y divide-gray-200 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg md:grid-cols-4 md:divide-y-0">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group p-5 text-center transition hover:bg-gray-50 md:p-6"
            >
              <div className="mb-3 flex justify-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 transition group-hover:bg-gray-900">
                  <stat.icon className="h-5 w-5 text-gray-700 transition group-hover:text-white" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 md:text-3xl">
                {stat.number}
              </h3>

              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-500">
              Who we are
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Our Story
            </h2>

            <div className="mt-4 h-1 w-16 rounded-full bg-gray-900" />

            <p className="mt-6 leading-relaxed text-gray-600">
              Founded in 2024, BuyNest was born from a simple idea: make
              quality products accessible to everyone. What started as a small
              online store has grown into a trusted shopping destination for
              thousands of customers.
            </p>

            <p className="mt-4 leading-relaxed text-gray-600">
              We believe in the power of great products to enhance lives.
              That's why we carefully select every item in our collection,
              ensuring it meets our high standards for quality, value, and
              sustainability.
            </p>

            <div className="mt-7 flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                  <FiShield className="h-4 w-4 text-gray-700" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Quality Guaranteed
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                  <FiTruck className="h-4 w-4 text-gray-700" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Fast Delivery
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                  <FiRefreshCw className="h-4 w-4 text-gray-700" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Easy Returns
                </span>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop"
              alt="BuyNest shopping"
              className="h-[300px] w-full object-cover md:h-[400px]"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-gray-200 bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-500">
              What matters to us
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Our Values
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-500">
              The principles that guide everything we do at BuyNest.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <div
                key={index}
                className="group rounded-2xl border border-gray-200 bg-gray-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:bg-white hover:shadow-md"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm transition group-hover:bg-gray-900">
                  <value.icon className="h-6 w-6 text-gray-700 transition group-hover:text-white" />
                </div>

                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  {value.title}
                </h3>

                <p className="text-sm leading-relaxed text-gray-500">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-500">
            The people behind BuyNest
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Meet Our Team
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            The passionate people working to bring you the best shopping
            experience.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-200 bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <img
                src={member.image}
                alt={member.name}
                className="mx-auto mb-4 h-24 w-24 rounded-full border-4 border-gray-100"
              />

              <h3 className="font-semibold text-gray-900">
                {member.name}
              </h3>

              <p className="mt-1 text-sm text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gray-900 px-6 py-12 text-center sm:px-12">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              Want to Work With Us?
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-gray-400">
              We're always looking for talented individuals to join our team.
            </p>

            <Link
              to="/contact"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 font-semibold text-gray-900 shadow-sm transition hover:bg-gray-100 active:scale-[0.98]"
            >
              Get in Touch
              <FiChevronRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;