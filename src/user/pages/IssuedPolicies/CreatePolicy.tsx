import  { useState } from "react";
import { useNavigate } from "react-router-dom";

type Policy = {
  id: string;
  name: string;
  insuranceType: string;
  vehicleType: string;
};

const CreatePolicy = () => {
  const navigate = useNavigate();
  const [policy, setPolicy] = useState<Policy>({
    id: "",
    name: "",
    insuranceType: "Full",
    vehicleType: "2-Wheeler",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setPolicy({ ...policy, [e.target.name]: e.target.value });
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
        {/* Name Field */}
        <div className="form-group mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={policy.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-white border border-purple-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        {/* Insurance Type Dropdown */}
        <div className="form-group mb-4">
          <label htmlFor="insuranceType" className="block text-sm font-medium text-gray-700 mb-1">
            Insurance Type
          </label>
          <select
            id="insuranceType"
            name="insuranceType"
            value={policy.insuranceType}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-white border border-purple-300 rounded-md text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="Full">Full</option>
            <option value="3rd Party">3rd Party</option>
          </select>
        </div>

        {/* Vehicle Type Dropdown */}
        <div className="form-group mb-4">
          <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700 mb-1">
            Vehicle Type
          </label>
          <select
            id="vehicleType"
            name="vehicleType"
            value={policy.vehicleType}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-white border border-purple-300 rounded-md text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="2-Wheeler">2-Wheeler</option>
            <option value="4-Wheeler">4-Wheeler</option>
          </select>
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
