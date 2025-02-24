import React, { createContext, useState, useEffect, useMemo } from "react";

// Create User Context
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      // Simulating user details fetch (Replace with API call if needed)
      const storedUser = JSON.parse(localStorage.getItem("user")) || {
        name: "John Doe",
        phone: "+1 555-123-4567",
        email: "johndoe@example.com",
        address: "456 Elm Street, Los Angeles, CA",
        dob: "April 20, 1985",
        accountNumber: "1234 5678 9012 3456",
        lastLogin: "10 Feb 2025 12:30 PM",
        profileImage: "https://via.placeholder.com/150",
      };

      setUser(storedUser);
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  }, []);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({ user, setUser }), [user]);

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export default UserProvider;
