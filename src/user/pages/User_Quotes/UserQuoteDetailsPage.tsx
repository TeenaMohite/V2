import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


type Quote = {
  id: string;
  name: string;
  requestDate: string;
  status: "Pending" | "Completed";
  amount: string;
};

const UserQuoteDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    if (!id) return;

    const fetchQuote = () => {
      console.log("Fetching quote for ID:", id);
      const savedQuotes: Quote[] = JSON.parse(localStorage.getItem("quotes") || "[]");
      console.log("Saved Quotes:", savedQuotes);
      const foundQuote = savedQuotes.find((q) => q.id === id);
      console.log("Found Quote:", foundQuote);

      if (foundQuote) {
        setQuote(foundQuote);
      } else {
        console.error("Quote not found!");
      }
      setLoading(false);
    };

    fetchQuote();
  }, [id]);

  if (loading) {
    return (
      <div className="quote-details-container">
        <h2>Loading Quote Details...</h2>
      </div>
    );
  }

  if (!quote) {
    return (
      <div className="quote-details-container">
        <h2>Quote Not Found</h2>
        <button className="back-button" onClick={() => navigate(-1)}>Back</button>
      </div>
    );
  }

  return (
    <div className="quote-details-container">
      <h2>Quote Details</h2>
      <div className="quote-info">
        <p><strong>ID:</strong> #{quote.id}</p>
        <p><strong>Customer Name:</strong> {quote.name}</p>
        <p><strong>Request Date:</strong> {quote.requestDate}</p>
        <p><strong>Status:</strong> 
          <span className={`status ${quote.status.toLowerCase()}`}>
            {quote.status}
          </span>
        </p>
        <p><strong>Amount:</strong> ${quote.amount}</p>
      </div>
      <div className="button-group">
        <button className="back-button" onClick={() => navigate(-1)}>Back</button>
      </div>
    </div>
  );
};

export default UserQuoteDetailsPage;
