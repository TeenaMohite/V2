import React, { useState, useEffect } from "react";

interface QuoteRequest {
  id: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  insuranceType: string;
  contactDetails: string;
  status: string;
  quoteDate: string;
}

const Quote: React.FC = () => {
  const [vehicleMake, setVehicleMake] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleYear, setVehicleYear] = useState("");
  const [insuranceType, setInsuranceType] = useState("");
  const [contactDetails, setContactDetails] = useState("");
  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch quote requests from the backend
  useEffect(() => {
    fetch("http://localhost:5000/api/quotes2/getall")
      .then((res) => res.json())
      .then((data) => setQuoteRequests(data))
      .catch((err) => console.error("Error fetching quote requests:", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate fields
    if (!vehicleMake || !vehicleModel || !vehicleYear || !insuranceType || !contactDetails) {
      setError("All fields are required.");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/quotes2/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vehicleMake,
          vehicleModel,
          vehicleYear,
          insuranceType,
          contactDetails,
        }),
      });
      const data = await response.json();
      setQuoteRequests([...quoteRequests, data]);
      setError(null);
      setVehicleMake("");
      setVehicleModel("");
      setVehicleYear("");
      setInsuranceType("");
      setContactDetails("");
      alert("Quote request submitted successfully!");
    } catch (error) {
      console.error("Error creating quote request:", error);
    }
  };

  return (
    <div className="container bg-gradient-to-r from-purple-200 via-purple-300 to-purple-400 text-white min-h-screen p-6">
      {/* Title */}
      <h1 className="text-2xl font-bold text-black mb-6">Request Insurance Quote</h1>

      {/* Error Message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Quote Request Form */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-purple-700 p-6 rounded-lg shadow-md">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Vehicle Make</label>
          <input
            type="text"
            value={vehicleMake}
            onChange={(e) => setVehicleMake(e.target.value)}
            className="w-full px-3 py-2 bg-purple-200 border border-yellow-700 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            placeholder="Enter vehicle make"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Vehicle Model</label>
          <input
            type="text"
            value={vehicleModel}
            onChange={(e) => setVehicleModel(e.target.value)}
            className="w-full px-3 py-2 bg-purple-200 border border-yellow-700 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            placeholder="Enter vehicle model"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Vehicle Year</label>
          <input
            type="number"
            value={vehicleYear}
            onChange={(e) => setVehicleYear(e.target.value)}
            className="w-full px-3 py-2 bg-purple-200 border border-yellow-700 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            placeholder="Enter vehicle year"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Type of Insurance</label>
          <select
            value={insuranceType}
            onChange={(e) => setInsuranceType(e.target.value)}
            className="w-full px-3 py-2 bg-purple-200 border border-yellow-700 rounded-md text-black focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            required
          >
            <option value="">Select Insurance Type</option>
            <option value="Full Coverage">Full Coverage</option>
            <option value="Liability">Liability</option>
            <option value="Comprehensive">Comprehensive</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Contact Details</label>
          <input
            type="text"
            value={contactDetails}
            onChange={(e) => setContactDetails(e.target.value)}
            className="w-full px-3 py-2 bg-purple-200 border border-yellow-700 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            placeholder="Enter your contact details"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md shadow-md transition duration-300 ease-in-out"
        >
          Submit Request
        </button>
      </form>

      {/* Quote Requests Table */}
      <h2 className="text-xl font-semibold text-balck mt-6 mb-4">Quote Requests</h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-purple-700 rounded-lg shadow-md">
          <thead className="bg-purple-800">
            <tr>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-300">Vehicle Make</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-300">Vehicle Model</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-300">Insurance Type</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-300">Status</th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-300">Quote Date</th>
            </tr>
          </thead>
          <tbody>
            {quoteRequests.map((request) => (
              <tr key={request.id} className="border-t border-yellow-700">
                <td className="py-2 px-4 text-sm text-gray-300">{request.vehicleMake}</td>
                <td className="py-2 px-4 text-sm text-gray-300">{request.vehicleModel}</td>
                <td className="py-2 px-4 text-sm text-gray-300">{request.insuranceType}</td>
                <td className="py-2 px-4 text-sm text-gray-300">{request.status}</td>
                <td className="py-2 px-4 text-sm text-gray-300">
                  {new Date(request.quoteDate).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Quote;