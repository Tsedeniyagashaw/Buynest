import { useState } from "react";
import { FiMail, FiMapPin, FiPhone, FiSend, FiCheck, FiClock, FiGlobe, } from "react-icons/fi";
import API from "../services/api";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await API.post("/contact", formData);

      setSuccess(true);

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to send message. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: FiMapPin,
      title: "Visit Us",
      details: ["Bole", "Addis Ababa", "Ethiopia"],
    },
    {
      icon: FiMail,
      title: "Email Us",
      details: ["support@buynest.com", "hello@buynest.com"],
      link: "mailto:support@buynest.com",
    },
    {
      icon: FiPhone,
      title: "Call Us",
      details: ["+251 93123-4567", "+251 987-6543"],
      link: "tel:+2519234567",
    },
    {
      icon: FiClock,
      title: "Working Hours",
      details: [
        "Monday - Friday: 9AM - 9PM",
        "Saturday: 10AM - 6PM",
        "Sunday: Closed",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative overflow-hidden bg-gray-900 py-16 md:py-20">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>

            Get in Touch
          </div>

          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            Contact Us
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-gray-300 md:text-xl">
            Have questions? We'd love to hear from you. Send us a message and
            we'll get back to you as soon as possible.
          </p>
        </div>
      </div>

      <div className="relative z-10 mx-auto -mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-5">
          <div className="space-y-4 md:col-span-2">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-gray-300 hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100">
                    <info.icon className="h-6 w-6 text-gray-900" />
                  </div>

                  <div>
                    <h3 className="mb-1 font-semibold text-gray-900">
                      {info.title}
                    </h3>

                    {info.details.map((detail, idx) => (
                      <p
                        key={idx}
                        className="text-sm text-gray-500"
                      >
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="md:col-span-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
              <div className="mb-7">
                <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
                  Send a message
                </p>

                <h2 className="mt-1 text-2xl font-bold text-gray-900">
                  We'd love to hear from you
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Fill out the form below and our team will get back to you.
                </p>
              </div>

              {success && (
                <div className="mb-6 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100">
                    <FiCheck className="h-4 w-4 text-green-600" />
                  </div>

                  <p className="text-sm font-medium text-green-700">
                    Message sent successfully! We'll get back to you soon.
                  </p>
                </div>
              )}

              {error && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
                  <p className="text-sm font-medium text-red-700">
                    {error}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Your Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Subject
                  </label>

                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Order Inquiry"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Message
                  </label>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder="Your message here..."
                    className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 py-3.5 font-semibold text-white shadow-sm transition-all duration-200 hover:bg-gray-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <FiSend className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="relative flex h-[300px] items-center justify-center bg-gray-100 md:h-[400px]">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
                <FiGlobe className="h-7 w-7 text-gray-700" />
              </div>

              <p className="font-semibold text-gray-900">
                Google Maps Integration
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Bole, Addis Ababa, Ethiopia
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;