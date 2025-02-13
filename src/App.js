import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import BillionEye from "./pages/BillionEye";
import RegisterPage from "./pages/userRegistration";
import LoginPage from "./pages/userLogin";
import BmcDashboard from "./pages/Report";
import BbsrDashboard from "./pages/Reports/BmcDashboard";
import HospitalDashboard from "./pages/Reports/HospitalDashboard";
import PoliceStationDashboard from "./pages/Reports/PoliceStation";
import ServiceLogin from "./pages/serviceLogin";
import CameraPage from "./pages/CameraPage";
import Dashboard from "./pages/Dashboard";
import BillionEyePublic from "./pages/BillionEyePublic";
import "./public/assets/css/bootstrap/scss/bootstrap.scss";
import IncidentReport from "./pages/IncidentReport";
import Demo from "./pages/demo";
// Protected Route Component
const ProtectedRoute = ({ element: Element }) => {
  const isAuthenticated = !!localStorage.getItem("token"); // Check if the user is authenticated

  return isAuthenticated ? (
    <Element />
  ) : (
    <Navigate to="/login" replace /> // Redirect to login if not authenticated
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<BillionEye />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Public" element={<BillionEyePublic />} />
        <Route path="/Camera" element={<CameraPage />} />
        <Route path="/incidentReport" element={<IncidentReport />} />
        {/* <Route
          path="/Camera" element={<CameraPage />} /> */}

        {/* Protected Routes */}
        <Route
          path="/bmcreport"
          element={<ProtectedRoute element={BmcDashboard} />}
        />
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={Dashboard} />}
        />
        <Route
          path="/bbsrReport"
          element={<ProtectedRoute element={BbsrDashboard} />}
        />
        <Route
          path="/HospitalDashboard"
          element={<ProtectedRoute element={HospitalDashboard} />}
        />
        <Route
          path="/PoliceStation"
          element={<ProtectedRoute element={PoliceStationDashboard} />}
        />

        

        <Route
          path="/ServiceLogin"
          element={<ProtectedRoute element={ServiceLogin} />}
        />

        <Route path="/demo" element={<ProtectedRoute element={Demo} />} />
      </Routes>
    </Router>
  );
}

export default App;
