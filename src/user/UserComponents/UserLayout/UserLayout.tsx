import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "../../pages/Home/Home";
import RequestQuote from "../../pages/RequestQuote/UserRequestQuote";
import IssuedPolicies from "../../pages/IssuedPolicies/IssuedPolicies";
import CreatePolicy from "../../pages/IssuedPolicies/CreatePolicy";
import PolicyDetails from "../../pages/IssuedPolicies/PolicyDetails";
import Help from "../../pages/Help/Help";
import TicketList from "../../pages/Help/TicketList";
import CreateTicket from "../../pages/Help/CreateTicket";
import TicketView from "../../pages/Help/TicketView";
import UserProfile from "../../pages/UserProfile/UserProfile";
import UserSettings from "../../pages/settings/UserSettings";
import { NavLink } from "react-router-dom";
import { Home as HomeIcon, Car, FileText, LogOut, FileCheck, Settings, HelpCircle, Menu } from "lucide-react";
import UserQuoteDetailsPage from "../../pages/User_Quotes/UserQuoteDetailsPage";
import UserQuotesList from "../../pages/User_Quotes/UserQuotesList";
// import UserNavbar from "../UserNavbar/UserNavbar";

const UserLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth > 1024);
  const navigate = useNavigate();

  // Toggle Sidebar
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setSidebarOpen(window.innerWidth > 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle Logout
  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("userAuthenticated");
    }
    navigate("/");
  };

  // Close sidebar on menu item click (for small screens)
  const handleNavClick = () => {
    if (window.innerWidth <= 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      <div className="layout flex h-screen bg-gradient-to-r from-white via-white to-white text-white">
        {/* Sidebar */}
        <div
          className={`sidebar bg-purple-600 shadow-lg transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          } w-64 lg:w-64 fixed lg:relative inset-y-0 left-0 z-20`}
        >
          <nav className="p-4 space-y-2">
            <NavLink
              to="/user/home"
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex items-center p-2 rounded-md transition duration-300 ease-in-out ${
                  isActive ? "bg-purple-700 text-white" : "hover:bg-purple-700 text-gray-300"
                }`
              }
              aria-label="Home"
            >
              <HomeIcon size={20} className="mr-2" />
              <span>Home</span>
            </NavLink>
            <NavLink
              to="/user/user-quotes"
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex items-center p-2 rounded-md transition duration-300 ease-in-out ${
                  isActive ? "bg-purple-700 text-white" : "hover:bg-purple-700 text-gray-300"
                }`
              }
              aria-label="My Quotes"
            >
              <FileText size={20} className="mr-2" />
              <span>My Quotes</span>
            </NavLink>
            <NavLink
              to="/user/userpolicies"
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex items-center p-2 rounded-md transition duration-300 ease-in-out ${
                  isActive ? "bg-purple-700 text-white" : "hover:bg-purple-700 text-gray-300"
                }`
              }
              aria-label="Issued Policies"
            >
              <FileCheck size={20} className="mr-2" />
              <span>Issued Policies</span>
            </NavLink>
            <NavLink
              to="/user/request-quote"
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex items-center p-2 rounded-md transition duration-300 ease-in-out ${
                  isActive ? "bg-purple-600 text-white" : "hover:bg-purple-700 text-gray-300"
                }`
              }
              aria-label="Request Quote"
            >
              <Car size={20} className="mr-2" />
              <span>Request Quote</span>
            </NavLink>
            <NavLink
              to="/user/help"
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex items-center p-2 rounded-md transition duration-300 ease-in-out ${
                  isActive ? "bg-purple-600 text-white" : "hover:bg-purple-700 text-gray-300"
                }`
              }
              aria-label="Help"
            >
              <HelpCircle size={20} className="mr-2" />
              <span>Help</span>
            </NavLink>
            <NavLink
              to="/user/usersettings"
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex items-center p-2 rounded-md transition duration-300 ease-in-out ${
                  isActive ? "bg-purple-600 text-white" : "hover:bg-purple-700 text-gray-300"
                }`
              }
              aria-label="Settings"
            >
              <Settings size={20} className="mr-2" />
              <span>Settings</span>
            </NavLink>
            <button
              className="flex items-center p-2 w-full rounded-md bg-red-600 hover:bg-red-700 text-white transition duration-300 ease-in-out"
              onClick={handleLogout}
              aria-label="Logout"
            >
              <LogOut size={20} className="mr-2" />
              <span>Logout</span>
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <main
          className={`main-content flex-1 overflow-y-auto transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "" : ""
          } p-6`}
        >
          {/* Hamburger Menu Button for Small Screens */}
          <button
            className="lg:hidden absolute top-4 left-4 z-30 p-2 bg-yellow-800 text-white rounded-md shadow-md"
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
          >
            <Menu size={20} />
          </button>

          {/* Routes */}
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/request-quote" element={<RequestQuote />} />
            <Route path="/user-quotes" element={<UserQuotesList />} />
            
            <Route path="/quote-details/:id" element={<UserQuoteDetailsPage />} />
            <Route path="/create-policy" element={<CreatePolicy />} />
            <Route path="/userpolicies" element={<IssuedPolicies />} />
            <Route path="/policy-details/:id" element={<PolicyDetails />} />
            <Route path="/help" element={<Help />} />
            <Route path="/tickets" element={<TicketList />} />
            <Route path="/ticket-view/:ticketId" element={<TicketView />} />
            <Route path="/create-ticket" element={<CreateTicket />} />
            <Route path="/usersettings" element={<UserSettings />} />
            <Route path="/userprofile" element={<UserProfile />} />
          </Routes>
        </main>
      </div>
    </>
  );
};

export default UserLayout;