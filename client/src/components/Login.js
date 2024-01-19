import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/api";
import { AuthContext } from "../context/userContext";
import "../styles/login.css";
import logo from "../images/logo.png";
import TodoLogo from "./TodoLogo";

export default function Login() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUserInfo, setToken, token } = useContext(AuthContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(email, password);

      if (res?.data?.success) {
        navigate("/dashboard");
        setUserInfo(res?.data?.token);
        setToken(res?.data?.token);
        localStorage.setItem("token", res?.data?.token);
      } else {
        setMessage(res?.data?.message);
      }
    } catch (error) {
      setMessage(error?.message);
    }
  };

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (!jwt) {
      navigate("/login");
    } else {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="login">
      <div className="left-panel flex">
        <div className="loginform-container">
          <div className="login-heading flex">
            <h1>Login</h1>
            <img className="logo" src={logo} />
          </div>
          <form onSubmit={submitHandler}>
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
              Login
            </button>
          </form>
          <p>
            Dont have an account?{" "}
            <Link className="register-here" to={"/register"}>
              Register here
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
