import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      console.log("Submitting form:", { email, password });

      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      toast.success(`Welcome back, ${data.name || "User"}!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Save role and authentication status
      localStorage.setItem("role", data.role);
      if (data.role === "Admin") {
        localStorage.setItem("adminAuthenticated", "true");
        navigate("/admin/users");
      } else {
        localStorage.setItem("userAuthenticated", "true");
        navigate("/user/home");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error((error as Error).message || "An error occurred", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-6xl sm:mx-auto w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-700 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative bg-white shadow-lg sm:rounded-3xl sm:p-20 p-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Image Section */}
              <div className="hidden md:block relative">
                <div className="relative h-full">
                  <img
                    src="/Side.png"
                    alt="Car"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <img
                    src="/login.jpg"
                    alt="Overlay"
                    className="absolute inset-0 w-full h-full object-cover rounded-lg mix-blend-overlay"
                  />
                </div>
              </div>

              {/* Form Section */}
              <div className="flex flex-col justify-center">
                <h1 className="text-purple-700 text-3xl font-bold mb-2">V2 Enterprises</h1>
                <h2 className="text-gray-600 text-xl mb-8">Nice to see you again</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300"
                  >
                    Log in
                  </button>

                  <div className="space-y-4">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or continue with</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-300"
                      >
                        <img
                          src="/google.png"
                          alt="Google"
                          className="w-5 h-5 mr-2"
                        />
                        Google
                      </button>
                      <button
                        type="button"
                        className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-300"
                      >
                        <img
                          src="/facebook.png"
                          alt="Facebook"
                          className="w-5 h-5 mr-2"
                        />
                        Facebook
                      </button>
                    </div>
                  </div>

                  <p className="text-center text-gray-600">
                    Don't have an account?{' '}
                    <a href="/signup" className="text-purple-600 hover:text-purple-700">
                      Sign up
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
