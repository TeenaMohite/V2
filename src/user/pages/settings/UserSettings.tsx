import React, { useState, useEffect } from "react";

const UserSettings = () => {
  const [activeTab, setActiveTab] = useState("account");
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    creditCard: "",
    cardHolder: "",
    country: "",
    autoPayout: false,
    notifyPayments: false,
    notifications: {
      reports: true,
      sound: true,
      vibrations: false,
    },
    security: {
      google2FA: true,
      sms2FA: true,
    },
  });

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("userSettings") || "{}");
    if (Object.keys(savedData).length > 0) {
      setUserInfo(savedData);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleToggle = (section: string, key: string) => {
    setUserInfo((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof userInfo],
        [key]: !prev[section as keyof typeof userInfo][key],
      },
    }));
  };

  const handleSave = () => {
    localStorage.setItem("userSettings", JSON.stringify(userInfo));
    alert("Settings saved successfully!");
  };

  return (
    <div className="settings-container bg-gradient-to-r from-purple-200 via-purple-300 to-purple-400 text-white min-h-screen p-6">
      {/* Title */}
      <h1 className="settings-title text-2xl font-bold text-purple-800 mb-6">Settings</h1>

      {/* Tabs */}
      <div className="settings-tabs flex space-x-4 mb-6">
        <button
          className={`tab-button px-4 py-2 rounded-md transition duration-300 ease-in-out ${
            activeTab === "account" ? "bg-purple-600 text-white" : "bg-purple-800 text-gray-300 hover:bg-purple-500"
          }`}
          onClick={() => setActiveTab("account")}
        >
          Account
        </button>
        <button
          className={`tab-button px-4 py-2 rounded-md transition duration-300 ease-in-out ${
            activeTab === "security" ? "bg-purple-600 text-white" : "bg-purple-800 text-gray-300 hover:bg-purple-600"
          }`}
          onClick={() => setActiveTab("security")}
        >
          Security
        </button>
      </div>

      {/* Profile Section */}
      {activeTab === "account" && (
        <div className="tab-content bg-purple-200 p-6 rounded-lg shadow-md">
          <div className="profile-section flex items-center mb-6">
            <img
              className="profile-avatar w-16 h-16 rounded-full object-cover border-2 border-purple-500"
              src="/avatar.png"
              alt="Profile"
            />
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-purple-500">{userInfo.firstName} {userInfo.lastName}</h2>
              <p className="text-black">{userInfo.email || "No Email Provided"}</p>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-purple-400 mb-4">Personal Info</h3>
          <div className="input-group space-y-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={userInfo.firstName}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-purple-100 border border-yellow-700 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={userInfo.lastName}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-purple-100 border border-yellow-700 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={userInfo.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-purple-100 border border-yellow-700 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={userInfo.address}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-purple-100 border border-yellow-700 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>

          <h3 className="text-lg font-semibold text-purple-500 mt-6 mb-4">Payment Details</h3>
          <div className="input-group space-y-4">
            <input
              type="text"
              name="creditCard"
              placeholder="Credit Card Number"
              value={userInfo.creditCard}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-purple-100 border border-yellow-700 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            />
            <input
              type="text"
              name="cardHolder"
              placeholder="Card Holder Name"
              value={userInfo.cardHolder}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-purple-100 border border-yellow-700 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={userInfo.country}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-purple-100 border border-yellow-700 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>

          <h3 className="text-lg font-semibold text-purple-500 mt-6 mb-4">Payment Preferences</h3>
          <div className="toggle-group space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="autoPayout"
                checked={userInfo.autoPayout}
                onChange={handleChange}
                className="w-4 h-4 text-purple-500 rounded focus:ring-yellow-500"
              />
              <span className="ml-2 text-gray-600">Enable Auto Payout</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="notifyPayments"
                checked={userInfo.notifyPayments}
                onChange={handleChange}
                className="w-4 h-4 text-yellow-500 rounded focus:ring-yellow-500"
              />
              <span className="ml-2 text-gray-600">Notify New Payments</span>
            </label>
          </div>

          <h3 className="text-lg font-semibold text-purple-500 mt-6 mb-4">Notification Settings</h3>
          <div className="toggle-group space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={userInfo.notifications.reports}
                onChange={() => handleToggle("notifications", "reports")}
                className="w-4 h-4 text-purple-500 rounded focus:ring-yellow-500"
              />
              <span className="ml-2 text-gray-500">Receive Reports</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={userInfo.notifications.sound}
                onChange={() => handleToggle("notifications", "sound")}
                className="w-4 h-4 text-purple-500 rounded focus:ring-yellow-500"
              />
              <span className="ml-2 text-gray-500">Enable Sound Notifications</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={userInfo.notifications.vibrations}
                onChange={() => handleToggle("notifications", "vibrations")}
                className="w-4 h-4 text-purple-500 rounded focus:ring-yellow-500"
              />
              <span className="ml-2 text-gray-500">Enable Vibrations</span>
            </label>
          </div>

          <div className="actions mt-6 flex justify-between">
            <button
              className="cancel-btn bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-md shadow-md transition duration-300 ease-in-out"
            >
              Cancel
            </button>
            <button
              className="save-btn bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md shadow-md transition duration-300 ease-in-out"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="delete-btn bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md shadow-md transition duration-300 ease-in-out"
            >
              Delete Account
            </button>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === "security" && (
        <div className="tab-content bg-purple-200 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-purple-500 mb-4">Security Settings</h3>
          <div className="toggle-group space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={userInfo.security.google2FA}
                onChange={() => handleToggle("security", "google2FA")}
                className="w-4 h-4 text-purple-500 rounded focus:ring-purple-500"
              />
              <span className="ml-2 text-gray-500">Enable Google 2FA</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={userInfo.security.sms2FA}
                onChange={() => handleToggle("security", "sms2FA")}
                className="w-4 h-4 text-purple-500 rounded focus:ring-purple-500"
              />
              <span className="ml-2 text-gray-500">Enable SMS 2FA</span>
            </label>
          </div>

          <div className="actions mt-6 flex justify-end">
            <button
              className="save-btn bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md shadow-md transition duration-300 ease-in-out"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSettings;