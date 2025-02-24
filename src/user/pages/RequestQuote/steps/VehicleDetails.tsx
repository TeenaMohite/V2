import React from "react";
import { QuoteFormData } from "../UserRequestQuote";

interface Props {
  formData: QuoteFormData;
  updateFormData: (data: Partial<QuoteFormData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const VehicleDetails: React.FC<Props> = ({ formData, updateFormData, onNext, onPrevious }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="form-container bg-white p-6 rounded-lg shadow-md text-gray-900">
      {/* Title */}
      <h2 className="form-title text-2xl font-bold text-purple-700 mb-4">Vehicle Details</h2>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="form-grid grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Make */}
          <div className="form-group">
            <label htmlFor="make" className="block text-sm font-medium text-gray-700 mb-1">
              Make
            </label>
            <input
              type="text"
              id="make"
              value={formData.make}
              onChange={(e) => updateFormData({ make: e.target.value })}
              required
              className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Model */}
          <div className="form-group">
            <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">
              Model
            </label>
            <input
              type="text"
              id="model"
              value={formData.model}
              onChange={(e) => updateFormData({ model: e.target.value })}
              required
              className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Year */}
          <div className="form-group">
            <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
              Year
            </label>
            <input
              type="number"
              id="year"
              value={formData.year}
              onChange={(e) => updateFormData({ year: e.target.value })}
              min="1900"
              max={new Date().getFullYear() + 1}
              required
              className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* VIN */}
          <div className="form-group">
            <label htmlFor="vin" className="block text-sm font-medium text-gray-700 mb-1">
              VIN
            </label>
            <input
              type="text"
              id="vin"
              value={formData.vin}
              onChange={(e) => updateFormData({ vin: e.target.value })}
              required
              className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Mileage */}
          <div className="form-group">
            <label htmlFor="mileage" className="block text-sm font-medium text-gray-700 mb-1">
              Mileage
            </label>
            <input
              type="number"
              id="mileage"
              value={formData.mileage}
              onChange={(e) => updateFormData({ mileage: e.target.value })}
              required
              className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Condition */}
          <div className="form-group">
            <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">
              Condition
            </label>
            <select
              id="condition"
              value={formData.condition}
              onChange={(e) => updateFormData({ condition: e.target.value })}
              required
              className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="" disabled>Select condition</option>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
            </select>
          </div>
        </div>

        {/* Button Group */}
        <div className="button-group mt-6 flex justify-between">
          <button
            type="button"
            onClick={onPrevious}
            className="button button-secondary bg-purple-200 hover:bg-purple-300 text-purple-900 px-4 py-2 rounded-md shadow-md transition duration-300 ease-in-out"
          >
            Previous
          </button>
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

export default VehicleDetails;
