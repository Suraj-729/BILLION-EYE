import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import BillionEye from "./pages/BillionEye";
import RegisterPage from "./pages/userRegistration";
import LoginPage from "./pages/userLogin";

import ServiceLogin from "./pages/serviceLogin";
import CameraPage from "./pages/CameraPage";
import Dashboard from "./pages/Dashboard";
import BillionEyePublic from "./pages/BillionEyePublic";
import "./public/assets/css/bootstrap/scss/bootstrap.scss";
import OnBoardingStaff from "./pages/OnBoardingStaff";
import EventReport from "./Agency/EventReport";
import Demo from "./pages/demo";
import GoMapsTest from "./pages/gomaps";
import AgencyLogin from "./Agency/AgencyLogin";
import AgencyRegister from "./Agency/AgencyRegister";
import GroundStaffTax from "./Agency/GroundStaff";
import OngoingTax from "./Agency/OngoingTax";
import AssignGroundStaff from "./Agency/assignGroundstaff";
import ForgotPassword from "../src/Agency/ForgetPassword";

// Protected Route Component
const ProtectedRoute = ({ element: Element }) => {
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? (
    <Element />
  ) : (
    <Navigate to="/agencyLogin" replace />
  );
};

function App() {
  return (
    <BrowserRouter basename="/billioneye">
      <Routes>
        {/* Public Routes */}
        <Route path="/Agency" element={<BillionEye />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<BillionEyePublic />} />
        <Route path="/Camera" element={<CameraPage />} />
        <Route path="/onBoardingStaff" element={<ProtectedRoute element={OnBoardingStaff} />} />
        <Route path="/eventReport/:event_id"  element={<ProtectedRoute element={EventReport} />} />
        <Route path="/gomaps" element={<GoMapsTest />} />
        <Route path="/agencyLogin" element={<AgencyLogin />} />
        <Route path="/agencyRegister" element={<AgencyRegister />} />
        <Route path="/groundstaffTax" element={<GroundStaffTax />} />
        <Route path="/ongoingTax" element={<OngoingTax />} />
        <Route
          path="/dashboard/:agencyId"
          element={<ProtectedRoute element={Dashboard} />}
        />
        <Route path="/assignGroundstaff" element={<ProtectedRoute element={AssignGroundStaff} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Routes */}

        <Route
          path="/ServiceLogin"
          element={<ProtectedRoute element={ServiceLogin} />}
        />
        <Route path="/demo" element={<ProtectedRoute element={Demo} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
