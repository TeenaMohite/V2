import { useState, useEffect, useRef } from "react";
import { Menu, User } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

interface UserNavbarProps {
  toggleSidebar: () => void;
}

const UserNavbar = ({ toggleSidebar }: UserNavbarProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate(); // ✅ Use navigate function

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ✅ Handle navigation without page refresh
  const handleNavigation = (path: string) => {
    navigate(path); // Navigate to the selected route
    setIsDropdownOpen(false); // Close dropdown
  };

  return (
    <div className="user-navbar bg-gradient-to-r from-purple-200 via-purple-300 to-purple-400 text-white shadow-lg p-4 flex justify-between items-center">
      {/* Hamburger Menu */}
      <button
        className="user-hamburger-menu bg-purple-500 hover:bg-purple-400 text-white p-2 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-110"
        onClick={toggleSidebar}
      >
        <Menu size={22} />
      </button>

      {/* Company Name */}
      <h2 className="company-name text-xl font-bold hidden md:block">V2 Enterprise</h2>

      {/* User Icon and Dropdown */}
      <div className="user-icon-container relative" ref={dropdownRef}>
        <User
          className="user-icon cursor-pointer bg-purple-600 hover:bg-purple-500 text-white p-2 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-110"
          size={25}
          onClick={toggleDropdown}
        />

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="dropdown-menu absolute right-0 mt-2 w-48 bg-gray-900 border border-purple-600 rounded-lg shadow-lg overflow-hidden z-10">
            <ul>
              <li>
                <button
                  className="block w-full text-left px-4 py-2 text-white hover:bg-purple-600 transition duration-300 ease-in-out"
                  onClick={() => handleNavigation("/user/userProfile")}>Profile
                  </button>
              </li>
              <li>
                <button
                  className="block w-full text-left px-4 py-2 text-white hover:bg-purple-600 transition duration-300 ease-in-out"
                   onClick={() => handleNavigation("/user/UserSettings")}>Settings</button>
              </li>
              <li>
                <button
                  className="block w-full text-left px-4 py-2 text-white hover:bg-purple-600 transition duration-300 ease-in-out"
                  onClick={() => handleNavigation("/")}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserNavbar;
