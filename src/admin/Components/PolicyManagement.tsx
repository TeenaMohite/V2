import React, { useState, useEffect } from "react";

interface Policy {
  id: string;
  provider: string;
  policyNumber: string;
  coverage: string;
  premiumAmount: string;
}

const PolicyManagement: React.FC = () => {
  const [provider, setProvider] = useState("");
  const [policyNumber, setPolicyNumber] = useState("");
  const [coverage, setCoverage] = useState("");
  const [premiumAmount, setPremiumAmount] = useState("");
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch all policies from the backend on component mount
  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/policies/getall");
        if (!response.ok) {
          throw new Error("Failed to fetch policies");
        }
        const data = await response.json();
        setPolicies(data);
      } catch (error) {
        console.error("Error fetching policies:", error);
        setError(error.message || "An error occurred while fetching policies");
      }
    };
    fetchPolicies();
  }, []);

  // Handle form submission to create a new policy
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!provider || !policyNumber || !coverage || !premiumAmount) {
      setError("All fields are required.");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/policies/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          provider,
          policyNumber,
          coverage,
          premiumAmount,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to add policy");
      }
      setPolicies([...policies, data.newPolicy]);
      setProvider("");
      setPolicyNumber("");
      setCoverage("");
      setPremiumAmount("");
      setError(null);
    } catch (error) {
      console.error("Submission Error:", error);
      setError(error.message || "An error occurred while adding the policy");
    }
  };

  // Handle deleting a policy
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/policies/delete/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to delete policy");
      }
      setPolicies(policies.filter((policy) => policy.id !== id));
    } catch (error) {
      console.error("Deletion Error:", error);
      setError(error.message || "An error occurred while deleting the policy");
    }
  };

  return (
    <div className="container bg-gradient-to-r from-purple-200 via-purple-300 to-purple-400 text-white min-h-screen p-6">
      {/* Title */}
      <h1 className="text-2xl font-bold text-black mb-6">Insurance Policy Management</h1>

      {/* Error Message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Policy Form */}
      <form onSubmit={handleSubmit} className="policy-form bg-purple-700 p-6 rounded-lg shadow-md space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Provider</label>
          <input
            type="text"
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            className="w-full px-3 py-2 bg-purple-200 border border-yellow-700 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            placeholder="Enter the provider name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Policy Number</label>
          <input
            type="text"
            value={policyNumber}
            onChange={(e) => setPolicyNumber(e.target.value)}
            className="w-full px-3 py-2 bg-purple-200 border border-yellow-700 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            placeholder="Enter the policy number"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Coverage</label>
          <input
            type="text"
            value={coverage}
            onChange={(e) => setCoverage(e.target.value)}
            className="w-full px-3 py-2 bg-purple-200 border border-yellow-700 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            placeholder="Enter the coverage type"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Premium Amount</label>
          <input
            type="text"
            value={premiumAmount}
            onChange={(e) => setPremiumAmount(e.target.value)}
            className="w-full px-3 py-2 bg-purple-200 border border-yellow-700 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            placeholder="Enter the premium amount"
            required
          />
        </div>
        <button
          type="submit"
          className="submit-button bg-purple-600 hover:bg-purple-700 text-black px-4 py-2 rounded-md shadow-md transition duration-300 ease-in-out w-full"
        >
          Add Policy
        </button>
      </form>

      {/* Uploaded Policies */}
      <h2 className="text-xl font-semibold text-purple-300 mt-6 mb-4">Uploaded Policies</h2>
      <div className="overflow-x-auto">
        <table className="policy-table w-full bg-purple-700 rounded-lg shadow-md">
          <thead className="bg-purple-800">
            <tr>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-300">Provider</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-300">Policy Number</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-300">Coverage</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-300">Premium Amount</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {policies.map((policy) => (
              <tr key={policy.id} className="border-t border-yellow-700">
                <td className="py-2 px-4 text-sm text-gray-300">{policy.provider}</td>
                <td className="py-2 px-4 text-sm text-gray-300">{policy.policyNumber}</td>
                <td className="py-2 px-4 text-sm text-gray-300">{policy.coverage}</td>
                <td className="py-2 px-4 text-sm text-gray-300">{policy.premiumAmount}</td>
                <td className="py-2 px-4 text-sm flex space-x-2">
                  <button
                    className="delete-button bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded-md shadow-md transition duration-300 ease-in-out"
                    onClick={() => handleDelete(policy.id)}
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

export default PolicyManagement;