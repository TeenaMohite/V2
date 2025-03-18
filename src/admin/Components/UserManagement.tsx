/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";

interface User {
  _id: string;  // Changed from 'id' to '_id' to match MongoDB's document structure
  name: string;
  code: string;
  dateCreated: string;
  status: string;
}

interface DashboardStats {
  users: {
    total: number;
    active: number;
    inactive: number;
  };
  quotes: number;
  policies: number;
  tickets: {
    total: number;
    open: number;
  };
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [newUser, setNewUser] = useState({
    name: "",
    code: "",
    status: "Active",
  });
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Fetch users and dashboard stats
  useEffect(() => {
    fetchUsers();
    fetchDashboardStats();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/user2/getall");
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/user2/admin/dashboard-stats");
      if (!response.ok) throw new Error("Failed to fetch dashboard stats");
      const data = await response.json();
      setStats(data);
    } catch (err) {
      console.error("Error fetching dashboard stats:", err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (editingUser) {
      setEditingUser({ ...editingUser, [name]: value });
    } else {
      setNewUser({ ...newUser, [name]: value });
    }
  };

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const addUser = async () => {
    if (!newUser.name || !newUser.code) {
      setError("Please fill all required fields.");
      return;
    }
    
    try {
      const response = await fetch("http://localhost:5000/api/user2/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create user");
      }
      
      const data = await response.json();
      setUsers([...users, data]);
      setNewUser({ name: "", code: "", status: "Active" });
      showSuccess("User added successfully!");
      fetchDashboardStats(); // Refresh stats
    } catch (err: any) {
      console.error("Error creating user:", err);
      setError(err.message || "Failed to create user. Please try again.");
    }
  };

  const startEdit = (user: User) => {
    setEditingUser(user);
    setError(null);
  };

  const cancelEdit = () => {
    setEditingUser(null);
  };

  const saveEdit = async () => {
    if (!editingUser) return;
    if (!editingUser.name || !editingUser.code) {
      setError("Please fill all required fields.");
      return;
    }
    
    try {
      // Make sure we're using _id, not id
      const response = await fetch(`http://localhost:5000/api/user2/update/${editingUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editingUser.name,
          code: editingUser.code,
          status: editingUser.status
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update user");
      }
      
      const data = await response.json();
      setUsers(users.map((user) => (user._id === editingUser._id ? data : user)));
      setEditingUser(null);
      showSuccess("User updated successfully!");
      fetchDashboardStats(); // Refresh stats if status changed
    } catch (err: any) {
      console.error("Error updating user:", err);
      setError(err.message || "Failed to update user. Please try again.");
    }
  };

  const deleteUser = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    
    try {
      const response = await fetch(`http://localhost:5000/api/user2/delete/${id}`, { 
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete user");
      }
      
      // Remove user from state
      setUsers(users.filter((user) => user._id !== id));
      showSuccess("User deleted successfully!");
      fetchDashboardStats(); // Refresh stats
    } catch (err: any) {
      console.error("Error deleting user:", err);
      setError(err.message || "Failed to delete user. Please try again.");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="user-management-container bg-gradient-to-r from-purple-200 via-purple-300 to-purple-400 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h1>
      
      {/* Dashboard Stats Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <h2 className="text-lg font-semibold text-purple-700">Total Users</h2>
          <p className="text-3xl font-bold">{stats?.users.total || 0}</p>
          <div className="flex justify-center mt-2">
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md mr-2">
              <span className="font-medium">{stats?.users.active || 0}</span> Active
            </span>
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md">
              <span className="font-medium">{stats?.users.inactive || 0}</span> Inactive
            </span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <h2 className="text-lg font-semibold text-blue-700">Quotes</h2>
          <p className="text-3xl font-bold">{stats?.quotes || 0}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <h2 className="text-lg font-semibold text-green-700">Policies</h2>
          <p className="text-3xl font-bold">{stats?.policies || 0}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <h2 className="text-lg font-semibold text-orange-700">Tickets</h2>
          <p className="text-3xl font-bold">{stats?.tickets.total || 0}</p>
          <div className="mt-2">
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md">
              <span className="font-medium">{stats?.tickets.open || 0}</span> Open
            </span>
          </div>
        </div>
      </div>
      
      {/* User Management Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">User Management</h2>
        
        {/* Success/Error Messages */}
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {successMessage}
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {/* User Form */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">
            {editingUser ? "Edit User" : "Add New User"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input 
                type="text" 
                name="name" 
                value={editingUser ? editingUser.name : newUser.name} 
                onChange={handleInputChange} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter user name" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Code *</label>
              <input 
                type="text" 
                name="code" 
                value={editingUser ? editingUser.code : newUser.code} 
                onChange={handleInputChange} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter user code" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select 
                name="status" 
                value={editingUser ? editingUser.status : newUser.status} 
                onChange={handleInputChange} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            {editingUser ? (
              <>
                <button 
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md mr-2" 
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
                <button 
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md" 
                  onClick={saveEdit}
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button 
                className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md" 
                onClick={addUser}
              >
                Add User
              </button>
            )}
          </div>
        </div>
      </div>

      {/* User Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-bold">User List</h2>
        </div>
        
        {loading ? (
          <div className="p-6 text-center">Loading users...</div>
        ) : users.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No users found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Created</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user._id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.code}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(user.dateCreated)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === "Active" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        className="text-indigo-600 hover:text-indigo-900 mr-3" 
                        onClick={() => startEdit(user)}
                      >
                        Edit
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-900" 
                        onClick={() => deleteUser(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;