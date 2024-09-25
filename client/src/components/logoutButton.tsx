import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton: React.FC = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: 'http://localhost:3000/login'
      }
    });
  };

  return <button className="logout-btn" onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;