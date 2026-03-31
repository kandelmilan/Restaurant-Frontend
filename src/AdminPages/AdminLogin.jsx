// src/pages/AdminLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import foodImage from "../assets/12.jpg";

const AdminLogin = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(email, password);
    if (result.success) {
      setError("");
      navigate("/admin"); // go to admin dashboard
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f5f3f1]">
      {/* LEFT IMAGE */}
      <div className="hidden md:block md:w-1/2 h-screen relative">
        <img src={foodImage} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute bottom-10 left-10 text-white max-w-sm">
          <h1 className="text-3xl font-serif mb-2">Masala Zen</h1>
          <p className="text-sm text-gray-200">
            Admin portal — manage your menu, orders, and restaurant operations.
          </p>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-semibold text-gray-800 mb-2">
            Admin Login
          </h2>
          <p className="text-gray-500 mb-6 text-sm">
            Sign in to access the admin dashboard
          </p>

          {error && (
            <div className="mb-4 text-red-500 text-sm">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                placeholder="admin@masalazen.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <button
              type="submit"
              className="mt-4 bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;