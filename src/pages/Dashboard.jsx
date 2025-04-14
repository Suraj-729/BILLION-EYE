import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import api from "../api";
import "../public/assets/css/Dashboard.css";
//import api from "../api";
const Dashboard = () => {
  const navigate = useNavigate();
  const handleNavigation = (route) => {
    console.log(`Navigating to ${route}`);
    // Add your navigation logic here, such as using React Router
    // Example: navigate(route) if using react-router-dom
  };

  const { agencyId } = useParams();
  const [assignedAgency, setAssignedAgency] = useState("Loading...");
  const [dashboardData, setDashboardData] = useState([]);
  // const [reportData, setReportData] = useState(null);

  //error
  //const reportArray = Array.isArray(reportData) ? reportData : [reportData];
  const [isOpen, setIsOpen] = useState(false);

  const [zoomedImageUrl, setZoomedImageUrl] = useState(null);

  // const [zoomedImage, setZoomedImage] = useState(null);

  
  const [activeTab, setActiveTab] = useState("RecentReports");

  // useEffect(() => {
  //   const fetchAssignedAgency = async () => {
  //     try {
  //       const response = await api.get("/event-with-agency/event-123");

  //       // Ensure correct data extraction
  //       setAssignedAgency(response.data.assigned_agency_name);
  //     } catch (error) {
  //       console.error("Error fetching assigned agency:", error);
  //     }
  //   };

  //   fetchAssignedAgency();
  // }, []);

  // useEffect(() => {
  //   if (!agencyId) {
  //     console.error("Agency ID is missing");
  //     return; // Stop execution if agencyId is undefined/null
  //   }

  //   const fetchDashboardByAgencyID = async () => {
  //     try {
  //       const response = await api.get(`/agency-dashboard/${agencyId}`); // ✅ Fixed template literal
  //       setDashboardData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching report data for tab:", error);
  //     }
  //   };

  //   fetchDashboardByAgencyID();
  // }, [agencyId]);

  useEffect(() => {
    if (!agencyId) {
      console.error("Agency ID is missing");
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const response = await api.get(`/agency-dashboard/${agencyId}`);
        console.log("API Response:", response.data);

        if (response.data?.assignedEvents) {
          setDashboardData(response.data.assignedEvents); // Set full assignedEvents array
        } else {
          setDashboardData([]);
        }

        setAssignedAgency(response.data?.AgencyName || "Unknown Agency");
      } catch (error) {
        console.error("Error fetching report data:", error);
        setAssignedAgency("Error loading agency");
      }
    };

    fetchDashboardData();
  }, [agencyId]);

  const updateEventStatus = async (event_id, newStatus) => {
    try {
      const response = await api.put(`/events/status/${event_id}`, {
        status: newStatus,
      });

      if (response.status === 200) {
        console.log(`Event ${event_id} status updated to ${newStatus}`);

        // Update UI for the specific event
        setDashboardData((prevData) =>
          prevData.map((event) =>
            event.event_id === event_id
              ? { ...event, status: newStatus }
              : event
          )
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Event-Specific Status Update Functions
  const approveEvent = (event_id) => {
    updateEventStatus(event_id, "Accepted");
    navigate(`/eventreport/${event_id}`, { state: { event_id } });
  };
  const rejectEvent = (event_id) => updateEventStatus(event_id, "Rejected");
  const holdEvent = (event_id) => updateEventStatus(event_id, "On Hold");

  const tabs = [
    { id: "RecentReports", label: "Recent Reports" },
    { id: "ActiveEvents", label: "Active Events" },
    { id: "AssignedEvents", label: "Assigned Events" },
    { id: "ResolvedEvents", label: "Resolved Events" },
  ];

  return (
    <section className="dashboard-main-page-wrapper">
      <header>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="d-flex align-items-center justify-content-between">
                {/* Logo */}
                <div className="logo">
                  <img src="../images/logo-small.png" alt="Logo" title="Logo" />
                </div>

                {/* Hamburger Menu Button */}
                <div
                  style={{
                    cursor: "pointer",
                    fontSize: "24px",
                    padding: "10px",
                    zIndex: "1100", // Ensures it's clickable
                  }}
                  onClick={() => setIsOpen(true)}
                >
                  <img src="../images/menu-bar.svg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Backdrop to close the menu when clicking outside */}
        {isOpen && (
          <div
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              width: "100%",
              height: "100vh",
              background: "rgba(0, 0, 0, 0.3)",
              zIndex: "999", // Below the menu, above other content
            }}
            onClick={() => setIsOpen(false)}
          ></div>
        )}

        {/* DropDown Nav Menu */}
        <div
          style={{
            position: "fixed",
            top: "0",
            left: isOpen ? "0" : "-250px",
            width: "250px",
            height: "100vh",
            background: "#fff",
            boxShadow: "2px 0px 10px rgba(0, 0, 0, 0.1)",
            transition: "left 0.3s ease-in-out",
            padding: "20px",
            zIndex: "1000", // Ensures it appears above everything
          }}
        >
          <span
            style={{
              fontSize: "20px",
              cursor: "pointer",
              display: "block",
              marginBottom: "20px",
              marginRight: "-190px",
            }}
            onClick={() => setIsOpen(false)}
          >
            ✕
          </span>

          <ul>
            <Link to={"/dashboard"}>
              <li>HOME</li>
            </Link>
            <Link to={"/assignGroundstaff"}>
              <li>Onboarding ground staff</li>
            </Link>
          </ul>
        </div>
      </header>

      <section className="page-heading">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {/* <h3>
                Assigned Agency:{" "}
                {assignedAgency ? assignedAgency : "Loading..."}
              </h3> */}
              <h3>Assigned Agency: {assignedAgency}</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="dashboard-map">
        <iframe
          title="Hospital Locations"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62417.61198332427!2d85.738052!3d20.3008649!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1909d2d5170aa5%3A0xfc580e2b68b33fa8!2sBhubaneswar%2C%20Odisha!5e0!3m2!1sen!2sin!4v1710859200000!5m2!1sen!2sin"
          width="600"
          height="450"
          style={{ border: 0, marginTop: "-20px" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>

      <section className="dashboard-table-con">
        <div className="container">
          <div className="row">
            <div className="col-md-12" style={{ marginTop: "-110px" }}>
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
                  <ul className="nav nav-tabs" style={{ marginLeft: "-290px" }}>
                    {tabs.map((tab) => (
                      <li key={tab.id} className="nav-item">
                        <button
                          className={`nav-link ${
                            activeTab === tab.id ? "active" : ""
                          }`}
                          onClick={() => setActiveTab(tab.id)}
                        >
                          {tab.label}{" "}
                          {tab.count !== null && <span>{tab.count}</span>}
                        </button>
                      </li>
                    ))}
                  </ul>

                  <table className="event-table">
                    <tr>
                      <th>Sl.No</th>
                      <th>Type</th>
                      <th>Date and Time</th>
                      <th>Location</th>
                      <th>Images</th>
                      <th>Status View</th>
                    </tr>

                    <tbody>
                      {dashboardData && dashboardData.length > 0 ? (
                        dashboardData.map((report, index) => (
                          <tr key={report.event_id || index}>
                            <td>{index + 1}</td>
                            <td>{report.description}</td>
                            <td>
                              {report.assignment_time
                                ? new Date(
                                    report.assignment_time
                                  ).toLocaleTimeString()
                                : "N/A"}
                              ,{" "}
                              {report.assignment_time
                                ? new Date(
                                    report.assignment_time
                                  ).toLocaleDateString()
                                : "N/A"}
                            </td>
                            <td>
                              {report.latitude}, {report.longitude}
                            </td>
                            <td>
                              {report.image_url ? (
                                <img
                                  className="default-class"
                                  onClick={() =>
                                    setZoomedImageUrl(report.image_url)
                                  }
                                  src={report.image_url}
                                  alt="Event"
                                  style={{
                                    cursor: "zoom-in",
                                    maxWidth: "100px",
                                    borderRadius: "6px",
                                  }}
                                />
                              ) : (
                                "No Image"
                              )}
                            </td>
                            <td>
                              {report.status !== "RESOLVED" &&
                              report.status !== "Rejected By Admin" ? (
                                <>
                                  <button
                                    className="btn btn-success"
                                    style={{ marginRight: "8px" }}
                                    onClick={() =>
                                      approveEvent(report.event_id)
                                    }
                                  >
                                    Accept
                                  </button>
                                  <button
                                    className="btn btn-danger"
                                    style={{ marginRight: "12px" }}
                                    onClick={() => rejectEvent(report.event_id)}
                                  >
                                    Reject
                                  </button>
                                  <button
                                    className="btn btn-primary"
                                    onClick={() => holdEvent(report.event_id)}
                                  >
                                    Hold
                                  </button>
                                </>
                              ) : (
                                <p>No actions available</p>
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

      {/* Example usage of dashboardData */}
      {/* <div>
        {dashboardData && dashboardData.length > 0 ? (
          dashboardData.map((event, index) => (
            <div key={index}>
              <p>{event.name}</p>
              <p>{event.date}</p>
            </div>
          ))
        ) : (
          <p>No events available</p>
        )}
      </div> */}

      {/* Pop-up for Z oomed Image */}

      {zoomedImageUrl && (
        <div className="zoom-overlay" onClick={() => setZoomedImageUrl(null)}>
          <div
            className="zoomed-image-container"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-button"
              onClick={() => setZoomedImageUrl(null)}
            >
              ✕
            </button>
            <img
              src={zoomedImageUrl}
              alt="Zoomed Event"
              className="zoomed-image"
            />
          </div>
        </div>
      )}

      <div></div>
    </section>
  );
};

export default Dashboard;
