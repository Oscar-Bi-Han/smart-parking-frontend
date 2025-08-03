import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CentralProvider } from "./contexts";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import ParkingLots from "./pages/ParkingLots";
import LotSpaces from "./pages/LotSpaces";
import ForgotPassword from "./pages/ForgotPassword";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
import AdminLogs from "./pages/AdminLogs";
import { Toaster } from "react-hot-toast";


function App() {

  return (
    <CentralProvider>
      <Router>
        <Routes>
          {/* Main app routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index path="/" element={<ParkingLots />} />
            <Route path="/lots/:lotId" element={<LotSpaces />} />
          </Route>

          {/* Auth routes */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="/auth/login" element={<Login />} />
            <Route
              path="/auth/forgot-password"
              element={<ForgotPassword />}
            />
            <Route path="/auth/register" element={<Register />} />
          </Route>

          {/* Admin Auth routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin/logs" element={<AdminLogs />} />

          {/* Catch-all for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
    </CentralProvider>
  );
}

export default App;
