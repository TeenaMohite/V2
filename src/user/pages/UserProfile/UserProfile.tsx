import { useContext } from "react";
import { UserContext } from "../../UserComponents/User/UserContext";



const UserProfile: React.FC = () => {
  const userContext = useContext(UserContext);

  // Ensure userContext exists and has a user property
  if (!userContext || !userContext.user) {
    return <div className="loading">Loading user data...</div>;
  }

  const { user } = userContext;

  return (
    <div className="user-profile">
      <div className="profile-container">
        <div className="profile-header">
          <img src={user.profileImage || "https://via.placeholder.com/150"} alt="Profile" />
          <h2>{user.name || "Unknown User"}</h2>
          <p className="user-email">{user.email || "No email provided"}</p>
        </div>

        <div className="profile-details">
          <div className="detail-item"><strong>Phone:</strong> {user.phone || "N/A"}</div>
          <div className="detail-item"><strong>Date of Birth:</strong> {user.dob || "N/A"}</div>
          <div className="detail-item"><strong>Address:</strong> {user.address || "N/A"}</div>
          <div className="detail-item"><strong>Account No:</strong> {user.accountNumber || "N/A"}</div>
        </div>

        <div className="profile-footer">
          <span className="last-login">Last login: {user.lastLogin || "N/A"}</span>
          <button className="edit-profile">Edit Profile</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
