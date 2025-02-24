import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

// Load Stripe with the public key
const stripePromise = loadStripe("your-public-stripe-key");

const PaymentForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [upiId, setUpiId] = useState("");
  const [message, setMessage] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage("");
    if (!stripe || !elements) return;

    if (paymentMethod === "card") {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) return;
      const { token, error } = await stripe.createToken(cardElement);
      if (error) {
        setMessage(`❌ Payment failed: ${error.message}`);
      } else {
        setMessage("⏳ Processing payment...");
        const response = await fetch("https://your-backend.com/payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, amount, token: token.id }),
        });
        const data = await response.json();
        setMessage(data.success ? "✅ Payment successful!" : `❌ Payment failed: ${data.message}`);
      }
    } else if (paymentMethod === "upi") {
      if (!upiId) {
        setMessage("❌ Please enter a valid UPI ID");
        return;
      }
      setMessage("✅ UPI Payment successful!");
    } else {
      setMessage("✅ Net Banking Payment successful!");
    }
  };

  return (
    <div className="payment-container bg-gradient-to-r from-purple-200 via-purple-300 to-purple-400 text-white min-h-screen p-6">
      {/* Title */}
      <h2 className="payment-title text-2xl font-bold text-black mb-6">Choose Payment Method</h2>

      {/* Payment Method Tabs */}
      <div className="payment-tabs flex space-x-4 mb-6">
        <button
          className={`tab-button px-4 py-2 rounded-md transition duration-300 ease-in-out ${
            paymentMethod === "card"
              ? "bg-purple-800 text-white"
              : "bg-purple-700 text-gray-300 hover:bg-yellow-700"
          }`}
          onClick={() => setPaymentMethod("card")}
        >
          Credit / Debit Card
        </button>
        <button
          className={`tab-button px-4 py-2 rounded-md transition duration-300 ease-in-out ${
            paymentMethod === "upi"
              ? "bg-purple-800 text-white"
              : "bg-purple-700 text-gray-300 hover:bg-yellow-700"
          }`}
          onClick={() => setPaymentMethod("upi")}
        >
          UPI
        </button>
        <button
          className={`tab-button px-4 py-2 rounded-md transition duration-300 ease-in-out ${
            paymentMethod === "netbanking"
              ? "bg-purple-800 text-white"
              : "bg-purple-700 text-gray-300 hover:bg-yellow-700"
          }`}
          onClick={() => setPaymentMethod("netbanking")}
        >
          Net Banking
        </button>
      </div>

      {/* Payment Form */}
      <form onSubmit={handleSubmit} className="payment-form bg-purple-700 p-6 rounded-lg shadow-md space-y-4">
        {/* Email */}
        <div className="input-group">
          <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 bg-purple-200 border border-yellow-700 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>

        {/* Amount */}
        <div className="input-group">
          <label className="block text-sm font-medium text-gray-300 mb-1">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="w-full px-3 py-2 bg-purple-200 border border-yellow-700 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>

        {/* Card Payment */}
        {paymentMethod === "card" && (
          <div className="card-input">
            <label className="block text-sm font-medium text-gray-300 mb-1">Card Details</label>
            <CardElement
              className="card-element w-full px-3 py-2 bg-purple-200 border border-yellow-700 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>
        )}

        {/* UPI Payment */}
        {paymentMethod === "upi" && (
          <div className="input-group">
            <label className="block text-sm font-medium text-gray-300 mb-1">UPI ID</label>
            <input
              type="text"
              placeholder="yourupi@bank"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              required
              className="w-full px-3 py-2 bg-purple-200 border border-yellow-700 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>
        )}

        {/* Net Banking */}
        {paymentMethod === "netbanking" && (
          <div className="input-group">
            <label className="block text-sm font-medium text-gray-300 mb-1">Select Bank</label>
            <select
              required
              className="w-full px-3 py-2 bg-purple-200 border border-yellow-700 rounded-md text-black focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            >
              <option value="">Select your Bank</option>
              <option value="sbi">State Bank of India</option>
              <option value="hdfc">HDFC Bank</option>
              <option value="icici">ICICI Bank</option>
              <option value="axis">Axis Bank</option>
            </select>
          </div>
        )}

        {/* Pay Button */}
        <button
          type="submit"
          disabled={!stripe}
          className="pay-button bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md shadow-md transition duration-300 ease-in-out w-full"
        >
          Pay Now
        </button>
      </form>

      {/* Payment Message */}
      {message && (
        <p
          className={`payment-message mt-4 text-center ${
            message.includes("successful")
              ? "text-green-500"
              : message.includes("failed")
              ? "text-red-500"
              : "text-yellow-500"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

const PaymentProcessing: React.FC = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default PaymentProcessing;