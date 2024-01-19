import React, { useContext, useState } from "react";
import logo from "../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import TodoLogo from "./TodoLogo";
import { registerUser } from "../api/api";

export default function Register() {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(name, email, password);

      if (res?.data?.success) {
        navigate("/login");
      } else {
        setMessage(res?.data?.message);
      }
    } catch (error) {
      setMessage(error?.message);
    }
  };
  return (
    <div className="login">
      <div className="left-panel flex">
        <div className="loginform-container">
          <div className="login-heading flex">
            <h1>Register</h1>
            <img className="logo" src={logo} />
          </div>
          <form onSubmit={submitHandler}>
            <input
              className="email-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
            />
            <input
              className="email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              type="password"
              className="password-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <div className="error-message-container">
              <p className="error-message">*{message}</p>
            </div>
            <button className="login-button" type="submit">
              Register
            </button>
          </form>
          <p>
            Dont have an account?{" "}
            <Link className="register-here" to={"/login"}>
              Login here
            </Link>
          </p>
        </div>
      </div>
      <div className="right-panel flex">
        <div className="right-content">
          <div className="title flex">
            {" "}
            <TodoLogo />
          </div>

          <h2 style={{ margin: "5px", textAlign: "center", color: "white" }}>
            Create and manage your daily tasks on the go!!
          </h2>
        </div>
      </div>
    </div>
  );
}
