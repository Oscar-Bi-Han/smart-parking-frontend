import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) throw new Error("Invalid email or password");
      setLoading(false);
      navigate("/admin/logs");
    } catch (err) {
      setLoading(false);
      setError("Invalid email or password.");
    }
  };

  const isFormValid = validateEmail(email) && password.length >= 6;

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto px-4 py-8 bg-white rounded-lg shadow-md flex flex-col gap-2 sm:gap-4 mt-10 mb-10">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Admin Login</h1>
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2 font-medium ">Email</label>
        <input id="email" type="email" className="w-full border rounded px-3 py-3  focus:outline-none focus:ring-2 focus:ring-blue-400" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block mb-1 font-medium ">Password</label>
        <input id="password" type="password" className="w-full border rounded px-3 py-3  focus:outline-none focus:ring-2 focus:ring-blue-400" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <button type="submit" disabled={!isFormValid || loading} className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50">{loading ? "Logging in..." : "Login as Admin"}</button>
      <div className="mt-4 text-start">
        <span>Don't have an admin? </span>
        <Link to="/admin/register" className="text-blue-600 hover:underline ">Register an admin.</Link>
      </div>
    </form>
  );
};

export default AdminLogin;
