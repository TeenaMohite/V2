import { useState, useEffect } from "react";

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
      setUserInfo((prev) => ({
        ...prev,
        ...savedData,
        notifications: savedData.notifications || prev.notifications,
        security: savedData.security || prev.security,
      }));
    }
  }, []);

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value, type, checked } = e.target;
  //   setUserInfo((prev) => ({
  //     ...prev,
  //     [name]: type === "checkbox" ? checked : value,
  //   }));
  // };

  const handleToggle = (section: "notifications" | "security", key: string) => {
    setUserInfo((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as "notifications" | "security"],
        [key]: section === "notifications" 
          ? !prev.notifications[key as keyof typeof prev.notifications] 
          : !prev.security[key as keyof typeof prev.security],
      },
    }));
  };

  const handleSave = () => {
    localStorage.setItem("userSettings", JSON.stringify(userInfo));
    alert("Settings saved successfully!");
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

      {activeTab === "account" && (
        <div className="tab-content bg-purple-200 p-6 rounded-lg shadow-md">
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
        </div>
      )}

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
