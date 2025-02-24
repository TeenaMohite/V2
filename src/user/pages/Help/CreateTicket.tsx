import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateTicket = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    category: "",
    subject: "",
    description: "",
    attachment: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, attachment: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ticketId = `${Math.floor(Math.random() * 900000) + 100000}`;
    const newTicket = {
      ...formData,
      ticketId,
      timestamp: new Date().toLocaleString(),
      status: "Pending",
    };
    const savedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
    localStorage.setItem("tickets", JSON.stringify([...savedTickets, newTicket]));
    navigate(`/user/ticket-view/${ticketId}`, { state: { ticket: newTicket } });
  };

  return (
    <div className="create-ticket-container bg-gradient-to-r from-white via-purple-100 to-white text-gray-900 min-h-screen p-6">
      <h2 className="text-2xl font-bold text-purple-700 mb-6">Create Support Ticket</h2>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-purple-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Your Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-purple-50 border border-purple-300 rounded-md text-gray-900 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-purple-50 border border-purple-300 rounded-md text-gray-900 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="Your Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-purple-50 border border-purple-300 rounded-md text-gray-900 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-purple-50 border border-purple-300 rounded-md text-gray-900 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">Select Category</option>
              <option value="Login Issue">Login Issue</option>
              <option value="Payment Issue">Payment Issue</option>
              <option value="Technical Support">Technical Support</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Ticket Subject</label>
          <input
            type="text"
            name="subject"
            placeholder="Enter Ticket Subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-purple-50 border border-purple-300 rounded-md text-gray-900 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Attachment</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full px-3 py-2 bg-purple-50 border border-purple-300 rounded-md text-gray-900 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Issue Description</label>
          <textarea
            name="description"
            placeholder="Describe your issue..."
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-3 py-2 bg-purple-50 border border-purple-300 rounded-md text-gray-900 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate("/user/help")}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition"
          >
            Submit Ticket
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTicket;
