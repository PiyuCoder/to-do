import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";
import { AuthContext } from "../context/userContext";

const Header = () => {
  const { userInfo, user, setIsLoading, setUser, token } =
    useContext(AuthContext);

  const logoutHandler = () => {
    if (token) {
      setIsLoading(true);
      setUser("");
      localStorage.removeItem("token");
    }
  };

  return (
    <nav className="header">
      <ul className="flex">
        <li>{user && token && <h1>{`Hello, ${user.split(" ")[0]}!`}</h1>}</li>
        <li>
          {!token ? (
            <button>
              <Link to={"/login"}>Login</Link>
            </button>
          ) : (
            <button onClick={logoutHandler}>
              <Link to={"/login"}>Logout</Link>
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Header;
