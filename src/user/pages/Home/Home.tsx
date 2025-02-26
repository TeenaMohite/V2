import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Quote = {
  id: string;
  name: string;
  requestDate: string;
  status: "Pending" | "Completed";
  amount: string;
};

const Home = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [userName, setUserName] = useState("User");
  const navigate = useNavigate();

  useEffect(() => {
    try {
      // Fetch quotes from local storage
      const savedQuotes: Quote[] = JSON.parse(localStorage.getItem("userquotes") || "[]");
      setQuotes(savedQuotes);
      // Fetch logged-in user's name from local storage
      const storedUser = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
      if (storedUser?.name) {
        setUserName(storedUser.name);
      }
    } catch (error) {
      console.error("Error fetching data from localStorage:", error);
    }
  }, []);

  const getStats = () => {
    const total = quotes.length;
    const pending = quotes.filter((q) => q.status === "Pending").length;
    const completed = quotes.filter((q) => q.status === "Completed").length;
    return [
      { label: "Total Quotes", value: total, trend: "+2.5%" },
      { label: "Pending Quotes", value: pending, trend: "+1.8%" },
      { label: "Completed Quotes", value: completed, trend: "+5.2%" },
    ];
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-purple-200 via-purple-300 to-purple-400 text-white">
      {/* Header Section */}
      <header className="bg-purple-700 shadow-md py-4 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-purple-300">Hi {userName},</h1>
          <p className="text-sm text-gray-300">Ready to start your day?</p>
        </div>
      </header>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
        {getStats().map((stat, index) => (
          <div
            key={index}
            className="bg-purple-200 rounded-lg shadow-md p-4 flex flex-col items-center justify-center"
          >
            <p className="text-lg font-medium text-black">{stat.label}</p>
            <p className="text-2xl font-bold text-black">{stat.value}</p>
            <p
              className={`text-sm ${
                stat.trend.includes("+") ? "text-green-700" : "text-red-500"
              }`}
            >
              {stat.trend}
            </p>
          </div>
        ))}
      </section>

      {/* Recent Quotes Section */}
      <section className="p-6">
        <h2 className="text-xl font-semibold text-purple-600 mb-4">Recent Quotes</h2>
        {quotes.length === 0 ? (
          <p className="text-gray-300">No quotes available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-purple-200 border border-yellow-700 rounded-lg overflow-hidden text-black">
              <thead className="bg-purple-600">
                <tr>
                  <th className="py-2 px-4 text-left text-sm font-medium text-gray-300">ID</th>
                  <th className="py-2 px-4 text-left text-sm font-medium text-gray-300">Name</th>
                  <th className="py-2 px-4 text-left text-sm font-medium text-gray-300">Request Date</th>
                  <th className="py-2 px-4 text-left text-sm font-medium text-gray-300">Status</th>
                  <th className="py-2 px-4 text-left text-sm font-medium text-gray-300">Amount</th>
                  <th className="py-2 px-4 text-left text-sm font-medium text-gray-300">Action</th>
                </tr>
              </thead>
              <tbody>
                {quotes.map((quote) => (
                  <tr key={quote.id} className="border-t border-yellow-700">
                    <td className="py-2 px-4 text-sm text-black-300">#{quote.id}</td>
                    <td className="py-2 px-4 text-sm text-black-300">{quote.name}</td>
                    <td className="py-2 px-4 text-sm text-black-300">{quote.requestDate}</td>
                    <td className="py-2 px-4 text-sm text-black-300">{quote.status}</td>
                    <td className="py-2 px-4 text-sm text-black-300">${quote.amount}</td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => navigate(`/quote-details/${quote.id}`)}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-md shadow-md transition duration-300 ease-in-out"
                      >
                        View
                      </button>
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