import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Tickets = () => {
  interface Ticket {
    ticketId: string;
    subject: string;
    timestamp: string;
    status: string;
  }

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const savedTickets = JSON.parse(localStorage.getItem("tickets") || "[]");
      setTickets(Array.isArray(savedTickets) ? savedTickets : []);
    } catch (error) {
      console.error("Error parsing tickets:", error);
      setTickets([]);
    }
  }, []);

  return (
    <div className="tickets-container bg-gradient-to-r from-white via-purple-100 to-white min-h-screen p-6 text-gray-900">
      <h2 className="text-2xl font-bold text-purple-700 mb-6">Your Support Tickets</h2>

      {tickets.length === 0 ? (
        <p className="text-gray-600">No tickets available.</p>
      ) : (
        <div className="grid gap-4">
          {tickets.map((ticket, index) => (
            <div className="ticket-card bg-white border border-purple-300 p-4 rounded-lg shadow-md cursor-pointer hover:bg-purple-50 transition"
              key={ticket.ticketId || index}
              onClick={() => navigate(`/user/ticket-view/${ticket.ticketId}`, { state: { ticket } })}>
              <h3 className="text-lg font-semibold text-purple-800">{ticket.subject || "No Subject"}</h3>
              <p className="text-sm text-gray-600">{ticket.timestamp || "Unknown Date"}</p>
              <span className={`ticket-status text-sm font-medium px-2 py-1 rounded ${
                ticket.status === "Pending" ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}>
                {ticket.status || "Unknown Status"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tickets;
