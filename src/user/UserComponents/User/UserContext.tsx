import { createContext, useState, useEffect, useMemo, ReactNode } from "react";

// Define User Interface
interface User {
  name: string;
  phone: string;
  email: string;
  address: string;
  dob: string;
  accountNumber: string;
  lastLogin: string;
  profileImage: string;
}

// Define Context Type
interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// Create User Context with default values
export const UserContext = createContext<UserContextType | undefined>(undefined);

// Define Props for Provider
interface UserProviderProps {
  children: ReactNode;
}

// UserProvider Component
const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        // Default User Data
        setUser({
          name: "John Doe",
          phone: "+1 555-123-4567",
          email: "johndoe@example.com",
          address: "456 Elm Street, Los Angeles, CA",
          dob: "April 20, 1985",
          accountNumber: "1234 5678 9012 3456",
          lastLogin: "10 Feb 2025 12:30 PM",
          profileImage: "https://via.placeholder.com/150",
        });
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  }, []);

  // Memoized context value to optimize performance
  const contextValue = useMemo(() => ({ user, setUser }), [user]);

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export default UserProvider;
