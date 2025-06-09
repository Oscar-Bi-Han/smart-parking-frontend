import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthUser } from "../contexts/AuthUserContext";

const MainLayout = () => {

    const { authUser, loading } = useAuthUser();
    if (loading) {
      return <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>;
    }

    if(!authUser) {
      return <Navigate to="/auth/login" replace />;
    }
    

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
