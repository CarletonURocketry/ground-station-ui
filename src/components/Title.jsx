import React from "react";
import "./Title.css";

export default function Title() {
  return (
    <div id="title">
      <img src={require("../assets/white_logo.png")} alt="CuInSpaceLogo" />
      <h1>CuInSpace Ground Control</h1>
    </div>
  );
}
