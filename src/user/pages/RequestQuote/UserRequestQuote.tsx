import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomerDetails from "./steps/CustomerDetails";
import VehicleDetails from "./steps/VehicleDetails";
import InsuranceDetails from "./steps/InsuranceDetails";
import SuccessMessage from "./steps/SuccessMessage";
import { toast } from "react-toastify";

export type QuoteFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  make: string;
  model: string;
  year: string;
  vin: string;
  mileage: string;
  condition: string;
  requiredPolicy: {
    comprehensive: boolean;
    collision: boolean;
    liability: boolean;
  };
  coverage: {
    medical: boolean;
    rental: boolean;
    roadside: boolean;
  };
  documents: File[];
  additionalNotes: string;
  amount: string;
};

const initialFormData: QuoteFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  make: "",
  model: "",
  year: "",
  vin: "",
  mileage: "",
  condition: "",
  requiredPolicy: {
    comprehensive: false,
    collision: false,
    liability: false,
  },
  coverage: {
    medical: false,
    rental: false,
    roadside: false,
  },
  documents: [],
  additionalNotes: "",
  amount: "",
};

const UserRequestQuote: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<QuoteFormData>(initialFormData);
  const navigate = useNavigate();

  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handlePrevious = () => setCurrentStep((prev) => prev - 1);

  const updateFormData = (data: Partial<QuoteFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/quotes/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to submit quote");
      }

      toast.success("Quote submitted successfully!", {
        position: "top-right",
        autoClose: 2000,
      });

      setCurrentStep(4);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Submission Error:", error);
        toast.error(error.message || "An error occurred", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <CustomerDetails formData={formData} updateFormData={updateFormData} onNext={handleNext} />;
      case 2:
        return (
          <VehicleDetails formData={formData} updateFormData={updateFormData} onNext={handleNext} onPrevious={handlePrevious} />
        );
      case 3:
        return (
          <InsuranceDetails
            formData={formData}
            updateFormData={updateFormData}
            onSubmit={handleSubmit}
            onPrevious={handlePrevious}
          />
        );
      case 4:
        return <SuccessMessage onClose={() => navigate("/userquotes")} />;
      default:
        return null;
    }
  };

  return (
    <div className="request-quote-container bg-gradient-to-r from-purple-200 via-purple-300 to-purple-400 text-white min-h-screen p-6">
      {currentStep < 4 && (
        <div className="progress-bar mb-6">
          <div className="progress-steps flex justify-between items-center">
            {["Customer Details", "Vehicle Details", "Insurance Details"].map((label, index) => (
              <div key={index} className={`step flex flex-col items-center space-y-2 ${currentStep >= index + 1 ? "active" : ""}`}>
                <div className={`step-number w-8 h-8 flex items-center justify-center rounded-full border-2 ${currentStep >= index + 1 ? "bg-purple-600 border-purple-600" : "bg-gray-300 border-gray-400"}`}>
                  {index + 1}
                </div>
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="step-content bg-gray-100 p-6 rounded-lg shadow-md">{renderStep()}</div>
    </div>
  );
};

export default UserRequestQuote;
