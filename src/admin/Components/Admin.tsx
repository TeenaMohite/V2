import React, { useEffect, useState } from "react";
import { Link, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import UserManagement from "./UserManagement";
import Transaction from "./Transaction";
import ReportGeneration from "./Report";
import PaymentProcessing from "./Payment";
import PolicyManagement from "./PolicyManagement";
import QuoteRequestManagement from "./AdminQuote";
import StatisticsBox from "./StatisticsBox";
import { FileText, HelpCircle, List, Menu, UserCheck, Users, UserX } from "lucide-react";

const AdminLayout = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [stats, setStats] = useState({
    totalUsers: 0,
    listedPolicies: 0,
    listedCategories: 0,
    totalQuestions: 0,
    appliedPolicyHolders: 0,
    approvedPolicyHolders: 0,
    disapprovedPolicyHolders: 0,
    pendingPolicyHolders: 0,
  });

  // Fetch stats from localStorage
  useEffect(() => {
    const fetchStats = () => {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const policies = JSON.parse(localStorage.getItem("policies") || "[]");
      const categories = JSON.parse(localStorage.getItem("categories") || "[]");
      const questions = JSON.parse(localStorage.getItem("questions") || "[]");
      const appliedPolicies = JSON.parse(localStorage.getItem("appliedPolicies") || "[]");
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

  // Handle window resize to detect mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    navigate("/");
  };

  // Close sidebar on navigation link click (for small screens)
  const closeSidebar = () => {
    if (isMobile) setSidebarOpen(false);
  };

  return (
    <div className="dashboard-container flex h-screen bg-gradient-to-r from-white via-white to-white text-black">
      {/* Sidebar */}
      <div
        className={`sidebar bg-purple-800 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } w-64 fixed lg:relative inset-y-0 left-0 z-50`}
      >
        <h2 className="sidebar-header text-center py-4 bg-purple-800 text-purple-300 font-bold">
          <Link to="/admin" onClick={closeSidebar}>Admin Dashboard</Link>
        </h2>
        <nav className="sidebar-nav">
          <ul className="py-4 space-y-2">
            <li>
              <NavLink
                to="/admin/users"
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 hover:bg-purple-700 transition duration-300 rounded-md ${
                    isActive ? "bg-purple-700" : ""
                  }`
                }
              >
                <Users size={20} className="mr-2 text-yellow-300" />
                <span className="text-gray-300">User Management</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/transactions"
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 hover:bg-purple-700 transition duration-300 rounded-md ${
                    isActive ? "bg-purple-700" : ""
                  }`
                }
              >
                <FileText size={20} className="mr-2 text-yellow-300" />
                <span className="text-gray-300">Transactions</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/reports"
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 hover:bg-purple-700 transition duration-300 rounded-md ${
                    isActive ? "bg-purple-700" : ""
                  }`
                }
              >
                <List size={20} className="mr-2 text-yellow-300" />
                <span className="text-gray-300">Reports</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/payments"
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 hover:bg-purple-700 transition duration-300 rounded-md ${
                    isActive ? "bg-purple-700" : ""
                  }`
                }
              >
                <HelpCircle size={20} className="mr-2 text-yellow-300" />
                <span className="text-gray-300">Payments</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/policies"
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 hover:bg-purple-700 transition duration-300 rounded-md ${
                    isActive ? "bg-purple-700" : ""
                  }`
                }
              >
                <FileText size={20} className="mr-2 text-yellow-300" />
                <span className="text-gray-300">Policy Management</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/quotes"
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 hover:bg-purple-700 transition duration-300 rounded-md ${
                    isActive ? "bg-purple-700" : ""
                  }`
                }
              >
                <List size={20} className="mr-2 text-yellow-300" />
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

      {/* Main Content */}
      <main
        className={`main-content flex-1 overflow-y-auto transition-all duration-300 ease-in-out ${
          isSidebarOpen && isMobile ? "ml-64" : ""
        } p-6`}
      >
        {/* Hamburger Menu Button for Small Screens */}
        <button
          className="lg:hidden absolute top-4 left-4 z-30 p-2 bg-purple-700 text-yellow-300 rounded-md shadow-md"
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          aria-label="Toggle Sidebar"
        >
          <Menu size={20} />
        </button>

        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h3 className="text-xl font-bold text-black mb-4">Welcome to Admin Dashboard</h3>
                <div className="stats-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-lg">
                    <div className="bg-[#6A2E8E] text-white p-4 rounded-lg shadow-md">
                      <StatisticsBox
                        title="Total Registered Users"
                        value={stats.totalUsers}
                        icon={<Users className="text-purple-300" />}
                      />
                    </div>
                    <div className="bg-[#6A2E8E] text-white p-4 rounded-lg shadow-md">
                      <StatisticsBox
                        title="Listed Policies"
                        value={stats.listedPolicies}
                        icon={<FileText className="text-purple-300" />}
                      />
                    </div>
                    <div className="bg-[#6A2E8E] text-white p-4 rounded-lg shadow-md">
                      <StatisticsBox
                        title="Listed Categories"
                        value={stats.listedCategories}
                        icon={<List className="text-purple-300" />}
                      />
                    </div>
                    <div className="bg-[#6A2E8E] text-white p-4 rounded-lg shadow-md">
                      <StatisticsBox
                        title="Total Questions"
                        value={stats.totalQuestions}
                        icon={<HelpCircle className="text-purple-300" />}
                      />
                    </div>
                    <div className="bg-[#6A2E8E] text-white p-4 rounded-lg shadow-md">
                      <StatisticsBox
                        title="Total Applied Policy Holders"
                        value={stats.appliedPolicyHolders}
                        icon={<Users className="text-purple-300" />}
                      />
                    </div>
                    <div className="bg-[#6A2E8E] text-white p-4 rounded-lg shadow-md">
                      <StatisticsBox
                        title="Approved Policy Holders"
                        value={stats.approvedPolicyHolders}
                        icon={<UserCheck className="text-green-500" />}
                      />
                    </div>
                    <div className="bg-[#6A2E8E] text-white p-4 rounded-lg shadow-md">
                      <StatisticsBox
                        title="Disapproved Policy Holders"
                        value={stats.disapprovedPolicyHolders}
                        icon={<UserX className="text-red-500" />}
                      />
                    </div>
                    <div className="bg-[#6A2E8E] text-white p-4 rounded-lg shadow-md">
                      <StatisticsBox
                        title="Policy Holders Waiting For Approval"
                        value={stats.pendingPolicyHolders}
                        icon={<UserCheck className="text-yellow-500" />}
                      />
                    </div>
                  </div>

              </>
            }
          />
          <Route path="users" element={<UserManagement />} />
          <Route path="transactions" element={<Transaction />} />
          <Route path="reports" element={<ReportGeneration />} />
          <Route path="payments" element={<PaymentProcessing />} />
          <Route path="policies" element={<PolicyManagement />} />
          <Route path="quotes" element={<QuoteRequestManagement />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminLayout;