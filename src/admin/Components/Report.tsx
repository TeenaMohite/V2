import React, { useState, useEffect } from "react";

interface Report {
  id: string;
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

  useEffect(() => {
    fetch("http://localhost:5000/api/reports/getall")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setReports(data);
        } else {
          console.error("Unexpected data format:", data);
          setReports([]);
        }
      })
      .catch((err) => console.error("Error fetching reports:", err));
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
      const data = await response.json();
      setReports([...reports, data]);
      setNewReport({ name: "", survey: "", employeesCount: "" });
    } catch (error) {
      console.error("Error creating report:", error);
    }
  };

  const handleDeleteReport = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/api/reports/${id}`, { method: "DELETE" });
      setReports(reports.filter((report) => report.id !== id));
    } catch (error) {
      console.error("Error deleting report:", error);
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

      {/* Table Container */}
      <div className="table-container overflow-x-auto">
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
              <tr key={report.id} className="border-t border-yellow-700">
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
                    {report.status}
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
                    onClick={() => handleDeleteReport(report.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;