import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const TicketView = () => {
  const { ticketId } = useParams(); // Get ticket ID from URL
  const navigate = useNavigate();
  interface Ticket {
    ticketId: string;
    fullName: string;
    email: string;
    phone: string;
    category: string;
    subject: string;
    description: string;
    status: string;
  }

  const [ticket, setTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    const savedTickets = JSON.parse(localStorage.getItem("tickets") || "[]") || [];
    const foundTicket = savedTickets.find((t: { ticketId: string | undefined; }) => t.ticketId === ticketId);
    setTicket(foundTicket || null);
  }, [ticketId]);

  if (!ticket) {
    return <p className="text-gray-500 text-lg text-center mt-6">Ticket not found.</p>;
  }

  return (
    <div className="ticket-view-container bg-white p-6 min-h-screen shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">Ticket Details</h2>

      <div className="ticket-info bg-purple-100 p-4 rounded-lg shadow-md">
        {[
          { label: "Ticket ID", value: ticket.ticketId },
          { label: "Full Name", value: ticket.fullName },
          { label: "Email", value: ticket.email },
          { label: "Phone", value: ticket.phone },
          { label: "Category", value: ticket.category },
          { label: "Subject", value: ticket.subject },
          { label: "Description", value: ticket.description },
        ].map(({ label, value }, index) => (
          <p key={index} className="text-gray-700">
            <strong className="text-purple-700">{label}:</strong> {value || "N/A"}
          </p>
        ))}
        <p className="text-gray-700">
          <strong className="text-purple-700">Status:</strong>{" "}
          <span
            className={`px-2 py-1 rounded-md text-sm font-semibold ${
              ticket.status === "Pending"
                ? "bg-yellow-200 text-yellow-800"
                : ticket.status === "Resolved"
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            {ticket.status || "Unknown"}
          </span>
        </p>
      </div>

      <button
        className="ticket-list-btn bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md shadow-md transition mt-6"
        onClick={() => navigate("/user/tickets")}
      >
        Back to Ticket List
      </button>
    </div>
  );
};

export default TicketView;
