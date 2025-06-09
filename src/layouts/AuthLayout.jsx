import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthUser } from "../contexts/AuthUserContext";

const AuthLayout = () => {

  const {authUser} = useAuthUser();

  if (authUser) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300 w-full overflow-hidden relative">
      <div className="md:hidden sm:block absolute top-0 left-0 w-full h-[25vh] block bg-[url('https://sensordynamics.com.au/wp-content/uploads/2023/06/smart-parking.jpeg')] bg-bottom object-contain md:bg-none scale-110"></div>
      <div className=" flex flex-col items-start w-full md:max-w-md p-4 sm:p-8 h-[75vh] min-h-[500px] md:h-auto bg-white  rounded-t-xl self-end md:rounded-xl md:self-center shadow-lg z-10">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
