import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./logoutButton";

const Navigation: React.FC = () => {
  const { isAuthenticated } = useAuth0();

  if(!isAuthenticated) return null;
  
  return (
    <nav>
      <ul className="menu-btns">
        <Link to="/">
          <li className="menu-btn">Home</li>
        </Link>
        <Link to="/apartamento/listar">
          <li className="menu-btn">Apartamentos</li>
        </Link>
        <LogoutButton />
      </ul>
    </nav>
  );
};

export default Navigation;