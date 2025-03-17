/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Search, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Policy {
  _id: string;
  provider: string;
  policyNumber: string;
  coverage: string;
  premiumAmount: number | string;
}

const IssuedPolicies: React.FC = () => {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/policies/getall");
        if (!response.ok) {
          throw new Error("Failed to fetch policies");
        }
        const data = await response.json();
        setPolicies(Array.isArray(data) ? data : []);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching policies");
      } finally {
        setLoading(false);
      }
    };
    fetchPolicies();
  }, []);

  const filteredPolicies = policies.filter((policy) =>
    policy.provider?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    policy.policyNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper function to safely format the premium amount
  const formatPremium = (amount: number | string) => {
    if (amount === null || amount === undefined) return "$0.00";
    
    // Convert to number if it's a string
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    
    // Check if it's a valid number
    if (isNaN(numAmount)) return "$0.00";
    
    return `$${numAmount.toFixed(2)}`;
  };

  return (
    <div className="policies-container bg-gradient-to-r from-purple-200 via-purple-300 to-purple-400 text-gray-900 min-h-screen p-6">
      {/* Header Section */}
      <div className="policies-header flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-purple-700">Issued Policies</h1>
        <button
          className="request-policy-button bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md shadow-md transition duration-300"
          onClick={() => navigate("/user/create-policy")}
        >
          Request a Policy
        </button>
      </div>

      {/* Search Bar */}
      <div className="search-bar flex items-center bg-white p-2 rounded-md shadow-md mb-6 border border-gray-300">
        <Search size={20} className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search by provider or policy number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent text-gray-900 placeholder-gray-500 outline-none flex-grow"
        />
      </div>

      {/* Loader */}
      {loading && (
        <div className="loader-container flex flex-col items-center justify-center space-y-2">
          <div className="loader w-8 h-8 border-t-2 border-b-2 border-purple-500 rounded-full animate-spin"></div>
          <p className="text-gray-700">Loading policies...</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="error-message bg-red-500 text-white p-4 rounded-md shadow-md">
          <p>{error}</p>
        </div>
      )}

      {/* Policies Table */}
      {!loading && !error && (
        <div className="policies-table overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow-md border border-gray-300">
            <thead>
              <tr className="bg-purple-700 text-white">
                <th className="py-2 px-4 text-left text-sm font-semibold">Provider</th>
                <th className="py-2 px-4 text-left text-sm font-semibold">Policy Number</th>
                <th className="py-2 px-4 text-left text-sm font-semibold">Coverage</th>
                <th className="py-2 px-4 text-left text-sm font-semibold">Premium Amount</th>
                <th className="py-2 px-4 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPolicies.length > 0 ? (
                filteredPolicies.map((policy) => (
                  <tr key={policy._id} className="border-b border-gray-300 hover:bg-purple-100">
                    <td className="py-2 px-4 text-sm">{policy.provider}</td>
                    <td className="py-2 px-4 text-sm">{policy.policyNumber}</td>
                    <td className="py-2 px-4 text-sm">{policy.coverage}</td>
                    <td className="py-2 px-4 text-sm">{formatPremium(policy.premiumAmount)}</td>
                    <td>
                      <button
                        className="view-button bg-purple-600 hover:bg-purple-700 text-white px-2 py-1 rounded-md shadow-md flex items-center space-x-1 transition duration-300"
                        onClick={() => navigate(`/user/policy-details/${policy._id}`)}
                      >
                        <Eye size={16} /> <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-gray-500">
                    No policies found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default IssuedPolicies;