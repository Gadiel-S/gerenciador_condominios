import React from "react";
import { Link } from "react-router-dom";

const Navigation: React.FC = () => {
  return (
    <nav>
      <ul className="menu-btns">
        <Link to="/">
          <li className="menu-btn">Home</li>
        </Link>
        <Link to="/apartamento/listar">
          <li className="menu-btn">Apartamentos</li>
        </Link>
        <Link to="/condominio/balanco">
          <li className="menu-btn">Condomínio</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navigation;