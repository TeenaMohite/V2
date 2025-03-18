import React, { useState, useEffect } from "react";

interface Report {
  _id: string; // Changed from id to _id to match MongoDB's default field name
  name: string;
  survey: string;
  employeesCount: number;
  participation: string;
  status: string;
}

const Reports: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [newReport, setNewReport] = useState({
    name: "",
    survey: "",
    employeesCount: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReports = () => {
    setIsLoading(true);
    fetch("http://localhost:5000/api/reports/getall")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server responded with status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setReports(data);
        } else {
          console.error("Unexpected data format:", data);
          setReports([]);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching reports:", err);
        setError("Failed to load reports");
        setReports([]);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewReport({ ...newReport, [e.target.name]: e.target.value });
  };

  const handleCreateReport = async () => {
    if (!newReport.name || !newReport.survey || !newReport.employeesCount) {
      alert("Please fill all fields.");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/reports/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newReport,
          employeesCount: parseInt(newReport.employeesCount, 10),
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      setReports([...reports, data]);
      setNewReport({ name: "", survey: "", employeesCount: "" });
    } catch (error) {
      console.error("Error creating report:", error);
      setError("Failed to create report");
    }
  };

  const handleDeleteReport = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/reports/delete/${id}`, { 
        method: "DELETE" 
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      // Only update the UI after successful deletion
      setReports(reports.filter((report) => report._id !== id));
    } catch (error) {
      console.error("Error deleting report:", error);
      setError("Failed to delete report");
    }
  };

  return (
    <div className="reports-container bg-gradient-to-r from-purple-200 via-purple-300 to-purple-400 text-black min-h-screen p-6">
      {/* Header */}
      <div className="page-header flex justify-between items-center mb-6">
        <h1 className="page-title text-2xl font-bold text-black">Reports Management</h1>
        <button
          className="create-button bg-purple-800 hover:bg-purple-700 text-white px-4 py-2 rounded-md shadow-md transition duration-300 ease-in-out"
          onClick={handleCreateReport}
        >
          Create New Report
        </button>
      </div>

      {/* Form Container */}
      <div className="form-container bg-purple-600 p-6 rounded-lg shadow-md mb-6 space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Report Name"
          value={newReport.name}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-purple-200 border border-yellow-700 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
        />
        <input
          type="text"
          name="survey"
          placeholder="Survey Name"
          value={newReport.survey}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-purple-200 border border-yellow-700 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
        />
        <input
          type="number"
          name="employeesCount"
          placeholder="Employees Count"
          value={newReport.employeesCount}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-purple-200 border border-yellow-700 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
        />
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Loading state */}
      {isLoading ? (
        <div className="text-center py-4">Loading reports...</div>
      ) : (
        /* Table Container */
        <div className="table-container overflow-x-auto">
          {reports.length === 0 ? (
            <div className="text-center py-4 bg-purple-600 rounded-lg shadow-md text-white">
              No reports found. Create your first report!
            </div>
          ) : (
            <table className="w-full bg-purple-600 rounded-lg shadow-md">
              <thead className="bg-purple-800">
                <tr>
                  <th className="py-2 px-4 text-left text-sm font-medium text-gray-300">Report Name</th>
                  <th className="py-2 px-4 text-left text-sm font-medium text-gray-300">Survey/Status</th>
                  <th className="py-2 px-4 text-left text-sm font-medium text-gray-300">Employees</th>
                  <th className="py-2 px-4 text-left text-sm font-medium text-gray-300">Participation</th>
                  <th className="py-2 px-4 text-left text-sm font-medium text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report._id} className="border-t border-yellow-700">
                    <td className="py-2 px-4 text-sm text-gray-300">{report.name}</td>
                    <td className="py-2 px-4 text-sm text-gray-300">
                      <div>{report.survey}</div>
                      <div
                        className={`status ${
                          report.status === "Active"
                            ? "text-green-500"
                            : report.status === "Inactive"
                            ? "text-red-500"
                            : "text-yellow-500"
                        }`}
                      >
                        {report.status || "Pending"}
                      </div>
                    </td>
                    <td className="py-2 px-4 text-sm text-gray-300">{report.employeesCount}</td>
                    <td className="py-2 px-4 text-sm text-gray-300">{report.participation}</td>
                    <td className="py-2 px-4 text-sm flex space-x-2">
                      <button
                        className="manage-button bg-yellow-600 hover:bg-yellow-700 text-white px-2 py-1 rounded-md shadow-md transition duration-300 ease-in-out"
                      >
                        Manage
                      </button>
                      <button
                        className="delete-button bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded-md shadow-md transition duration-300 ease-in-out"
                        onClick={() => handleDeleteReport(report._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default Reports;