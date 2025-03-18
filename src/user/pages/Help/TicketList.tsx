import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Ticket {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  category: string;
  subject: string;
  description: string;
  attachment?: string | null;
  status: "Open" | "Pending" | "Resolved";
  createdAt: string;
  updatedAt: string;
}

const TicketList = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchTickets = () => {
    setIsLoading(true);
    fetch("http://localhost:5000/api/tickets/getall")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch tickets");
        }
        return res.json();
      })
      .then((data) => {
        setTickets(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tickets:", err);
        setError("Failed to load tickets. Please try again later.");
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const deleteTicket = async (ticketId: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tickets/delete/${ticketId}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        throw new Error("Failed to delete ticket");
      }
      
      setTickets(tickets.filter(ticket => ticket._id !== ticketId));
    } catch (error) {
      console.error("Error deleting ticket:", error);
      setError("Failed to delete ticket. Please try again.");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-blue-200 text-blue-800";
      case "Pending":
        return "bg-yellow-200 text-yellow-800";
      case "Resolved":
        return "bg-green-200 text-green-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  if (isLoading) {
    return <div className="text-center p-6">Loading tickets...</div>;
  }

  if (error) {
    return <div className="text-center p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="ticket-list-container bg-white min-h-screen p-6 shadow-lg rounded-lg">
      <div className="ticket-header flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-purple-700">Your Support Tickets</h2>
        <div className="flex space-x-3">
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md shadow-md transition"
            onClick={() => navigate("/user/help")}
          >
            Create New Ticket
          </button>
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow-md transition"
            onClick={() => fetchTickets()}
          >
            Refresh
          </button>
        </div>
      </div>

      {tickets.length === 0 ? (
        <div className="text-center p-10">
          <p className="text-gray-500 text-lg">No tickets found.</p>
          <p className="text-gray-400 mt-2">Create a new ticket for support.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-purple-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-purple-700">ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-purple-700">Subject</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-purple-700">Category</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-purple-700">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-purple-700">Created</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-purple-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tickets.map((ticket) => (
                <tr key={ticket._id} className="hover:bg-purple-50 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-700 font-mono">
                    {ticket._id.slice(-6)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                    {ticket.subject}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {ticket.category}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-md text-xs font-semibold ${getStatusStyle(ticket.status)}`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {formatDate(ticket.createdAt)}
                  </td>
                  <td className="px-4 py-3 text-sm text-right">
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md shadow-sm transition"
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete this ticket?")) {
                          deleteTicket(ticket._id);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TicketList;