import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const AdminRegister = () => {
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
      const res = await fetch(`${API}/admin/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Registration failed");
      }
      setLoading(false);
      navigate("/admin/logs");
    } catch (err) {
      setLoading(false);
      setError(err.message || "Registration failed.");
    }
  };

  const isFormValid = validateEmail(email) && password.length >= 6;

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
      <h1 className="text-3xl font-bold mt-5 mb-5">Admin Registration</h1>
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2 font-medium ">Email</label>
        <input id="email" type="email" className="w-full border rounded px-3 py-3  focus:outline-none focus:ring-2 focus:ring-blue-400" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block mb-1 font-medium ">Password</label>
        <input id="password" type="password" className="w-full border rounded px-3 py-3  focus:outline-none focus:ring-2 focus:ring-blue-400" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <button type="submit" disabled={!isFormValid || loading} className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50">{loading ? "Registering..." : "Register as Admin"}</button>
      <div className="mt-4 text-center">
        <span>Already have an admin account? </span>
        <Link to="/admin/login" className="text-blue-600 hover:underline">Login</Link>
      </div>
    </form>
  );
};

export default AdminRegister;
