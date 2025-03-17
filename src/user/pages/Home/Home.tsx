/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Coverage = {
  medical: boolean;
  rental: boolean;
  roadside: boolean;
};

type RequiredPolicy = {
  comprehensive: boolean;
  collision: boolean;
  liability: boolean;
};

type Quote = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  make: string;
  model: string;
  year: string;
  vin: string;
  mileage: string;
  condition: string;
  requiredPolicy: RequiredPolicy;
  coverage: Coverage;
  documents: string[];
  additionalNotes: string;
  amount: string;
  status: "Pending" | "Completed";
  requestDate: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const Home = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [userName, ] = useState("User");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuotes();
    
    const syncQuotes = () => fetchQuotes();
    window.addEventListener("storage", syncQuotes);
    return () => window.removeEventListener("storage", syncQuotes);
  }, []);

  const fetchQuotes = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/quotes/getall");
      const data = await response.json();
      
      // Ensure quotes is always an array
      if (Array.isArray(data)) {
        setQuotes(data);
      } else if (data && typeof data === 'object' && data.quotes && Array.isArray(data.quotes)) {
        setQuotes(data.quotes);
      } else {
        console.error("Unexpected API response format:", data);
        setQuotes([]);
      }
    } catch (error) {
      console.error("Error fetching quotes:", error);
      setQuotes([]);
    } finally {
      setIsLoading(false);
    }
  };

  const markAsCompleted = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/quotes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status: "Completed" })
      });
  
      if (!response.ok) throw new Error("Failed to update quote");
  
      setQuotes((prevQuotes) =>
        prevQuotes.map((quote) =>
          quote._id === id ? { ...quote, status: "Completed" } : quote
        )
      );
    } catch (error) {
      console.error("Error updating quote:", error);
    }
  };

  const getStats = () => {
    // Ensure quotes is an array before using array methods
    const quotesArray = Array.isArray(quotes) ? quotes : [];
    
    const total = quotesArray.length;
    const pending = quotesArray.filter((q) => q.status === "Pending").length;
    const completed = quotesArray.filter((q) => q.status === "Completed").length;
    
    // Calculate total amount with safety checks
    const totalAmount = quotesArray.reduce((sum, quote) => {
      const amount = parseFloat(quote.amount) || 0;
      return sum + amount;
    }, 0).toFixed(2);
    
    return [
      { label: "Total Quotes", value: total },
      { label: "Pending Quotes", value: pending },
      { label: "Completed Quotes", value: completed },
      { label: "Total Value", value: `$${totalAmount}` },
    ];
  };

  const handleRequestQuote = () => {
    navigate("/user/request-quote");
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A";
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch (error) {
      return "Invalid Date";
    }
  };

  const getQuoteName = (quote: Quote) => {
    return `${quote.firstName} ${quote.lastName}`;
  };

  const getVehicleInfo = (quote: Quote) => {
    return `${quote.year} ${quote.make} ${quote.model}`;
  };

  const getIdDisplay = (id: string | undefined) => {
    if (!id) return "N/A";
    return id.substring(0, 6);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-purple-200 via-purple-300 to-purple-400 text-white">
      {/* Header Section */}
      <header className="bg-purple-700 shadow-md py-4 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-purple-300">Hi {userName},</h1>
          <div>
            <button
              onClick={handleRequestQuote}
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md shadow-md transition duration-300 ease-in-out flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Request Quote
            </button>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6">
        {getStats().map((stat, index) => (
          <div
            key={index}
            className="bg-purple-200 rounded-lg shadow-md p-4 flex flex-col items-center justify-center"
          >
            <p className="text-lg font-medium text-black">{stat.label}</p>
            <p className="text-2xl font-bold text-black">{stat.value}</p>
          </div>
        ))}
      </section>

      {/* Recent Quotes Section */}
      <section className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-purple-800">Recent Quotes</h2>
          <button
            onClick={handleRequestQuote}
            className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-md shadow-md transition duration-300 ease-in-out"
          >
            New Quote
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-900"></div>
          </div>
        ) : !Array.isArray(quotes) || quotes.length === 0 ? (
          <div className="bg-purple-200 p-8 rounded-lg text-center text-black">
            <p className="mb-4">No quotes available yet.</p>
            <button
              onClick={handleRequestQuote}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md shadow-md transition duration-300 ease-in-out"
            >
              Create Your First Quote
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-purple-200 border border-purple-700 rounded-lg overflow-hidden text-black">
              <thead className="bg-purple-600">
                <tr>
                  <th className="py-2 px-4 text-left text-sm font-medium text-white">ID</th>
                  <th className="py-2 px-4 text-left text-sm font-medium text-white">Name</th>
                  <th className="py-2 px-4 text-left text-sm font-medium text-white">Vehicle</th>
                  <th className="py-2 px-4 text-left text-sm font-medium text-white">Request Date</th>
                  <th className="py-2 px-4 text-left text-sm font-medium text-white">Status</th>
                  <th className="py-2 px-4 text-left text-sm font-medium text-white">Amount</th>
                  <th className="py-2 px-4 text-left text-sm font-medium text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {quotes.map((quote) => (
                  <tr key={quote._id} className="border-t border-purple-300 hover:bg-purple-300 transition-colors duration-200">
                    <td className="py-2 px-4 text-sm text-black">#{getIdDisplay(quote._id)}</td>
                    <td className="py-2 px-4 text-sm text-black">{getQuoteName(quote)}</td>
                    <td className="py-2 px-4 text-sm text-black">{getVehicleInfo(quote)}</td>
                    <td className="py-2 px-4 text-sm text-black">{formatDate(quote.requestDate)}</td>
                    <td className="py-2 px-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        quote.status === "Completed" ? "bg-green-200 text-green-800" : "bg-yellow-200 text-yellow-800"
                      }`}>
                        {quote.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 text-sm text-black">${quote.amount}</td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => navigate(`/user/quote-details/${quote._id}`)}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-md shadow-md transition duration-300 ease-in-out"
                      >
                        View
                      </button>
                      {quote.status === "Pending" && (
                        <button
                          onClick={() => markAsCompleted(quote._id)}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 ml-2 rounded-md shadow-md transition duration-300 ease-in-out"
                        >
                          Complete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;