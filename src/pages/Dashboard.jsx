import React from "react";
import { useState } from "react";

import "../public/assets/css/Dashboard.css";
//import api from "../api";
const Dashboard = () => {
  const handleNavigation = (route) => {
    console.log(`Navigating to ${route}`);
    // Add your navigation logic here, such as using React Router
    // Example: navigate(route) if using react-router-dom
  };

  // const [isOpen, setIsOpen] = useState(false);
  // const dropdownRef = useRef(null);

  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomedImage, setZoomedImage] = useState(null);

  const handleZoom = () => {
    setIsZoomed((prev) => !prev);
    console.log("Zoom state:", !isZoomed);
  };

  const closePopup = () => {
    setZoomedImage(null);
  };

  // const toggleDropdown = () => {
  //   setIsOpen(!isOpen);
  // };

  const approveTicket = (ticketNo) => {
    console.log("Approved ticket:", ticketNo);
  };

  const reject = (ticketNo) => {
    console.log("Rejected ticket:", ticketNo);
  };

  const hold = (ticketNo) => {
    console.log("Held ticket:", ticketNo);
  };

  const [activeTab, setActiveTab] = useState("RecentReports");

  const tabs = [
    { id: "RecentReports", label: "Recent Reports", count: null },
    { id: "ActiveEvents", label: "Active Events", count: 7 },
    { id: "AssignedEvents", label: "Assigned Events", count: 5 },
    { id: "ResolvedEvents", label: "Resolved Events", count: 27 },
  ];

  const eventData = {
    RecentReports: [
      {
        id: 1,
        type: "Car Accident",
        time: "12:24:04",
        location: "Khandagiri",
        image: "./images/hack.jpg",
        status: "Hold By Admin",
      },
      {
        id: 2,
        type: "Fire",
        time: "13:30:10",
        location: "Jaydev Vihar",
        image: "./images/hack.jpg",
        status: "RESOLVED",
      },
    ],
    ActiveEvents: [
      {
        id: 3,
        type: "Flood",
        time: "14:45:00",
        location: "Sahid Nagar",
        image: "./images/hack.jpg",
        status: "APPROVED",
      },
      {
        id: 4,
        type: "Car Breakdown",
        time: "15:00:20",
        location: "Patia",
        image: "./images/hack.jpg",
        status: "Rejected By Admin",
      },
    ],
    AssignedEvents: [
      {
        id: 5,
        type: "Gas Leak",
        time: "16:10:35",
        location: "Bapuji Nagar",
        image: "./images/hack.jpg",
        status: "appliedByRO",
      },
    ],
    ResolvedEvents: [
      {
        id: 6,
        type: "Building Collapse",
        time: "10:15:50",
        location: "Unit-9",
        image: "./images/hack.jpg",
        status: "RESOLVED",
      },
    ],
  };

  return (
    
      <section className="dashboard-main-page-wrapper">
        <header>
          <div className="container">
            <div className="row">
              <div className="col-md-1">
                <div className="">
                  <div className="logo">
                    <img
                      src="./images/logo-small.png"
                      alt="Logo"
                      title="Logo"
                    />
                  </div>
                  {/*DropDown Nav menu */}
                  
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="page-heading">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h3>Govt. Of Odisha</h3>
              </div>
            </div>
          </div>
        </section>

        <section className="dashboard-map">
          <iframe
            title="Hospital Locations"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d239487.1652253839!2d85.65564125231477!3d20.300807016970502!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1909d2d5170aa5%3A0xfc580e2b68b33fa8!2sBhubaneswar%2C%20Odisha!5e0!3m2!1sen!2sin!4v1737381279368!5m2!1sen!2sin"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>

        <section className="dashboard-table-con">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="table-card">
                  <div className="table-card-heading">
                    <div className="table-card-heading-icon">
                      <img
                        src="/images/dashboard-icon.png"
                        alt="Dashboard Icon"
                        title="Dashboard Icon"
                      />
                    </div>
                    <h4>Recent Reports</h4>
                    <button
                      onClick={() => handleNavigation("/reports")}
                      className="table-card-btn"
                    >
                      View All <i className="fa-solid fa-play"></i>
                    </button>
                  </div>
                  
                  <div className="table-con table-responsive">
                  <ul className="nav nav-tabs">
                          {tabs.map((tab) => (
                            <li key={tab.id} className="nav-item">
                              <button
                                className={`nav-link ${
                                  activeTab === tab.id ? "active" : ""
                                }`}
                                onClick={() => setActiveTab(tab.id)}
                              >
                                {tab.label}{" "}
                                {tab.count !== null && (
                                  <span>({tab.count})</span>
                                )}
                              </button>
                            </li>
                          ))}
                        </ul>
                    <table className="event-table">
                      
                        <tr>
                          <th>Sl.No</th>
                          <th>Type</th>
                          <th>Time</th>
                          <th>Location</th>
                          <th>Images</th>
                          <th>Status View</th>
                        </tr>
                      

                      <tbody>
                        {eventData[activeTab]?.length > 0 ? (
                          eventData[activeTab].map((event) => (
                            <tr key={event.id}>
                              <td>{event.id}</td>
                              <td>{event.type}</td>
                              <td>{event.time}</td>
                              <td>{event.location}</td>
                              <td>
                                <img
                                  className={`default-class ${
                                    isZoomed ? "zoomed" : ""
                                  }`}
                                  onClick={handleZoom}
                                  src={event.image}
                                  alt={event.type}
                                  title={event.type}
                                />
                              </td>
                              <td>
                                {event.status !== "RESOLVED" &&
                                  event.status !== "Rejected By Admin" && (
                                    <>
                                      <button
                                        className="btn btn-success"
                                        onClick={() => approveTicket(event.id)}
                                      >
                                        Approve
                                      </button>
                                      <button
                                        className="btn btn-danger"
                                        onClick={() => reject(event.id)}
                                      >
                                        Reject
                                      </button>
                                      <button
                                        className="btn btn-primary"
                                        onClick={() => hold(event.id)}
                                      >
                                        Hold
                                      </button>
                                    </>
                                  )}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6">No events found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pop-up for Zoomed Image */}

        {isZoomed && (
          <>
            <div className="overlay" onClick={closePopup}></div>

            <div className="popup">
              <button className="close-btn" onClick={closePopup}>
                X
              </button>
              <img className="popup-image" src={zoomedImage} alt="Zoomed" />
            </div>
          </>
        )}
      </section>
    
  );
};

export default Dashboard;
