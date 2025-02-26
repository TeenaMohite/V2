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
    <div className="container bg-gradient-to-r from-purple-200 via-purple-300 to-purple-400 text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold text-black mb-6">Insurance Policy Management</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="policy-form bg-purple-700 p-6 rounded-lg shadow-md space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Provider</label>
          <input type="text" value={provider} onChange={(e) => setProvider(e.target.value)} className="input-field" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Policy Number</label>
          <input type="text" value={policyNumber} onChange={(e) => setPolicyNumber(e.target.value)} className="input-field" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Coverage</label>
          <input type="text" value={coverage} onChange={(e) => setCoverage(e.target.value)} className="input-field" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Premium Amount</label>
          <input type="text" value={premiumAmount} onChange={(e) => setPremiumAmount(e.target.value)} className="input-field" required />
        </div>
        <button type="submit" className="submit-button">Add Policy</button>
      </form>
      <h2 className="text-xl font-semibold text-purple-300 mt-6 mb-4">Uploaded Policies</h2>
      <div className="overflow-x-auto">
        <table className="policy-table w-full bg-purple-700 rounded-lg shadow-md">
          <thead className="bg-purple-800">
            <tr>
              <th>Provider</th>
              <th>Policy Number</th>
              <th>Coverage</th>
              <th>Premium Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {policies.map((policy) => (
              <tr key={policy.id}>
                <td>{policy.provider}</td>
                <td>{policy.policyNumber}</td>
                <td>{policy.coverage}</td>
                <td>{policy.premiumAmount}</td>
                <td>
                  <button onClick={() => handleDelete(policy.id)} className="delete-button">Delete</button>
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
