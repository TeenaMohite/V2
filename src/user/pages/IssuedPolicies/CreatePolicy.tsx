import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Policy = {
  provider: string;
  policyNumber: string;
  coverage: string;
  premiumAmount: number;
};

const CreatePolicy = () => {
  const navigate = useNavigate();
  const [policy, setPolicy] = useState<Policy>({
    provider: "",
    policyNumber: "",
    coverage: "Full",
    premiumAmount: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.name === "premiumAmount" ? parseFloat(e.target.value) : e.target.value;
    setPolicy({ ...policy, [e.target.name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/policies/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(policy),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to add policy");
      }

      // Redirect to issued policies page
      navigate("/user/userpolicies");
    } catch (error) {
      console.error("Submission Error:", error);
      if (error instanceof Error) {
        alert(error.message || "An error occurred while adding the policy");
      } else {
        alert("An error occurred while adding the policy");
      }
    }
  };

  return (
    <div className="create-policy-container bg-white text-gray-900 min-h-screen p-6">
      {/* Title */}
      <h2 className="text-2xl font-bold text-purple-700 mb-6">Add New Policy</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-purple-100 p-6 rounded-lg shadow-md">
        {/* Provider Field */}
        <div className="form-group mb-4">
          <label htmlFor="provider" className="block text-sm font-medium text-gray-700 mb-1">
            Provider
          </label>
          <input
            type="text"
            id="provider"
            name="provider"
            value={policy.provider}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-white border border-purple-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        {/* Policy Number Field */}
        <div className="form-group mb-4">
          <label htmlFor="policyNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Policy Number
          </label>
          <input
            type="text"
            id="policyNumber"
            name="policyNumber"
            value={policy.policyNumber}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-white border border-purple-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        {/* Coverage Dropdown */}
        <div className="form-group mb-4">
          <label htmlFor="coverage" className="block text-sm font-medium text-gray-700 mb-1">
            Coverage
          </label>
          <select
            id="coverage"
            name="coverage"
            value={policy.coverage}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-white border border-purple-300 rounded-md text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="Full">Full</option>
            <option value="3rd Party">3rd Party</option>
          </select>
        </div>

        {/* Premium Amount Field */}
        <div className="form-group mb-4">
          <label htmlFor="premiumAmount" className="block text-sm font-medium text-gray-700 mb-1">
            Premium Amount
          </label>
          <input
            type="number"
            id="premiumAmount"
            name="premiumAmount"
            value={policy.premiumAmount}
            onChange={handleChange}
            required
            step="0.01"
            min="0"
            className="w-full px-3 py-2 bg-white border border-purple-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md shadow-md transition duration-300 ease-in-out"
        >
          Add Policy
        </button>
      </form>
    </div>
  );
};

export default CreatePolicy;