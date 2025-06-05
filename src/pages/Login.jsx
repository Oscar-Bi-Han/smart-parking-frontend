import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthUser } from "../contexts/AuthUserContext";

const validateEmail = (email) => {
  // Simple email regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const Login = () => {
  const { login, loading } = useAuthUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  const isFormValid = validateEmail(email) && password.length >= 6;

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto"
    >
      <h1 className="text-3xl font-bold mt-5 mb-5">Welcome!</h1>
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2 font-medium ">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="w-full border rounded px-3 py-3  focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block mb-1 font-medium ">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="w-full border rounded px-3 py-3  focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded disabled:opacity-50 font-semibold shadow-md mt-4 mb-4"
        disabled={!isFormValid || loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
      <div className="flex justify-end">
        <Link
          to="/auth/forgot-password"
          className="text-blue-600 hover:underline text-sm"
        >
          Forgot password?
        </Link>
      </div>
    </form>
  );
};

export default Login;
