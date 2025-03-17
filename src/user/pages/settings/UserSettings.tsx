import { useState, useEffect } from "react";

const UserSettings = () => {
  const [activeTab, setActiveTab] = useState("account");
  const [userInfo, setUserInfo] = useState({
    _id: "", // Add the _id property
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

  // Fetch user settings from API on component mount
  useEffect(() => {
    const fetchUserSettings = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/user/settings/USER_ID`);
        if (!response.ok) throw new Error("Failed to fetch user settings");
        const data = await response.json();
        setUserInfo((prev) => ({
          ...prev,
          ...data,
          notifications: data.notifications || prev.notifications,
          security: data.security || prev.security,
        }));
      } catch (error) {
        console.error("Error fetching user settings:", error);
      }
    };
  
    fetchUserSettings();
  }, []);
  

  const handleToggle = (
    section: "notifications" | "security",
    key: "reports" | "sound" | "vibrations" | "google2FA" | "sms2FA"
  ) => {
    setUserInfo((prev) => {
      const sectionData = prev[section];
      if (section === "notifications" && key in sectionData && typeof sectionData === "object" && "reports" in sectionData) {
        return {
          ...prev,
          [section]: {
            ...sectionData,
            [key]: !sectionData[key as keyof typeof userInfo.notifications],
          },
        };
      } else if (section === "security" && key in sectionData && typeof sectionData === "object" && "google2FA" in sectionData) {
        return {
          ...prev,
          [section]: {
            ...sectionData,
            [key]: !sectionData[key as keyof typeof userInfo.security],
          },
        };
      }
      return prev;
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Save settings to API
  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/user/settings/USER_ID`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });
  
      if (!response.ok) throw new Error("Failed to update settings");
  
      alert("Settings saved successfully!");
    } catch (error) {
      console.error("Error updating settings:", error);
    }
  };

  //delete account
  const handleDeleteAccount = async (userId: string) => {
    if (!userId) {
        console.error("User ID is missing. Cannot delete account.");
        alert("User ID not found. Please log in again.");
        return;
    }

    if (!window.confirm("Are you sure you want to delete your account?")) return;

    try {
        const response = await fetch(`http://localhost:5000/api/user/settings/${userId}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            const errorMessage = await response.json();
            throw new Error(errorMessage.message || "Failed to delete account");
        }

        alert("Account deleted successfully!");
        window.location.href = "/login"; // Redirect after deletion
    } catch (error) {
        console.error("Error deleting account:", error);
        alert("Error deleting account. Please try again.");
    }
};


  return (
    <div className="settings-container bg-gradient-to-r from-purple-200 via-purple-300 to-purple-400 text-white min-h-screen p-6">
      <h1 className="settings-title text-2xl font-bold text-purple-800 mb-6">Settings</h1>

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

      {/* Account Settings */}
      {activeTab === "account" && (
        <div className="tab-content bg-white p-6 rounded-lg shadow-md text-gray-900">
          <h3 className="text-lg font-semibold text-purple-500 mb-4">Personal Info</h3>
          <div className="space-y-3">
            <input type="text" name="firstName" value={userInfo.firstName} onChange={handleChange} placeholder="First Name" className="input-field" />
            <input type="text" name="lastName" value={userInfo.lastName} onChange={handleChange} placeholder="Last Name" className="input-field" />
            <input type="text" name="phone" value={userInfo.phone} onChange={handleChange} placeholder="Phone Number" className="input-field" />
            <input type="text" name="address" value={userInfo.address} onChange={handleChange} placeholder="Address" className="input-field" />
          </div>

          <h3 className="text-lg font-semibold text-purple-500 mt-6 mb-4">Payment Info</h3>
          <div className="space-y-3">
            <input type="text" name="creditCard" value={userInfo.creditCard} onChange={handleChange} placeholder="Credit Card Number" className="input-field" />
            <input type="text" name="cardHolder" value={userInfo.cardHolder} onChange={handleChange} placeholder="Card Name Holder" className="input-field" />
            <input type="text" name="country" value={userInfo.country} onChange={handleChange} placeholder="Country" className="input-field" />
          </div>

          <h3 className="text-lg font-semibold text-purple-500 mt-6 mb-4">Notifications</h3>
          <div className="toggle-group space-y-2">
            {Object.keys(userInfo.notifications).map((key) => (
              <label key={key} className="flex items-center">
                <input type="checkbox" checked={userInfo.notifications[key as keyof typeof userInfo.notifications]} onChange={() => handleToggle("notifications", key as "reports" | "sound" | "vibrations")} className="w-4 h-4 text-purple-500 rounded focus:ring-purple-500" />
                <span className="ml-2">{key.replace(/([A-Z])/g, " $1")}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Security Settings */}
      {activeTab === "security" && (
        <div className="tab-content bg-white p-6 rounded-lg shadow-md text-gray-900">
          <h3 className="text-lg font-semibold text-purple-500 mb-4">Security Settings</h3>
          <div className="toggle-group space-y-2">
            {Object.keys(userInfo.security).map((key) => (
              <label key={key} className="flex items-center">
                <input type="checkbox" checked={userInfo.security[key as keyof typeof userInfo.security]} onChange={() => handleToggle("security", key as "google2FA" | "sms2FA")} className="w-4 h-4 text-purple-500 rounded focus:ring-purple-500" />
                <span className="ml-2">{key.replace(/([A-Z])/g, " $1")}</span>
              </label>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-red-500 mt-6 mb-4">Delete Account</h3>
          <p className="text-sm text-gray-600">Permanently remove your account and all associated data.</p>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md mt-4" onClick={() => handleDeleteAccount(userInfo._id)}>Delete Account</button>

        </div>
      )}

      {/* Save Button */}
      <div className="actions mt-6 flex justify-end">
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md shadow-md transition duration-300 ease-in-out" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default UserSettings;
