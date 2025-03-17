/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

type Quote = {
  _id: string;
  amount: string;
  details: string;
  firstName: string;
  requestDate: string;
  status: "Pending" | "Completed";
  createdAt: string;
  updatedAt: string;
  requiredPolicy: {
    comprehensive: boolean;
    collision: boolean;
    liability: boolean;
  };
  coverage: {
    medical: boolean;
    rental: boolean;
    roadside: boolean;
  };
  documents: any[];
};

const UserQuoteDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchQuote = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/quotes/${id}`);
        const responseText = await response.text();
        console.log("Raw Response:", responseText);

        if (!response.ok) {
          const errorData = JSON.parse(responseText);
          throw new Error(errorData.message || "Failed to fetch quote");
        }

        const data = JSON.parse(responseText);
        console.log("Data:", data);
        setQuote(data);
      } catch (err) {
        console.error("Error fetching quote:", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, [id]);

  if (loading) {
    return (
      <div className="quote-details-container bg-purple-100 min-h-screen flex items-center justify-center">
        <h2 className="text-purple-700 text-2xl font-bold">Loading Quote Details...</h2>
      </div>
    );
  }

  if (error || !quote) {
    return (
      <div className="quote-details-container bg-purple-100 min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-purple-800 text-xl font-semibold">{error || "Quote Not Found"}</h2>
        <button
          className="back-button mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition duration-300"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="quote-details-container bg-purple-100 min-h-screen p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-purple-800 mb-4">Quote Details</h2>
        <div className="quote-info space-y-2">
          <p className="text-purple-700"><strong>ID:</strong> #{quote._id}</p>
          <p className="text-purple-700"><strong>Details:</strong> {quote.firstName}</p>
          <p className="text-purple-700"><strong>Request Date:</strong> {new Date(quote.requestDate).toLocaleDateString()}</p>
          <p className="text-purple-700"><strong>Status:</strong> 
            <span className={`status ml-2 px-2 py-1 rounded text-white ${quote.status === "Pending" ? "bg-purple-500" : "bg-green-500"}`}>
              {quote.status}
            </span>
          </p>
          <p className="text-purple-700"><strong>Amount:</strong> ${quote.amount}</p>

          <div className="policy-section mt-4">
            <h3 className="text-xl font-semibold text-purple-800">Required Policy</h3>
            <ul className="list-disc list-inside text-purple-700">
              <li>Comprehensive: {quote.requiredPolicy.comprehensive ? "Yes" : "No"}</li>
              <li>Collision: {quote.requiredPolicy.collision ? "Yes" : "No"}</li>
              <li>Liability: {quote.requiredPolicy.liability ? "Yes" : "No"}</li>
            </ul>
          </div>

          <div className="coverage-section mt-4">
            <h3 className="text-xl font-semibold text-purple-800">Additional Coverage</h3>
            <ul className="list-disc list-inside text-purple-700">
              <li>Medical: {quote.coverage.medical ? "Yes" : "No"}</li>
              <li>Rental: {quote.coverage.rental ? "Yes" : "No"}</li>
              <li>Roadside: {quote.coverage.roadside ? "Yes" : "No"}</li>
            </ul>
          </div>
        </div>
        <div className="button-group mt-6">
          <button
            className="back-button px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition duration-300"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserQuoteDetailsPage;