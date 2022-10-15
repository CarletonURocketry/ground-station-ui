import React from "react";
import "./Navbar.css";

export default function Navbar({ children }) {
  return (
    <nav>
      <div id="logo">
        <img
          src={require("../../assets/colour_logo.png")}
          alt="CuInSpace Logo"
        />
      </div>
      <div id="nav-links">{children}</div>
    </nav>
  );
}
