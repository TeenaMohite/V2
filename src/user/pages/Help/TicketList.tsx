import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Ticket {
  ticketId: string;
  fullName: string;
  email: string;
  phone: string;
  category: string;
  subject: string;
  description: string;
  attachment: string | null;
  timestamp: string;
  status: "Pending" | "Resolved";
}

const TicketList = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedTickets: Ticket[] = JSON.parse(localStorage.getItem("tickets") || "[]");
    setTickets(savedTickets);
  }, []);

  const deleteTicket = (ticketId: string) => {
    const updatedTickets = tickets.filter((ticket) => ticket.ticketId !== ticketId);
    setTickets(updatedTickets);
    localStorage.setItem("tickets", JSON.stringify(updatedTickets));
  };

  return (
    <div className="ticket-list-container bg-white min-h-screen p-6 shadow-lg rounded-lg">
      <div className="ticket-header flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-purple-700">Your Support Tickets</h2>
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md shadow-md transition"
          onClick={() => navigate("/user/help")}
        >
          Go to Help Page
        </button>
      </div>

      {tickets.length === 0 ? (
        <p className="text-gray-500 text-lg text-center">No tickets found.</p>
      ) : (
        <ul className="space-y-4">
          {tickets.map((ticket) => (
            <li key={ticket.ticketId} className="ticket-item bg-purple-100 p-4 rounded-lg shadow-md flex justify-between items-center hover:bg-purple-200 transition">
              <div className="ticket-details">
                <span className="ticket-id text-purple-700 font-semibold">{ticket.ticketId}</span> -{" "}
                <span className="ticket-subject text-gray-600">{ticket.subject}</span>
                <span className={`ml-4 px-2 py-1 rounded-md text-xs font-semibold ${ticket.status === "Pending" ? "bg-yellow-200 text-yellow-800" : "bg-green-200 text-green-800"}`}>
                  {ticket.status}
                </span>
              </div>
              <div className="ticket-actions space-x-2">
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-md shadow-md transition" onClick={() => navigate(`/user/ticket-view/${ticket.ticketId}`)}>View</button>
                <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md shadow-md transition" onClick={() => deleteTicket(ticket.ticketId)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TicketList;
