/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { Link, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import UserManagement from "./UserManagement";
import Transaction from "./Transaction";
import ReportGeneration from "./Report";
import PaymentProcessing from "./Payment";
import PolicyManagement from "./PolicyManagement";
import QuoteRequestManagement from "./AdminQuote";
// import StatisticsBox from "./StatisticsBox";
import {  Menu,  Users } from "lucide-react";

type StatsType = {
  totalUsers: number;
  listedPolicies: number;
  listedCategories: number;
  totalQuestions: number;
  appliedPolicyHolders: number;
  approvedPolicyHolders: number;
  disapprovedPolicyHolders: number;
  pendingPolicyHolders: number;
};

const AdminLayout = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
  const [, setStats] = useState<StatsType>({
    totalUsers: 0,
    listedPolicies: 0,
    listedCategories: 0,
    totalQuestions: 0,
    appliedPolicyHolders: 0,
    approvedPolicyHolders: 0,
    disapprovedPolicyHolders: 0,
    pendingPolicyHolders: 0,
  });

  useEffect(() => {
    const fetchStats = () => {
      const users = JSON.parse(localStorage.getItem("users") || "[]") as any[];
      const policies = JSON.parse(localStorage.getItem("policies") || "[]") as any[];
      const categories = JSON.parse(localStorage.getItem("categories") || "[]") as any[];
      const questions = JSON.parse(localStorage.getItem("questions") || "[]") as any[];
      const appliedPolicies = JSON.parse(localStorage.getItem("appliedPolicies") || "[]") as { status: string }[];
      const approvedPolicies = appliedPolicies.filter((p) => p.status === "Approved").length;
      const disapprovedPolicies = appliedPolicies.filter((p) => p.status === "Disapproved").length;
      const pendingPolicies = appliedPolicies.filter((p) => p.status === "Pending").length;
      setStats({
        totalUsers: users.length,
        listedPolicies: policies.length,
        listedCategories: categories.length,
        totalQuestions: questions.length,
        appliedPolicyHolders: appliedPolicies.length,
        approvedPolicyHolders: approvedPolicies,
        disapprovedPolicyHolders: disapprovedPolicies,
        pendingPolicyHolders: pendingPolicies,
      });
    };
    fetchStats();
    window.addEventListener("storage", fetchStats);
    return () => window.removeEventListener("storage", fetchStats);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    navigate("/");
  };

  const closeSidebar = () => {
    if (isMobile) setSidebarOpen(false);
  };

  return (
    <div className="dashboard-container flex h-screen bg-gradient-to-r from-white via-white to-white text-black">
      <div className={`sidebar bg-purple-800 shadow-lg transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} w-64 fixed lg:relative inset-y-0 left-0 z-50`}>
        <h2 className="sidebar-header text-center py-4 bg-purple-800 text-purple-300 font-bold">
          <Link to="/admin/users" onClick={closeSidebar}>Admin Dashboard</Link>
        </h2>
        <nav className="sidebar-nav">
          <ul className="py-4 space-y-2">
            <li>
              <NavLink
                to="/admin/users"
                onClick={closeSidebar}
                className={({ isActive }) => `flex items-center px-4 py-2 hover:bg-purple-700 transition duration-300 rounded-md ${isActive ? "bg-purple-700" : ""}`}
              >
                <Users size={20} className="mr-2 text-yellow-300" />
                <span className="text-gray-300">User Management</span>
              </NavLink>
              <NavLink
                to="/admin/transactions"
                onClick={closeSidebar}
                className={({ isActive }) => `flex items-center px-4 py-2 hover:bg-purple-700 transition duration-300 rounded-md ${isActive ? "bg-purple-700" : ""}`}
              >
                <Users size={20} className="mr-2 text-yellow-300" />
                <span className="text-gray-300">Transactions</span>
              </NavLink>
              <NavLink
                to="/admin/reports"
                onClick={closeSidebar}
                className={({ isActive }) => `flex items-center px-4 py-2 hover:bg-purple-700 transition duration-300 rounded-md ${isActive ? "bg-purple-700" : ""}`}
              >
                <Users size={20} className="mr-2 text-yellow-300" />
                <span className="text-gray-300">Reports</span>
              </NavLink>
              <NavLink
                to="/admin/payments"
                onClick={closeSidebar}
                className={({ isActive }) => `flex items-center px-4 py-2 hover:bg-purple-700 transition duration-300 rounded-md ${isActive ? "bg-purple-700" : ""}`}
              >
                <Users size={20} className="mr-2 text-yellow-300" />
                <span className="text-gray-300">Payments</span>
              </NavLink>
              <NavLink
                to="/admin/policies"
                onClick={closeSidebar}
                className={({ isActive }) => `flex items-center px-4 py-2 hover:bg-purple-700 transition duration-300 rounded-md ${isActive ? "bg-purple-700" : ""}`}
              >
                <Users size={20} className="mr-2 text-yellow-300" />
                <span className="text-gray-300">Policies</span>
              </NavLink>
              <NavLink
                to="/admin/quotes"
                onClick={closeSidebar}
                className={({ isActive }) => `flex items-center px-4 py-2 hover:bg-purple-700 transition duration-300 rounded-md ${isActive ? "bg-purple-700" : ""}`}
              >
                <Users size={20} className="mr-2 text-yellow-300" />
                <span className="text-gray-300">Quotes</span>
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="logout-button-container px-4 py-2">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>

      <main className={`main-content flex-1 overflow-y-auto transition-all duration-300 ease-in-out ${isSidebarOpen && isMobile ? "ml-64" : ""} p-6`}>
        <button
          className="lg:hidden absolute top-4 left-4 z-30 p-2 bg-purple-700 text-yellow-300 rounded-md shadow-md"
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          aria-label="Toggle Sidebar"
        >
          <Menu size={20} />
        </button>
        <Routes>
          <Route path="/users" element={<UserManagement />} />
          <Route path="/transactions" element={<Transaction />} />
          <Route path="/reports" element={<ReportGeneration />} />
          <Route path="/payments" element={<PaymentProcessing />} />
          <Route path="/policies" element={<PolicyManagement />} />
          <Route path="/quotes" element={<QuoteRequestManagement />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminLayout;
