import { useState } from "react";
import API from "../services/api";

function Register() {
  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "buyer",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await API.post("/auth/register", form);

      console.log(res.data);
      alert("Registered Successfully");

      setForm({
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "buyer",
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Registration failed",
      );

      console.log(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    if (error) setError("");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-8 shadow-sm sm:p-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Create Account
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Join us and start shopping today
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-medium text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                First Name
              </label>

              <input
                name="firstName"
                placeholder="John"
                value={form.firstName}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Last Name
              </label>

              <input
                name="lastName"
                placeholder="Doe"
                value={form.lastName}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Middle Name{" "}
              <span className="text-xs font-normal text-gray-400">
                (optional)
              </span>
            </label>

            <input
              name="middleName"
              placeholder="Middle Name"
              value={form.middleName}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email Address
            </label>

            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Phone Number
            </label>

            <input
              name="phoneNumber"
              type="tel"
              placeholder="+1 234 567 8900"
              value={form.phoneNumber}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
              minLength="6"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
            />

            <p className="mt-1.5 text-xs text-gray-400">
              Must be at least 6 characters
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              I want to register as a
            </label>

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full cursor-pointer rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gray-900 px-4 py-3 font-semibold text-white transition hover:bg-gray-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="mr-3 h-5 w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />

                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>

                Creating Account...
              </span>
            ) : (
              "Create Account"
            )}
          </button>

          <p className="pt-1 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-semibold text-gray-900 transition hover:text-gray-600 hover:underline"
            >
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;