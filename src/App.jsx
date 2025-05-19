import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import ParkingLots from "./pages/ParkingLots";
import LotSpaces from "./pages/LotSpaces";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
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
        </Route>

        {/* Catch-all for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
