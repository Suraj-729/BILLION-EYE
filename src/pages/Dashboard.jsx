import React from "react";
import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import api from "../api";
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
  // const reportArray = Array.isArray(reportData) ? reportData : [reportData];

  const [reportData, setReportData] = useState(null);
  const reportArray = Array.isArray(reportData) ? reportData : [reportData];

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

  // const [reportData, setReportData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/user/images/latest");

        if (Array.isArray(response.data)) {
          if (response.data.length > 0) {
            setReportData(response.data[0]); // Use first object if it's an array
          } else {
            console.warn("Response is an empty array.");
          }
        } else if (
          typeof response.data === "object" &&
          response.data !== null
        ) {
          setReportData(response.data); // Set directly if it's an object
        } else {
          console.warn("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching report data:", error);
      }
      
      
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchReportsByTab = async () => {
      try {
        let endpoint = "/images/recent"; // Default for Recent Reports
  
        if (activeTab === "ActiveEvents") {
          endpoint = "/images/ACTIVE";
        } else if (activeTab === "AssignedEvents") {
          endpoint = "/images/ASSIGNED";
        } else if (activeTab === "ResolvedEvents") {
          endpoint = "/images/RESOLVED";
        }
  
        const response = await api.get(endpoint);
        setReportData(response.data);
      } catch (error) {
        console.error("Error fetching report data for tab:", error);
      }
    };
  
    fetchReportsByTab();
  }, [activeTab]); // Runs when activeTab changes
  
  

  // const formattedDate = reportData?.timestamp
  //   ? new Date(
  //       reportData.timestamp.$date || reportData.timestamp
  //     ).toLocaleDateString()
  //   : "N/A";

  // const formattedTime = reportData?.timestamp
  //   ? new Date(
  //       reportData.timestamp.$date || reportData.timestamp
  //     ).toLocaleTimeString()
  //   : "N/A";

  const tabs = [
    { id: "RecentReports", label: "Recent Reports"},
    { id: "ActiveEvents", label: "Active Events"},
    { id: "AssignedEvents", label: "Assigned Events" },
    { id: "ResolvedEvents", label: "Resolved Events" },
  ];

  return (
    <section className="dashboard-main-page-wrapper">
      <header>
        <div className="container">
          <div className="row">
            <div className="col-md-1">
              <div className="">
                <div className="logo">
                  <img src="./images/logo-small.png" alt="Logo" title="Logo" />
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
          style={{ border: 0, marginTop: "-20px" }}
          allowFullScreen=""
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
                          {tab.count !== null && <span>({tab.count})</span>}
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
                      {reportArray && reportArray.length > 0 ? (
                        reportArray.map((report, index) =>
                          report ? (
                            <tr key={report.incidentID || index}>
                              <td>{report.incidentID}</td>
                              <td>{report.ObjDes}</td>
                              <td>
                                {/* {formattedTime},{formattedDate} */}
                                {report.timestamp
    ? new Date(report.timestamp.$date || report.timestamp).toLocaleTimeString()
    : "N/A"}
  ,{" "}
  {report.timestamp
    ? new Date(report.timestamp.$date || report.timestamp).toLocaleDateString()
    : "N/A"}
                              </td>
                              <td>
                                {report.latitude}, {report.longitude}
                              </td>
                              <td>
                                <img
                                  className={`default-class ${
                                    isZoomed ? "zoomed" : ""
                                  }`}
                                  onClick={() => {
                                    handleZoom();
                                    setZoomedImage(report.imageUrl);
                                  }}
                                  src={report.imageUrl}
                                  alt={report.ObjDes}
                                />
                              </td>
                              <td>
                                {report?.status &&
                                  report.status !== "RESOLVED" &&
                                  report.status !== "Rejected By Admin" && (
                                    <>
                                      <button
                                        className="btn btn-success"
                                        style={{ marginRight: "8px" }}
                                        onClick={() =>
                                          approveTicket(report.incidentID)
                                        }
                                      >
                                        Accpet
                                      </button>
                                      <button
                                        className="btn btn-danger"
                                        style={{ marginRight: "12px" }}
                                        onClick={() =>
                                          reject(report.incidentID)
                                        }
                                      >
                                        Reject
                                      </button>
                                      <button
                                        className="btn btn-primary"
                                        onClick={() => hold(report.incidentID)}
                                      >
                                        Hold
                                      </button>
                                    </>
                                  )}
                              </td>
                            </tr>
                          ) : null
                        )
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
