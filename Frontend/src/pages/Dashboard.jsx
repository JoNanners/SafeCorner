import React, { useState } from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1 className="title">Welcome to SafeCorner</h1>
      <div className="button-container">
        <Link to="/reporting" className="dashboard-button">
          Incident Reporting
        </Link>
        <Link to="/tracking" className="dashboard-button">
          Incident Tracking
        </Link>
        <Link to="/notifications" className="dashboard-button">
          Notifications
        </Link>
        <Link to="/forums" className="dashboard-button">
          Discussion Forums
        </Link>
      </div>
      <Link to="/login" className="back-button">
        Logout
      </Link>
    </div>
  );
};
export default Dashboard;
