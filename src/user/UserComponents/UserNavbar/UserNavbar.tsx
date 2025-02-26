import { useState, useEffect, useRef } from 'react';
import { Menu, User } from 'lucide-react';

interface UserNavbarProps {
  toggleSidebar: () => void;
}

const UserNavbar = ({ toggleSidebar }: UserNavbarProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
          className="user-icon cursor-pointer bg-yellow-500 hover:bg-yellow-400 text-white p-2 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-110" 
          size={22} 
          onClick={toggleDropdown} 
        />

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="dropdown-menu absolute right-0 mt-2 w-48 bg-gray-900 border border-yellow-600 rounded-lg shadow-lg overflow-hidden z-10">
            <ul>
              <li>
                <a 
                  href="/UserProfile" 
                  className="block px-4 py-2 text-white hover:bg-yellow-600 hover:text-white transition duration-300 ease-in-out"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Profile
                </a>
              </li>
              <li>
                <a 
                  href="/settings" 
                  className="block px-4 py-2 text-white hover:bg-yellow-600 hover:text-white transition duration-300 ease-in-out"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Settings
                </a>
              </li>
              <li>
                <a 
                  href="/logout" 
                  className="block px-4 py-2 text-white hover:bg-yellow-600 hover:text-white transition duration-300 ease-in-out"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserNavbar;