import "leaflet/dist/leaflet.css";
import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import { useNavigate } from "react-router-dom";
import "./Reporting.css";

export const Reporting = () => {
  const [location, setLocation] = useState({ lat: "", lng: "" });
  const [description, setDescription] = useState("");
  const mapRef = useRef(null);

  useEffect(() => {
    const map = L.map(mapRef.current).setView([17.551, 78.1662], 18);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    map.on("click", (event) => {
      const { lat, lng } = event.latlng;
      setLocation({ lat, lng });
    });

    // Clean up function to remove the map on component unmount
    return () => {
      map.remove();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const incidentData = { ...location, description };
    console.log("incident data", incidentData);
    // Send location data to the backend
    try {
      const response = await fetch("http://localhost:5000/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(incidentData),
      });
      console.log("incidentData", JSON.stringify(incidentData));
      console.log("response from server", response);
      if (response.ok) {
        alert("Incident reported successfully");
        const data = await response.json();
        setLocation({ lat: "", lng: "" });
        setDescription("");
        console.log("data from server", data);
      } else {
        alert(data.extraDetails ? data.extraDetails : data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const navigate = useNavigate();
  return (
    <div className="feature-page">
      <div className="map" ref={mapRef}></div>
      <div className="container">
        <h1 className="title">Incident Reporting</h1>
        <p>Here you can report incidents with a live map.</p>
        <form onSubmit={handleSubmit}>
          <div className="location-inputs">
            <label>
              Latitude:
              <input
                type="text"
                value={location.lat}
                onChange={(e) =>
                  setLocation({ ...location, lat: e.target.value })
                }
              />
            </label>
            <label>
              Longitude:
              <input
                type="text"
                value={location.lng}
                onChange={(e) =>
                  setLocation({ ...location, lng: e.target.value })
                }
              />
            </label>
          </div>
          <label>
            Message:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <br />
          <button type="submit">Submit Incident</button>
          <br />
          <button type="button" onClick={() => navigate("/dashboard")}>
            To Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};
