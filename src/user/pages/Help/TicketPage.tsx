/* eslint-disable @typescript-eslint/no-unused-vars */
import  { useEffect, useState } from "react";

interface Ticket {
  ticketId?: string;
  name?: string;
  email?: string;
  timestamp?: string;
  type?: string;
  status?: string;
}

const TicketsPage = ({ setCurrentPage }: { setCurrentPage: (page: string) => void }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    try {
      const savedTickets = JSON.parse(localStorage.getItem("tickets") || "[]") || [];
      setTickets(Array.isArray(savedTickets) ? savedTickets : []);
    } catch (error) {
      console.error("Error fetching tickets:", error);
      setTickets([]);
    }
  }, []);

  return (
    <div className="tickets-container bg-white shadow-lg rounded-lg p-6 min-h-screen">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">My Tickets</h2>

      <button className="help-btn bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
        onClick={() => setCurrentPage("createTicket")}>
        Create Support Ticket
      </button>

      <div className="overflow-x-auto mt-4">
        <table className="tickets-table w-full border-collapse shadow-md">
          <thead>
            <tr className="bg-purple-100 text-purple-800">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Created Date</th>
              <th className="p-2">Ticket Type</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.length === 0 ? (
              <tr><td colSpan={6} className="text-center p-4 text-gray-600">No tickets available.</td></tr>
            ) : (
              tickets.map((ticket, index) => (
                <tr key={ticket.ticketId || index} className="border-b hover:bg-purple-50 transition">
                  <td className="p-2">{ticket.name || "N/A"}</td>
                  <td className="p-2">{ticket.email || "N/A"}</td>
                  <td className="p-2">{ticket.timestamp || "N/A"}</td>
                  <td className="p-2">{ticket.type || "N/A"}</td>
                  <td className={`p-2 font-medium rounded-md ${
                    ticket.status === "Approved" ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {ticket.status || "N/A"}
                  </td>
                  <td className="p-2 text-center">...</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketsPage;
