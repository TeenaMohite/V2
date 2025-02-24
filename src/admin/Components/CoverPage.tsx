import { Link } from "react-router-dom";
import { useState } from "react";

const CoverPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-purple-500 shadow-md fixed w-full z-10 flex items-center justify-between p-4 md:px-10">
        <div className="flex items-center space-x-3">
          <img src="/homelogo.jpeg" alt="Company Logo" className="h-10 w-10" />
          <p className="text-lg font-semibold text-purple-900">V2 Enterprises</p>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <Link to="/services" className="text-gray-700 hover:text-purple-700">Services</Link>
          <Link to="/about" className="text-gray-700 hover:text-purple-700">About Us</Link>
          <Link to="/login" className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">Login</Link>
          <Link to="/signup" className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">Sign Up</Link>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <button className="menu-btn text-black" onClick={() => setIsOpen(!isOpen)}>☰</button>
          {isOpen && (
            <div className="absolute top-16 right-4 bg-black shadow-lg rounded-lg flex flex-col p-4 space-y-3">
              <Link to="/services" className="text-gray-700" onClick={() => setIsOpen(false)}>Services</Link>
              <Link to="/about" className="text-gray-700" onClick={() => setIsOpen(false)}>About Us</Link>
              <Link to="/login" className="px-4 py-2 bg-purple-600 text-white rounded-lg" onClick={() => setIsOpen(false)}>Login</Link>
              <Link to="/signup" className="px-4 py-2 bg-purple-600 text-white rounded-lg" onClick={() => setIsOpen(false)}>Sign Up</Link>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 pt-24 md:pt-32 space-y-6 md:space-y-0">
        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold text-gray-800">Drive with Confidence, Protected Every Mile</h1>
          <p className="mt-4 text-gray-600">
            Your vehicle is more than just a means of transportation – it's a part of your life. Whether you're commuting, exploring, or embarking on an adventure, we ensure you’re covered for whatever the road throws your way.
          </p>
          <p className="mt-2 text-gray-600">
            At V2 Enterprises, we offer comprehensive car insurance plans that give you peace of mind, knowing that your vehicle is in safe hands. No matter the road ahead, we’re here to keep you covered with affordable, reliable, and customizable insurance options.
          </p>
        </div>
        <div className="md:w-1/2 flex justify-end">
          <img src="/homepage.jpg" alt="Car Insurance Illustration" className="max-w-sm md:max-w-md lg:max-w-lg rounded-lg shadow-lg" />
        </div>
      </main>
    </div>
  );
};

export default CoverPage;
