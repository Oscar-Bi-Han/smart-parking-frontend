import React from "react";
import { useAuthUser } from "../contexts/AuthUserContext";

const LogoutButton = () => {
  const { logout } = useAuthUser();

  const handleLogout = async () => {
    try {
      await logout();
      alert("Logged out successfully!");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <button
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      onClick={handleLogout}
    >   
      Logout
    </button>
  );
};

export default LogoutButton;