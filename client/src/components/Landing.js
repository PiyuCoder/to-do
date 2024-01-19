import React from "react";
import TodoLogo from "./TodoLogo";
import "../styles/landing.css";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="landing-right-panel flex">
      <div className="landing-right-content">
        <div className="landing-title flex">
          {" "}
          <TodoLogo landing />
        </div>

        <h2 style={{ margin: "5px", textAlign: "center", color: "white" }}>
          Create and manage your daily tasks on the go!!
        </h2>
        <button onClick={() => navigate("/dashboard")}>Get Started</button>
      </div>
    </div>
  );
}
