import React, { useState, useEffect } from "react";


interface User {
  id: string;
  name: string;
  code: string;
  dateCreated: string;
  status: string;
}

interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  recentUsers: User[];
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    recentUsers: [],
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/user2/getall");
      const users = await response.json();
      
      // Calculate stats
      const activeUsers = users.filter((user: User) => user.status === "Active").length;
      const inactiveUsers = users.filter((user: User) => user.status === "Inactive").length;
      
      // Get 5 most recent users
      const sortedUsers = [...users].sort((a: User, b: User) => 
        new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
      ).slice(0, 5);
      
      setStats({
        totalUsers: users.length,
        activeUsers,
        inactiveUsers,
        recentUsers: sortedUsers,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container bg-gradient-to-r from-purple-200 via-purple-300 to-purple-400 min-h-screen p-6">
      <div className="page-header mb-6">
        <h1 className="text-3xl font-bold text-gray-800">User Dashboard</h1>
        <p className="text-gray-600">Overview of system users and statistics</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="stat-card bg-white p-6 rounded-lg shadow-md">
              <div className="stat-title text-gray-500 text-sm uppercase font-semibold">Total Users</div>
              <div className="stat-value text-4xl font-bold text-purple-600">{stats.totalUsers}</div>
              <div className="stat-desc text-gray-500 mt-2">All registered users</div>
            </div>
            
            <div className="stat-card bg-white p-6 rounded-lg shadow-md">
              <div className="stat-title text-gray-500 text-sm uppercase font-semibold">Active Users</div>
              <div className="stat-value text-4xl font-bold text-green-600">{stats.activeUsers}</div>
              <div className="stat-desc text-gray-500 mt-2">Users with active status</div>
            </div>
            
            <div className="stat-card bg-white p-6 rounded-lg shadow-md">
              <div className="stat-title text-gray-500 text-sm uppercase font-semibold">Inactive Users</div>
              <div className="stat-value text-4xl font-bold text-red-600">{stats.inactiveUsers}</div>
              <div className="stat-desc text-gray-500 mt-2">Users with inactive status</div>
            </div>
          </div>

          <div className="recent-users bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Recent Users</h2>
         
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-purple-100">
                  <tr>
                    <th className="py-2 px-4 text-left">Name</th>
                    <th className="py-2 px-4 text-left">Code</th>
                    <th className="py-2 px-4 text-left">Date Created</th>
                    <th className="py-2 px-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentUsers.length > 0 ? (
                    stats.recentUsers.map((user) => (
                      <tr key={user.id} className="border-t">
                        <td className="py-2 px-4">{user.name}</td>
                        <td className="py-2 px-4">{user.code}</td>
                        <td className="py-2 px-4">{new Date(user.dateCreated).toLocaleDateString()}</td>
                        <td className="py-2 px-4">
                          <span className={`px-2 py-1 rounded-md ${user.status === "Active" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                            {user.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-4 text-center text-gray-500">
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;