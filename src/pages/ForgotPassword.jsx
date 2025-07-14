import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
      {submitted ? (
        <p className="text-green-700 text-sm">If an account with that email exists, a password reset link has been sent.</p> 
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block mb-1 font-medium text-sm sm:text-base">Email</label>
            <input
              id="email"
              type="email"
              className="w-full border rounded px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded disabled:opacity-50 text-sm sm:text-base font-semibold shadow-md"
            disabled={!email}
          >
            Send Reset Link
          </button>
        </form>
      )}
      <button
        type="button"
        className="w-full mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded text-sm sm:text-base font-semibold"
        onClick={() => window.location.href = "/auth/login"}
      >
        Back to Login
      </button>
    </div>
  );
};

export default ForgotPassword;
