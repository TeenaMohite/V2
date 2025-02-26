// import React from "react";
import { useNavigate } from "react-router-dom";

const HelpPage = () => {
  const navigate = useNavigate();
  return (
    <div className="help-container bg-gradient-to-r from-purple-200 via-purple-300 to-purple-400 text-white min-h-screen p-6">
      {/* Header Section */}
      <div className="help-header flex justify-between items-center mb-6">
        <div className="button-group space-x-4">
          <button
            className="help-btn bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md shadow-md transition duration-300 ease-in-out"
            onClick={() => navigate("/user/create-ticket")}
          >
            Create Support Ticket
          </button>
          <button
            className="help-btn bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md shadow-md transition duration-300 ease-in-out"
            onClick={() => navigate("/user/tickets")}
          >
            View Tickets
          </button>
        </div>
        <h1 className="help-user text-2xl font-bold text-purple-800">Hello User</h1>
      </div>

      {/* Content Section */}
      <div className="help-content bg-purple-600 p-6 rounded-lg shadow-md text-center">
        <img
          src="/help.jpg"
          alt="Help Illustration"
          className="help-image w-full h-64 object-cover rounded-md mb-4"
        />
        <p className="help-text text-gray-300 text-lg">
          Need Assistance? We're Here to Help! <br />
          Have a question or facing an issue? Submit a support ticket, and our team will respond as soon as possible.
        </p>
      </div>
    </div>
  );
};

export default HelpPage;
