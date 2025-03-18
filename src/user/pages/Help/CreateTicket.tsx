import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  category: string;
  subject: string;
  description: string;
}

const CreateTicket = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    category: "",
    subject: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    const { fullName, email, phone, category, subject, description } = formData;
    if (!fullName || !email || !phone || !category || !subject || !description) {
      alert("Please fill out all required fields.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }
    if (!/^\d{10}$/.test(phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    try {
      const response = await fetch("http://localhost:5000/api/tickets/create", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert("Ticket created successfully!");
        navigate(`/user/tickets`);
      } else {
        alert(`Failed to create ticket: ${data.message}`);
      }
    } catch (error) {
      console.error("Error creating ticket:", error);
      alert("An error occurred while creating the ticket.");
    }
  };

  return (
    <div className="bg-gradient-to-r from-white via-purple-100 to-white text-gray-900 min-h-screen p-6 flex flex-col items-center">
      <h2 className="text-2xl font-bold text-purple-700 mb-6">Create Support Ticket</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-purple-300 w-full max-w-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required className="w-full px-3 py-2 bg-purple-50 border border-purple-300 rounded-md"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-3 py-2 bg-purple-50 border border-purple-300 rounded-md"/>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full px-3 py-2 bg-purple-50 border border-purple-300 rounded-md"/>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select name="category" value={formData.category} onChange={handleChange} required className="w-full px-3 py-2 bg-purple-50 border border-purple-300 rounded-md">
            <option value="">Select Category</option>
            <option value="Technical Issue">Technical Issue</option>
            <option value="Billing">Billing</option>
            <option value="Account Access">Account Access</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Subject</label>
          <input type="text" name="subject" value={formData.subject} onChange={handleChange} required className="w-full px-3 py-2 bg-purple-50 border border-purple-300 rounded-md"/>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Issue Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required rows={4} className="w-full px-3 py-2 bg-purple-50 border border-purple-300 rounded-md"></textarea>
        </div>
   
        <div className="flex justify-between">
          <button type="button" onClick={() => navigate("/user/help")} className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md">Cancel</button>
          <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md">Submit Ticket</button>
        </div>
      </form>
    </div>
  );
};

export default CreateTicket;