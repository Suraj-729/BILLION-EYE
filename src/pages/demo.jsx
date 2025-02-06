import React, { useState } from "react";
import "../public/assets/css/Demo.css";

const Demo = () => {
  const [activeTab, setActiveTab] = useState("RecentReports");

  const tabs = [
    { id: "RecentReports", label: "Recent Reports", count: null },
    { id: "ActiveEvents", label: "Active Events", count: 7 },
    { id: "AssignedEvents", label: "Assigned Events", count: 5 },
    { id: "ResolvedEvents", label: "Resolved Events", count: 27 },
  ];

  const eventData = {
    RecentReports: [
      { id: 1, type: "Car Accident", time: "12:24:04", location: "Khandagiri", image: "./images/accident-1.png" },
      { id: 2, type: "Fire", time: "13:30:10", location: "Jaydev Vihar", image: "./images/fire-1.png" },
    ],
    ActiveEvents: [
      { id: 3, type: "Flood", time: "14:45:00", location: "Sahid Nagar", image: "./images/flood-1.png" },
      { id: 4, type: "Car Breakdown", time: "15:00:20", location: "Patia", image: "./images/breakdown-1.png" },
    ],
    AssignedEvents: [
      { id: 5, type: "Gas Leak", time: "16:10:35", location: "Bapuji Nagar", image: "./images/gas-leak-1.png" },
    ],
    ResolvedEvents: [
      { id: 6, type: "Building Collapse", time: "10:15:50", location: "Unit-9", image: "./images/collapse-1.png" },
    ],
  };

  return (
    <div className="event-tabs">
      <ul className="nav nav-tabs">
        {tabs.map((tab) => (
          <li key={tab.id} className="nav-item">
            <button
              className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label} {tab.count !== null && <span>({tab.count})</span>}
            </button>
          </li>
        ))}
      </ul>

      <div className="table-container">
        <table className="event-table">
          <thead>
            <tr>
              <th>Sl.No</th>
              <th>Type</th>
              <th>Timestamp</th>
              <th>Location</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {eventData[activeTab]?.map((event) => (
              <tr key={event.id}>
                <td>{event.id}</td>
                <td>{event.type}</td>
                <td>{event.time}</td>
                <td>{event.location}</td>
                <td>
                  <img src={event.image} alt={event.type} title={event.type} />
                </td>
              </tr>
            )) || (
              <tr>
                <td colSpan="5">No events found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Demo;
