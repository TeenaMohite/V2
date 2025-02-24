import React from "react";
import { QuoteFormData } from "../UserRequestQuote";

interface Props {
  formData: QuoteFormData;
  updateFormData: (data: Partial<QuoteFormData>) => void;
  onSubmit: () => void;
  onPrevious: () => void;
}

const InsuranceDetails: React.FC<Props> = ({
  formData,
  updateFormData,
  onSubmit,
  onPrevious,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const handleRequiredPolicyChange = (policy: keyof QuoteFormData["requiredPolicy"]) => {
    updateFormData({
      requiredPolicy: {
        ...formData.requiredPolicy,
        [policy]: !formData.requiredPolicy[policy],
      },
    });
  };

  const handleCoverageChange = (coverage: keyof QuoteFormData["coverage"]) => {
    updateFormData({
      coverage: {
        ...formData.coverage,
        [coverage]: !formData.coverage[coverage],
      },
    });
  };

  return (
    <div className="form-container bg-white p-6 rounded-lg shadow-md text-gray-900">
      {/* Title */}
      <h2 className="form-title text-2xl font-bold text-purple-700 mb-4">Insurance Details</h2>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {/* Required Policy Section */}
        <div className="checkbox-group mb-6">
          <h3 className="text-lg font-semibold text-purple-700 mb-2">Required Policy</h3>
          <div className="space-y-2">
            <div className="checkbox-item flex items-center">
              <input
                type="checkbox"
                id="comprehensive"
                checked={formData.requiredPolicy.comprehensive}
                onChange={() => handleRequiredPolicyChange("comprehensive")}
                className="w-4 h-4 text-purple-500 rounded focus:ring-purple-500"
              />
              <label htmlFor="comprehensive" className="ml-2 text-gray-700">
                Comprehensive Coverage
              </label>
            </div>
            <div className="checkbox-item flex items-center">
              <input
                type="checkbox"
                id="collision"
                checked={formData.requiredPolicy.collision}
                onChange={() => handleRequiredPolicyChange("collision")}
                className="w-4 h-4 text-purple-500 rounded focus:ring-purple-500"
              />
              <label htmlFor="collision" className="ml-2 text-gray-700">
                Collision Coverage
              </label>
            </div>
            <div className="checkbox-item flex items-center">
              <input
                type="checkbox"
                id="liability"
                checked={formData.requiredPolicy.liability}
                onChange={() => handleRequiredPolicyChange("liability")}
                className="w-4 h-4 text-purple-500 rounded focus:ring-purple-500"
              />
              <label htmlFor="liability" className="ml-2 text-gray-700">
                Liability Coverage
              </label>
            </div>
          </div>
        </div>

        {/* Additional Coverage Section */}
        <div className="checkbox-group mb-6">
          <h3 className="text-lg font-semibold text-purple-700 mb-2">Additional Coverage</h3>
          <div className="space-y-2">
            <div className="checkbox-item flex items-center">
              <input
                type="checkbox"
                id="medical"
                checked={formData.coverage.medical}
                onChange={() => handleCoverageChange("medical")}
                className="w-4 h-4 text-purple-500 rounded focus:ring-purple-500"
              />
              <label htmlFor="medical" className="ml-2 text-gray-700">
                Medical Payments
              </label>
            </div>
            <div className="checkbox-item flex items-center">
              <input
                type="checkbox"
                id="rental"
                checked={formData.coverage.rental}
                onChange={() => handleCoverageChange("rental")}
                className="w-4 h-4 text-purple-500 rounded focus:ring-purple-500"
              />
              <label htmlFor="rental" className="ml-2 text-gray-700">
                Rental Reimbursement
              </label>
            </div>
            <div className="checkbox-item flex items-center">
              <input
                type="checkbox"
                id="roadside"
                checked={formData.coverage.roadside}
                onChange={() => handleCoverageChange("roadside")}
                className="w-4 h-4 text-purple-500 rounded focus:ring-purple-500"
              />
              <label htmlFor="roadside" className="ml-2 text-gray-700">
                Roadside Assistance
              </label>
            </div>
          </div>
        </div>

        {/* Upload Documents */}
        <div className="form-group mb-4">
          <label htmlFor="documents" className="block text-sm font-medium text-gray-700 mb-1">
            Upload Documents
          </label>
          <input
            type="file"
            id="documents"
            multiple
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              updateFormData({ documents: files });
            }}
            className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        {/* Additional Notes */}
        <div className="form-group mb-4">
          <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700 mb-1">
            Additional Notes
          </label>
          <textarea
            id="additionalNotes"
            value={formData.additionalNotes}
            onChange={(e) => updateFormData({ additionalNotes: e.target.value })}
            rows={4}
            className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        {/* Amount */}
        <div className="form-group mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={formData.amount}
            onChange={(e) => updateFormData({ amount: e.target.value })}
            required
            className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        {/* Button Group */}
        <div className="button-group flex justify-between">
          <button
            type="button"
            onClick={onPrevious}
            className="bg-gray-300 hover:bg-gray-400 text-gray-900 px-4 py-2 rounded-md shadow-md"
          >
            Previous
          </button>
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md shadow-md"
          >
            Submit Quote Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default InsuranceDetails;
