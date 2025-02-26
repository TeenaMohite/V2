


const AccountSettings = () => {
  return (
    <div className="account-settings">
      <h2>Settings</h2>
      <div className="profile-section">
        <img src="https://via.placeholder.com/100" alt="Profile" className="profile-img" />
        <h3>Azunyan U. Wu</h3>
        <p>elementary221b@gmail.com</p>
      </div>
 
      <div className="info-section">
        <h4>Personal Info</h4>
        <p>You can change your personal information settings here.</p>
        <div className="input-group">
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
          <input type="text" placeholder="Phone Number" />
          <input type="text" placeholder="Address" />
        </div>
      </div>

      <div className="payments-section">
        <h4>Payments</h4>
        <label>
          <input type="checkbox" checked readOnly /> Enable Auto Payout
        </label>
        <label>
          <input type="checkbox" checked readOnly /> Notify New Payments
        </label>
        <input type="text" placeholder="Credit Card Number" />
        <input type="text" placeholder="Card Name Holder" />
        <input type="text" placeholder="Country" />
      </div>

      <div className="buttons">
        <button className="cancel-btn">Cancel</button>
        <button className="save-btn">Save</button>
      </div>
    </div>
  );
};

export default AccountSettings;
