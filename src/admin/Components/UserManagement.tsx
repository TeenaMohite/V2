import React, { useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  code: string;
  dateCreated: string;
  status: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({
    name: "",
    code: "",
    status: "Active",
  });
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/user2/getall")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (editingUser) {
      setEditingUser({ ...editingUser, [name]: value });
    } else {
      setNewUser({ ...newUser, [name]: value });
    }
  };

  const addUser = async () => {
    if (!newUser.name || !newUser.code) {
      alert("Please fill all fields.");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/user2/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      const data = await response.json();
      setUsers([...users, data]);
      setNewUser({ name: "", code: "", status: "Active" });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const startEdit = (user: User) => {
    setEditingUser(user);
  };

  const saveEdit = async () => {
    if (!editingUser) return;
    try {
      const response = await fetch(`http://localhost:5000/api/user2/update/${editingUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingUser),
      });
      const data = await response.json();
      setUsers(users.map((user) => (user.id === editingUser.id ? data : user)));
      setEditingUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/api/user2/delete/${id}`, { method: "DELETE" });
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="user-management-container bg-gradient-to-r from-purple-200 via-purple-300 to-purple-400 min-h-screen p-6">
      <div className="page-header flex justify-between items-center mb-6">
        <h1 className="page-title text-2xl font-bold">User Management</h1>
        <button
          className="bg-purple-500 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
          onClick={addUser}
        >
          Add New User
        </button>
      </div>

      <div className="user-form bg-white p-6 rounded-lg shadow-md space-y-4">
        <input type="text" name="name" placeholder="Name" value={editingUser ? editingUser.name : newUser.name} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500" />
        <input type="text" name="code" placeholder="User Code" value={editingUser ? editingUser.code : newUser.code} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500" />
        <select name="status" value={editingUser ? editingUser.status : newUser.status} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500">
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        {editingUser ? (
          <button className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-md w-full" onClick={saveEdit}>Save</button>
        ) : (
          <button className="bg-purple-500 hover:bg-purple-700 text-white px-4 py-2 rounded-md w-full" onClick={addUser}>Add User</button>
        )}
      </div>

      <div className="user-table-container mt-6 overflow-x-auto">
        <table className="user-table w-full bg-white rounded-lg shadow-md">
          <thead className="bg-purple-300">
            <tr>
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Code</th>
              <th className="py-2 px-4">Date Created</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="py-2 px-4">{user.id}</td>
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.code}</td>
                <td className="py-2 px-4">{user.dateCreated}</td>
                <td className="py-2 px-4">
                  <span className={`px-2 py-1 rounded-md ${user.status === "Active" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>{user.status}</span>
                </td>
                <td className="py-2 px-4 flex space-x-2">
                  <button className="bg-yellow-500 hover:bg-yellow-700 text-white px-2 py-1 rounded-md" onClick={() => startEdit(user)}>Edit</button>
                  <button className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded-md" onClick={() => deleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
