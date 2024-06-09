// Home.js
import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="home">
      <div className="container">
        <h1 className="title">Welcome to Our Website!</h1>
        <div className="buttons">
          <Link to="/login">
            <button className="btn login-btn">Login</button>
          </Link>
          <Link to="/register">
            <button className="btn register-btn">Register</button>
          </Link>
        </div>
      </div>
      <footer className="footer">
        <p>
          &copy; 2024 Designed and Developed by CodeManiacs. All Rights
          Reserved.
        </p>
      </footer>
    </div>
  );
};
