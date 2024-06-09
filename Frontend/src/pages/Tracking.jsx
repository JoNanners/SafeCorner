import React from "react";
import { Link } from "react-router-dom";
import "./Tracking.css";

export const Tracking = () => {
  return (
    <div className="tracking">
      <h1 className="title">Incident Tracking</h1>
      <div className="incident-container">
        <div className="incident">
          <h2>Active Report</h2>
          <p>
            <h3>Bad Driving</h3>
            The incident "Bad Driving" has been reported and is currently being
            investigated.
          </p>
          <div className="flow-chart">
            <p>The incident is under investigation.</p>
          </div>
        </div>
        <div className="previous-reports">
          <h2>Previous Reports</h2>
          <div className="previous-report">
            <div className="report-box">
              <p className="date">Date: 2024-06-09</p>
              <p>Incident: Theft</p>
              <p>Status: Resolved</p>
            </div>
          </div>
          <div className="previous-report">
            <div className="report-box">
              <p className="date">Date: 2024-06-08</p>
              <p>Incident: Vandalism</p>
              <p>Status: Under investigation</p>
            </div>
          </div>
          <div className="previous-report">
            <div className="report-box">
              <p className="date">Date: 2024-06-07</p>
              <p>Incident: Assault</p>
              <p>Status: Resolved</p>
            </div>
          </div>
          <div className="previous-report">
            <div className="report-box">
              <p className="date">Date: 2024-06-06</p>
              <p>Incident: Fraud</p>
              <p>Status: Resolved</p>
            </div>
          </div>
          <div className="previous-report">
            <div className="report-box">
              <p className="date">Date: 2024-06-05</p>
              <p>Incident: Cyberbullying</p>
              <p>Status: Resolved</p>
            </div>
          </div>
        </div>
      </div>
      <Link to="/dashboard" className="back-button">
        Back to Dashboard
      </Link>
    </div>
  );
};
