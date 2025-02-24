import React from "react";
import { QuoteFormData } from "../UserRequestQuote";

interface Props {
  formData: QuoteFormData;
  updateFormData: (data: Partial<QuoteFormData>) => void;
  onNext: () => void;
}

const CustomerDetails: React.FC<Props> = ({ formData, updateFormData, onNext }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="form-container bg-white p-6 rounded-lg shadow-md text-gray-900">
      {/* Title */}
      <h2 className="form-title text-2xl font-bold text-purple-700 mb-4">Customer Details</h2>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="form-grid grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name */}
          <div className="form-group">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={(e) => updateFormData({ firstName: e.target.value })}
              required
              className="w-full px-3 py-2 bg-purple-100 border border-purple-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Last Name */}
          <div className="form-group">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={(e) => updateFormData({ lastName: e.target.value })}
              required
              className="w-full px-3 py-2 bg-purple-100 border border-purple-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => updateFormData({ email: e.target.value })}
              required
              className="w-full px-3 py-2 bg-purple-100 border border-purple-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Phone Number */}
          <div className="form-group">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => updateFormData({ phone: e.target.value })}
              required
              className="w-full px-3 py-2 bg-purple-100 border border-purple-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Address */}
          <div className="form-group">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              id="address"
              value={formData.address}
              onChange={(e) => updateFormData({ address: e.target.value })}
              required
              className="w-full px-3 py-2 bg-purple-100 border border-purple-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* City */}
          <div className="form-group">
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              id="city"
              value={formData.city}
              onChange={(e) => updateFormData({ city: e.target.value })}
              required
              className="w-full px-3 py-2 bg-purple-100 border border-purple-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* State */}
          <div className="form-group">
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
              State
            </label>
            <input
              type="text"
              id="state"
              value={formData.state}
              onChange={(e) => updateFormData({ state: e.target.value })}
              required
              className="w-full px-3 py-2 bg-purple-100 border border-purple-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* ZIP Code */}
          <div className="form-group">
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
              ZIP Code
            </label>
            <input
              type="text"
              id="zipCode"
              value={formData.zipCode}
              onChange={(e) => updateFormData({ zipCode: e.target.value })}
              required
              className="w-full px-3 py-2 bg-purple-100 border border-purple-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
        </div>

        {/* Button Group */}
        <div className="button-group mt-6 flex justify-end">
          <button
            type="submit"
            className="button button-primary bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md shadow-md transition duration-300 ease-in-out"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerDetails;
