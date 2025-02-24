import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./user/pages/Login/Login";
import Signup from "./user/pages/Signup/Signup";
import UserLayout from "./user/UserComponents/UserLayout/UserLayout";
import AdminLayout from "./admin/Components/Admin";
import PaymentProcessing from "./admin/Components/Payment";
import PolicyManagement from "./admin/Components/PolicyManagement";
import Services from "./admin/Components/Service";
import About from "./admin/Components/AboutUs";
import UserProvider from "./user/UserComponents/User/UserContext";
import CoverPage from "./admin/Components/CoverPage";

// Private Route for Admin
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAdminAuthenticated = localStorage.getItem("adminAuthenticated") === "true";
  return isAdminAuthenticated ? children : <Navigate to="/login" />;
};

// Private Route for Users
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isUserAuthenticated = localStorage.getItem("userAuthenticated") === "true";
  return isUserAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => (
  <UserProvider>
    <Router>
      <div className="app min-h-screen bg-gradient-to-r from-yellow-900 via-yellow-800 to-yellow-900 text-white">
        <Routes>
          {/* Redirect "/" to Cover Page */}
          <Route path="/" element={<CoverPage />} />
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          {/* Protected Routes for Users */}
          <Route
            path="/user/*"
            element={
              <ProtectedRoute>
                <UserLayout />
              </ProtectedRoute>
            }
          />
          {/* Protected Routes for Admin */}
          <Route
            path="/admin/*"
            element={
              <PrivateRoute>
                <AdminLayout />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/payment-processing"
            element={
              <PrivateRoute>
                <PaymentProcessing />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/policy-management"
            element={
              <PrivateRoute>
                <PolicyManagement />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  </UserProvider>
);

export default App;