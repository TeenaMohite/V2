import  { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


type Policy = {
  id: string;
  name: string;
  insuranceType: string;
  vehicleType: string;
};

const PolicyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [policy, setPolicy] = useState<Policy | null>(null);

  useEffect(() => {
    const storedPolicies: Policy[] = JSON.parse(localStorage.getItem("userpolicies") || "[]");
    const foundPolicy = storedPolicies.find((p) => p.id === id);
    setPolicy(foundPolicy || null);
  }, [id]);

  if (!policy) {
    return <p>Policy not found.</p>;
  }

  return (
    <div className="policy-details-container">
      <h2>Policy Details</h2>
      <p><strong>Name:</strong> {policy.name}</p>
      <p><strong>Insurance Type:</strong> {policy.insuranceType}</p>
      <p><strong>Vehicle Type:</strong> {policy.vehicleType}</p>

      <button className="back-button" onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
};

export default PolicyDetails;
