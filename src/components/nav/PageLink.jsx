import React from "react";
import "./PageLink.css";
import { Link } from "react-router-dom";

export default function PageLink({ to, children }) {
  return (
    <Link to={to} className="nav-link">
      {children}
    </Link>
  );
}
