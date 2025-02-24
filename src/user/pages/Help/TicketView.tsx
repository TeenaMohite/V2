import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const TicketView = () => {
  const { ticketId } = useParams(); // Get ticket ID from URL
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    // ✅ Fetch ticket from localStorage using ticketId
    const savedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
    const foundTicket = savedTickets.find((ticket) => ticket.ticketId === ticketId);

    setTicket(foundTicket || null); // Set ticket or handle not found case
  }, [ticketId]);

  if (!ticket) {
    return <p className="text-gray-500 text-lg text-center mt-6">Ticket not found.</p>; // ✅ Prevents blank screen if ticket is missing
  }

  return (
    <div className="ticket-view-container bg-white p-6 min-h-screen shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">Ticket Details</h2>

      <div className="ticket-info bg-purple-100 p-4 rounded-lg shadow-md">
        <p className="text-gray-700">
          <strong className="text-purple-700">Ticket ID:</strong> {ticket.ticketId}
        </p>
        <p className="text-gray-700">
          <strong className="text-purple-700">Full Name:</strong> {ticket.fullName}
        </p>
        <p className="text-gray-700">
          <strong className="text-purple-700">Email:</strong> {ticket.email}
        </p>
        <p className="text-gray-700">
          <strong className="text-purple-700">Phone:</strong> {ticket.phone}
        </p>
        <p className="text-gray-700">
          <strong className="text-purple-700">Category:</strong> {ticket.category}
        </p>
        <p className="text-gray-700">
          <strong className="text-purple-700">Subject:</strong> {ticket.subject}
        </p>
        <p className="text-gray-700">
          <strong className="text-purple-700">Description:</strong> {ticket.description}
        </p>
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
            {ticket.status}
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
