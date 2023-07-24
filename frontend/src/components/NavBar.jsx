import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/pictures/logo.png";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">
        <img className="logo" src={Logo} alt="logo" />
      </Link>
      <ul className="menu">
        <Link to="/ajout-article">
          <li className="ajout-article">Ajouter un article</li>
        </Link>
        <Link to="/">
          <li className="dressing">Dressing</li>
        </Link>
      </ul>
    </nav>
  );
}

export default Navbar;
