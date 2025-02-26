import { useState, useEffect } from "react";
import { Search, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Quote {
  id: string;
  name: string;
  requestDate: string;
  insuranceType: string;
  vehicleType: string;
  amount: string;
  status: string;
}

const UserQuotesList: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/quotes/getall");
        if (!response.ok) {
          throw new Error("Failed to fetch quotes");
        }
        const data = await response.json();
        
        if (!Array.isArray(data)) {
          throw new Error("Invalid data format");
        }
        
        const transformedQuotes: Quote[] = data.map((quote) => ({
          id: quote._id || "",
          name: `${quote.firstName || ""} ${quote.lastName || ""}`.trim(),
          requestDate: quote.requestDate ? new Date(quote.requestDate).toLocaleDateString() : "N/A",
          insuranceType: quote.requiredPolicy?.comprehensive ? "Full" : "3rd Party",
          vehicleType: `${quote.make || "Unknown"} ${quote.model || "Unknown"}`.trim(),
          amount: quote.amount ? quote.amount.toString() : "0",
          status: quote.status || "Unknown",
        }));

        setQuotes(transformedQuotes);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred while fetching quotes");
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  const filteredQuotes = quotes.filter((quote) => 
    quote.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="quotes-container bg-gradient-to-r from-purple-200 via-purple-300 to-purple-400 text-gray-900 min-h-screen p-6">
      <div className="quotes-header flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-purple-800">Quote Requests</h1>
        <button
          className="request-quote-button bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md shadow-md transition duration-300 ease-in-out"
          onClick={() => navigate("/user/request-quote")}
        >
          Request Quote
        </button>
      </div>

      <div className="search-bar flex items-center bg-purple-300 p-2 rounded-md shadow-md mb-6">
        <Search size={20} className="text-gray-700 mr-2" />
        <input
          type="text"
          placeholder="Search quotes"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent text-gray-900 placeholder-gray-600 outline-none flex-grow"
        />
      </div>

      {loading && (
        <div className="loader-container flex flex-col items-center justify-center space-y-2">
          <div className="loader w-8 h-8 border-t-2 border-b-2 border-purple-500 rounded-full animate-spin"></div>
          <p className="text-gray-700">Loading quotes...</p>
        </div>
      )}

      {error && (
        <div className="error-message bg-red-500 text-white p-4 rounded-md shadow-md">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="quotes-table overflow-x-auto">
          <table className="w-full bg-purple-300 rounded-lg shadow-md">
            <thead>
              <tr className="bg-purple-500">
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-900">Name</th>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-900">Request Date</th>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-900">Insurance Type</th>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-900">Vehicle Type</th>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-900">Amount</th>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuotes.length > 0 ? (
                filteredQuotes.map((quote) => (
                  <tr key={quote.id} className="border-b border-purple-400">
                    <td className="py-2 px-4 text-sm text-gray-900">{quote.name}</td>
                    <td className="py-2 px-4 text-sm text-gray-900">{quote.requestDate}</td>
                    <td className="py-2 px-4 text-sm text-gray-900">{quote.insuranceType}</td>
                    <td className="py-2 px-4 text-sm text-gray-900">{quote.vehicleType}</td>
                    <td className="py-2 px-4 text-sm text-gray-900">${quote.amount}</td>
                    <td className="py-2 px-4 text-sm text-gray-900">{quote.status}</td>
                    <td className="py-2 px-4 text-sm">
                      <button
                        className="view-button bg-purple-600 hover:bg-purple-700 text-white px-2 py-1 rounded-md shadow-md transition duration-300 ease-in-out flex items-center space-x-1"
                        onClick={() => navigate(`/user/quote-details/${quote.id}`)}
                      >
                        <Eye size={16} /> <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-4 text-center text-gray-700">
                    No quotes found.
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

export default UserQuotesList;
