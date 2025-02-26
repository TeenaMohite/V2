import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


interface SuccessMessageProps {
  onClose: () => void;
}
const SuccessMessage: React.FC<SuccessMessageProps> = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/user/user-quotes');
  };

  return (
    <div className="form-container success-message bg-white text-green-800 p-6 rounded-lg shadow-md text-center">
      <CheckCircle size={64} color="#6A2E8E" />
      <h2 className="text-2xl font-bold mt-4">Your Quote Request has been Submitted!</h2>
      <p className="mt-2 text-gray-600">
        We'll review your request and get back to you within 24-48 hours with a detailed quote.
      </p>
      <button
        onClick={handleRedirect}
        className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md shadow-md transition duration-300 ease-in-out"
      >
        Return to Quotes List
      </button>
    </div>
  );
};

export default SuccessMessage;
