import React from "react";
import Logo from "../assets/pictures/logo.png";

function Navbar() {
  return (
    <nav className="navbar">
      <img className="logo" src={Logo} alt="logo" />
      <ul className="menu">
        <li className="dressing">Dressing</li>
      </ul>
    </nav>
  );
}

export default Navbar;
