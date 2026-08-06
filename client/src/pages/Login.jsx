import { useState, useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  // Where the user wanted to go before logging in
  const from = location.state?.from?.pathname || "/";

  // Optional message from ProtectedRoute
  const message = location.state?.message;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await API.post("/auth/login", form);

      login(res.data.token);

      const role = res.data.user.role;

      if (role === "admin") {
        navigate("/admin", { replace: true });
      } else if (role === "seller") {
        navigate("/seller", { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    } catch (err) {
      console.log(err.response?.data);
      alert("Login Failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full transform transition-all hover:scale-105 duration-300">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h1>

          <p className="text-gray-500 text-sm">
            Sign in to continue to your account
          </p>

          {message && (
            <div className=" p-3 rounded-lg font-bold  text-blue-700 text-sm">
              {message}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>

            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              onChange={handleChange}
              value={form.email}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <input
              name="password"
              type="password"
              placeholder="••••••••"
              onChange={handleChange}
              value={form.password}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400"
            />
          </div>

          <div className="text-right">
            <a
              href="#"
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-300 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />

                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>

                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>

            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">or</span>
            </div>
          </div>

          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              try {
                const res = await API.post("/auth/google", {
                  credential: credentialResponse.credential,
                });

                login(res.data.token);

                const role = res.data.user.role;

                if (role === "admin") {
                  navigate("/admin", { replace: true });
                } else if (role === "seller") {
                  navigate("/seller", { replace: true });
                } else {
                  navigate(from, { replace: true });
                }
              } catch (err) {
                console.log(err.response?.data);
                alert("Google login failed");
              }
            }}
            onError={() => {
              console.log("Google Login Failed");
            }}
          />

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:text-blue-800 font-semibold hover:underline transition-colors"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;