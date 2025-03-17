import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

type Policy = {
  _id: string;
  provider: string;
  policyNumber: string;
  coverage: string;
  premiumAmount: number | string | undefined;
};

const PolicyDetails = () => {
  const { id } = useParams(); // Extract the policy ID from the URL
  const navigate = useNavigate();
  const [policy, setPolicy] = useState<Policy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        console.log(id);
        const response = await fetch(`http://localhost:5000/api/policies/get/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch policy");
        }
        const data: Policy = await response.json();
        setPolicy(data);
        console.log(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPolicy();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-purple-50">
        <div className="text-purple-700 font-medium text-lg">
          <svg
            className="animate-spin -ml-1 mr-3 h-8 w-8 text-purple-600 inline"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading policy details...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-purple-50">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full border-l-4 border-red-500">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-700">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!policy) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-purple-50">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full border-l-4 border-yellow-500">
          <h2 className="text-xl font-bold text-yellow-600 mb-2">Not Found</h2>
          <p className="text-gray-700">Policy not found.</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Helper function to safely format premiumAmount
  const formatPremiumAmount = (amount: number | string | undefined): string => {
    if (amount === undefined || amount === null) return "0.00";
    
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    
    if (isNaN(numAmount)) return "0.00";
    
    return numAmount.toFixed(2);
  };

  return (
    <div className="min-h-screen bg-purple-50 py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-lg w-full border-t-4 border-purple-600">
        <div className="bg-purple-100 p-4 sm:p-6">
          <h2 className="text-2xl font-bold text-purple-800 mb-1">Policy Details</h2>
          <p className="text-sm text-purple-600">ID: {policy._id}</p>
        </div>

        <div className="p-4 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-purple-50 p-3 rounded">
              <p className="text-sm text-purple-500 font-medium">Provider</p>
              <p className="text-gray-800 font-medium">{policy.provider}</p>
            </div>

            <div className="bg-purple-50 p-3 rounded">
              <p className="text-sm text-purple-500 font-medium">Policy Number</p>
              <p className="text-gray-800 font-medium">{policy.policyNumber}</p>
            </div>
          </div>

          <div className="bg-purple-50 p-3 rounded">
            <p className="text-sm text-purple-500 font-medium">Coverage</p>
            <p className="text-gray-800">{policy.coverage}</p>
          </div>

          <div className="bg-purple-100 p-4 rounded-md">
            <p className="text-sm text-purple-600 font-medium">Premium Amount</p>
            <p className="text-2xl font-bold text-purple-800">
              ${formatPremiumAmount(policy.premiumAmount)}
            </p>
          </div>
        </div>

        <div className="px-4 sm:px-6 py-4 bg-gray-50 flex justify-end">
          <button
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default PolicyDetails;