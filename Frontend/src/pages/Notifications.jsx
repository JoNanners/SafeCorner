import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Notifications.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Notifications = function () {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/track")
      .then((response) => setData(response.data))
      .catch((error) => console.error(error));
  }, []);
  const navigate = useNavigate();

  return (
    <div className="tracking-container">
      <div className="tracking-title">Incident Tracking</div>
      <div className="w-100 d-flex justify-content-center align-items-center">
        <div className="tracking-table">
          <table className="table">
            <div className="joshua">
              <thead>
                <tr>
                  <th>Latitude</th>
                  <th>Longitude</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {data.map((user, index) => (
                  <tr key={index}>
                    <td>{user.lat}</td>
                    <td>{user.lng}</td>
                    <td>{user.description}</td>
                  </tr>
                ))}
              </tbody>
            </div>
          </table>
        </div>
      </div>
      <Link to="/dashboard" className="back-button">
        Back to Dashboard
      </Link>
      <div className="footer">
        <p>© 2024 Designed and Developed by CodeManiacs</p>
      </div>
    </div>
  );
};
