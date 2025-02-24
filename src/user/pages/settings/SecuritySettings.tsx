import React, { useState } from "react";


const SecuritySettings = () => {
  const [notifications, setNotifications] = useState({
    reports: true,
    sound: false,
    vibrations: true,
  });

  const [securityOptions, setSecurityOptions] = useState({
    googleAuth: true,
    smsAuth: false,
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleNotificationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNotifications((prev) => ({
      ...prev,
      [event.target.name]: event.target.checked,
    }));
  };

  const handleSecurityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSecurityOptions((prev) => ({
      ...prev,
      [event.target.name]: event.target.checked,
    }));
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(true);
  };

  const confirmDeleteAccount = () => {
    alert("Account deleted successfully!");
    setShowDeleteModal(false);
  };

  return (
    <div className="settings-container">
      <h1 className="settings-title">Security Settings</h1>

      {/* Notifications Section */}
      <div className="tab-content">
        <h3>🔔 Notifications</h3>
        <p>Manage how you receive alerts and updates.</p>
        <div className="toggle-group">
          <label>
            <input type="checkbox" name="reports" checked={notifications.reports} onChange={handleNotificationChange} />
            Reports
          </label>
          <label>
            <input type="checkbox" name="sound" checked={notifications.sound} onChange={handleNotificationChange} />
            Sound
          </label>
          <label>
            <input type="checkbox" name="vibrations" checked={notifications.vibrations} onChange={handleNotificationChange} />
            Vibrations
          </label>
        </div>
      </div>

      {/* Security Options */}
      <div className="tab-content">
        <h3>🔐 Security Options</h3>
        <p>Enhance your account protection.</p>
        <div className="toggle-group">
          <label>
            <input type="checkbox" name="googleAuth" checked={securityOptions.googleAuth} onChange={handleSecurityChange} />
            Two-Factor Authentication with Google
          </label>
          <label>
            <input type="checkbox" name="smsAuth" checked={securityOptions.smsAuth} onChange={handleSecurityChange} />
            Two-Factor Authentication with SMS
          </label>
        </div>
      </div>

      {/* Delete Account Section */}
      <div className="tab-content delete-section">
        <h3>⚠️ Delete Your Account</h3>
        <p>Permanently remove your account and all associated data.</p>
        <div className="actions">
          <button className="delete-btn" onClick={handleDeleteAccount}>Delete Account</button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Are you sure?</h3>
            <p>This action is irreversible. All your data will be lost.</p>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>Cancel</button>
              <button className="confirm-btn" onClick={confirmDeleteAccount}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecuritySettings;
