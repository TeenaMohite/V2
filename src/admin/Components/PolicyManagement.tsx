import React, { useState, useEffect } from "react";

interface Policy {
  id: string;
  provider: string;
  policyNumber: string;
  coverage: string;
  premiumAmount: number;
}

const PolicyManagement: React.FC = () => {
  const [provider, setProvider] = useState<string>("");
  const [policyNumber, setPolicyNumber] = useState<string>("");
  const [coverage, setCoverage] = useState<string>("");
  const [premiumAmount, setPremiumAmount] = useState<string>("");
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/policies/getall");
        if (!response.ok) throw new Error("Failed to fetch policies");
        const data: Policy[] = await response.json();
        setPolicies(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };
    fetchPolicies();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!provider || !policyNumber || !coverage || !premiumAmount) {
      setError("All fields are required.");
      return;
    }
    const premium = parseFloat(premiumAmount);
    if (isNaN(premium) || premium <= 0) {
      setError("Premium amount must be a valid positive number.");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/policies/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider, policyNumber, coverage, premiumAmount: premium }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to add policy");
      setPolicies([...policies, data.newPolicy]);
      setProvider("");
      setPolicyNumber("");
      setCoverage("");
      setPremiumAmount("");
      setError(null);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred while adding the policy");
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/policies/delete/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to delete policy");
      setPolicies(policies.filter((policy) => policy.id !== id));
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred while deleting the policy");
      }
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-200 via-purple-300 to-purple-400 text-white min-h-screen py-6">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6">Insurance Policy Management</h1>
      
      {error && <p className="text-red-600 bg-red-100 p-3 rounded-md mb-4">{error}</p>}
      
      <form onSubmit={handleSubmit} className="bg-purple-700 p-4 sm:p-6 rounded-lg shadow-md space-y-3 sm:space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-1">Provider</label>
          <input 
            type="text" 
            value={provider} 
            onChange={(e) => setProvider(e.target.value)} 
            className="w-full px-3 py-2 bg-purple-600 text-white border border-purple-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400" 
            required 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-1">Policy Number</label>
          <input 
            type="text" 
            value={policyNumber} 
            onChange={(e) => setPolicyNumber(e.target.value)} 
            className="w-full px-3 py-2 bg-purple-600 text-white border border-purple-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400" 
            required 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-1">Coverage</label>
          <input 
            type="text" 
            value={coverage} 
            onChange={(e) => setCoverage(e.target.value)} 
            className="w-full px-3 py-2 bg-purple-600 text-white border border-purple-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400" 
            required 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-1">Premium Amount</label>
          <input 
            type="text" 
            value={premiumAmount} 
            onChange={(e) => setPremiumAmount(e.target.value)} 
            className="w-full px-3 py-2 bg-purple-600 text-white border border-purple-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400" 
            required 
          />
        </div>
        <button 
          type="submit" 
          className="w-full sm:w-auto px-4 py-2 bg-purple-900 hover:bg-purple-800 text-white font-medium rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          Add Policy
        </button>
      </form>
      
      <h2 className="text-lg sm:text-xl font-semibold text-purple-900 mt-8 mb-3">Uploaded Policies</h2>
      
      <div className="overflow-x-auto bg-purple-700 rounded-lg shadow-md">
        <table className="w-full">
          <thead className="bg-purple-800 text-white">
            <tr>
              <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium uppercase tracking-wider">Provider</th>
              <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium uppercase tracking-wider">Policy Number</th>
              <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium uppercase tracking-wider">Coverage</th>
              <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium uppercase tracking-wider">Premium</th>
              <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-600">
            {policies.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-4 text-center text-white">No policies found.</td>
              </tr>
            ) : (
              policies.map((policy) => (
                <tr key={policy.id} className="hover:bg-purple-600 transition-colors duration-150">
                  <td className="px-4 py-3 text-sm sm:text-base text-white">{policy.provider}</td>
                  <td className="px-4 py-3 text-sm sm:text-base text-white">{policy.policyNumber}</td>
                  <td className="px-4 py-3 text-sm sm:text-base text-white">{policy.coverage}</td>
                  <td className="px-4 py-3 text-sm sm:text-base text-white">
                    ${typeof policy.premiumAmount === 'number' ? policy.premiumAmount.toFixed(2) : policy.premiumAmount}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <button 
                      onClick={() => handleDelete(policy.id)} 
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PolicyManagement;