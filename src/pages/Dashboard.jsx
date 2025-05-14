import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MapCanvas from "../components/mapCanvas";
import api from "../api";
import "../public/assets/css/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [mapCoordinates, setMapCoordinates] = useState(null);
  const { agencyId } = useParams();
  const [assignedAgency, setAssignedAgency] = useState("Loading...");
  const [dashboardData, setDashboardData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [zoomedImageUrl, setZoomedImageUrl] = useState(null);
  const [activeTab, setActiveTab] = useState("RecentReports"); // Default to Recent Reports
  const [isPopupOpen, setIsPopupOpen] = useState(false); // For popup visibility
  const [currentPage, setCurrentPage] = useState(1); // For pagination
  const eventsPerPage = 10; // Number of events per page
  const imgRef = useRef(null);

  useEffect(() => {
    if (!agencyId) {
      console.error("Agency ID is missing");
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const response = await api.get(`backend/agency-dashboard/${agencyId}`);
        console.log("API Response:", response.data);
        setDashboardData(response.data?.assignedEvents || []);
        setAssignedAgency(response.data?.AgencyName || "Unknown Agency");
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setAssignedAgency("Error loading agency");
      }
    };

    fetchDashboardData();
  }, [agencyId]);

  const updateEventStatus = async (event_id, newStatus) => {
    try {
      const response = await api.put(`backend/events/status/${event_id}`, {
        status: newStatus,
      });
      if (response.status === 200) {
        console.log(`Event ${event_id} status updated to ${newStatus}`);
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

  const approveEvent = (event_id) => {
    updateEventStatus(event_id, "Accepted");
    navigate(`/eventReport/${event_id}`, { state: { event_id } });
  };
  const rejectEvent = (event_id) => updateEventStatus(event_id, "Rejected");
  // const holdEvent = (event_id) => updateEventStatus(event_id, "On Hold");
  const handleAssign = (event_id) => updateEventStatus(event_id, "Assigned");
  const handleComplete = (event_id) => updateEventStatus(event_id, "closed");

  const tabs = [
    { id: "RecentReports", label: "Recent Reports" },
    { id: "AssignedEvents", label: "Assigned Events" },
    { id: "ResolvedEvents", label: "Resolved Events" },
  ];

  const filteredDashboardData = () => {
    switch (activeTab) {
      case "RecentReports":
        return dashboardData.filter((event) => event.status === "open");
      case "AssignedEvents":
        return dashboardData.filter((event) => event.status === "Assigned");
      case "ResolvedEvents":
        return dashboardData.filter(
          (event) => event.status === "closed" || event.status === "Rejected"
        );
      default:
        return dashboardData;
    }
  };

  const renderEventActions = (event) => {
    switch (event.status) {
      case "open": //open
        return (
          <>
            <button
              className="btn btn-success"
              onClick={() => approveEvent(event.event_id)}
            >
              Accept
            </button>
            <button
              className="btn btn-danger"
              onClick={() => rejectEvent(event.event_id)}
              style={{marginLeft:"10px"}}
            >
              Reject
            </button>
          </>
        );
      case "Accepted":
        return (
          <button
            className="btn btn-primary"
            onClick={() => handleAssign(event.event_id)}
          >
            Assign
          </button>
        );
      case "Assigned":
        return (
          <>
            <button
              className="btn btn-success"
              onClick={() => handleComplete(event.event_id)}
            >
              Complete
            </button>
            <button
              className="btn btn-danger"
              onClick={() => rejectEvent(event.event_id)}
            >
              Reject
            </button>
            <h4>{event.ground_staff}</h4>
          </>
        );
      case "closed":
        return <p>Task Completed</p>;
      case "Rejected":
        return <p>Rejected</p>;
      default:
        return null;
    }
  };

  // Add this function inside the Dashboard component
  const handleNavigation = (event) => {
    navigate(event, { state: { agencyId } });
  };

  useEffect(() => {
    if (!zoomedImageUrl) return; // Only run when zoomedImageUrl is set

    const img = imgRef.current;
    const canvas = document.getElementById("zoomed-canvas");
    const ctx = canvas?.getContext("2d");

    if (img && canvas && ctx) {
      // Wait for the image to load completely
      img.onload = () => {
        const { naturalWidth, naturalHeight, width, height } = img;
        const scaleX = width / naturalWidth;
        const scaleY = height / naturalHeight;

        const report = dashboardData.find(
          (event) => event.image_url === zoomedImageUrl
        );

        if (
          report &&
          Array.isArray(report.boundingBoxes) &&
          report.boundingBoxes.length > 0 &&
          report.boundingBoxes[0].length === 4
        ) {
          const [x1, y1, x2, y2] = report.boundingBoxes[0];

          const adjustedBox = {
            left: x1 * scaleX,
            top: y1 * scaleY,
            width: (x2 - x1) * scaleX,
            height: (y2 - y1) * scaleY,
          };

          canvas.width = width;
          canvas.height = height;

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.strokeStyle = "red";
          ctx.lineWidth = 2;
          ctx.strokeRect(
            adjustedBox.left,
            adjustedBox.top,
            adjustedBox.width,
            adjustedBox.height
          );

          console.log("Image Dimensions:", {
            naturalWidth,
            naturalHeight,
            width,
            height,
          });
          console.log("Bounding Box:", { x1, y1, x2, y2 });
          console.log("Adjusted Box:", adjustedBox);
        } else {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          console.warn("No valid bounding box for the zoomed image.");
        }
      };
    }
  }, [zoomedImageUrl, dashboardData]);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You are not logged in.");
        navigate("/login");
        return;
      }

      console.log("Sending Logout Request...");
      const response = await api.post(
        "backend/agency/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Logout Response:", response.data);
        localStorage.removeItem("token"); // Clear token from localStorage
        alert("Logout Successful!");
        navigate("/agencyLogin"); // Redirect to login page
      } else {
        alert("Logout Failed: " + (response.data?.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error Logging Out:", error);
      alert(error.response?.data?.message || "Logout failed!");
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(dashboardData.length / eventsPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const startIndex = (currentPage - 1) * eventsPerPage;
  const endIndex = Math.min(startIndex + eventsPerPage, dashboardData.length);
  const currentEvents = dashboardData.slice(startIndex, endIndex);

  return (
    <>
      <header>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="d-flex align-items-center justify-content-between">
                <div
                  className="logo"
                 
                >
                  <img
                    src="/billioneye/images/logo-small.png"
                    alt="Logo"
                     onClick={() => navigate(`/dashboard/${agencyId}`)}
                  style={{ cursor: "pointer" }}
                    title=""
                  />
                </div>
                <div
                  style={{
                    cursor: "pointer",
                    fontSize: "24px",
                    padding: "10px",
                    zIndex: "1100",
                  }}
                  onClick={() => setIsOpen(true)}
                >
                  <img src="/billioneye/images/menu-bar.svg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            position: "fixed",
            top: "0",
            left: isOpen ? "0" : "-250px",
            width: "250px",
            height: "100vh",
            background: "linear-gradient(135deg, #6a11cb, #2575fc)",
            boxShadow: "2px 0px 10px rgba(0, 0, 0, 0.3)",
            transition: "left 0.3s ease-in-out",
            padding: "20px",
            zIndex: "1000",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <span
              style={{
                fontSize: "24px",
                cursor: "pointer",
                display: "block",
                marginBottom: "20px",
                color: "#fff",
              }}
              onClick={() => setIsOpen(false)}
            >
              ✕
            </span>
            <ul
              style={{
                listStyle: "none",
                padding: "0",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <Link to={`/dashboard/${agencyId}`}>
               <li
                style={{
                  padding: "12px 76px",
                  background: "#fff",
                  color: "#2575fc",
                  borderRadius: "5px",
                  textAlign: "center",
                  cursor: "pointer",
                  border: "none",
                  transition: "background 0.3s ease, color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#2575fc";
                  e.target.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "#fff";
                  e.target.style.color = "#2575fc";
                }}
                
              >
                Home
              </li>
              </Link>
              

              <Link
                to={`/assignGroundstaff/?agencyId=${agencyId}`}
                style={{ textDecoration: "none" }}
              >
                <li
                  style={{
                    padding: "12px 20px",
                    background: "#fff",
                    color: "#2575fc",
                    borderRadius: "5px",
                    textAlign: "center",
                    cursor: "pointer",
                    border: "none",
                    transition: "background 0.3s ease, color 0.3s ease",
                  }}
                  
                  onMouseEnter={(e) => {
                    e.target.style.background = "#2575fc";
                    e.target.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "#fff";
                    e.target.style.color = "#2575fc";
                  }}
                >
                  Onboard GroundStaff
                </li>
              </Link>
            </ul>
          </div>
          <button
            style={{
              padding: "10px 15px",
              background: "#fff",
              color: "#2575fc",
              borderRadius: "5px",
              textAlign: "center",
              cursor: "pointer",
              border: "none",
              transition: "background 0.3s ease, color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#2575fc";
              e.target.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "#fff";
              e.target.style.color = "#2575fc";
            }}
            onClick={handleLogout} // Call the logout function
          >
            Logout
          </button>
        </div>
      </header>
      <section className="page-heading">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h3>{assignedAgency}</h3>
            </div>
          </div>
        </div>
      </section>
      <section className="dashboard-map">
        <div>
          {mapCoordinates ? (
            <MapCanvas
              coordinates={mapCoordinates}
              style={{ height: "300px" }}
            />
          ) : (
            <p style={{ padding: "130px", textAlign: "center" }}>
              Click 📍 on an event to view its location.
            </p>
          )}
        </div>
      </section>
      <section className="dashboard-table-con" style={{ marginTop: "-150px" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="table-card" style={{ marginTop: "130px" }}>
                <div className="table-card-heading">
                  <div className="table-card-heading-icon">
                    <img
                      src="/billioneye/images/dashboard-icon.png"
                      alt="Dashboard Icon"
                      title="Dashboard Icon"
                    />
                  </div>
                  <h4>Recent Reports</h4>
                  <button
                    onClick={() => setIsPopupOpen(true)}
                    className="table-card-btn"
                  >
                    View All <i className="fa-solid fa-play"></i>
                  </button>
                </div>
                <div className="table-con table-responsive">
                  <ul className="nav nav-tabs" style={{ marginLeft: "-650px" }}>
                    {tabs.map((tab) => (
                      <li key={tab.id} className="nav-item">
                        <button
                          className={`nav-link ${
                            activeTab === tab.id ? "active" : ""
                          }`}
                          onClick={() => setActiveTab(tab.id)}
                        >
                          {tab.label}
                        </button>
                      </li>
                    ))}
                  </ul>

                  <div className="tab-content">
                    <div
                      style={{ maxHeight: "400px", overflowY: "auto" }}
                    >
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
                        {filteredDashboardData().length > 0 ? (
                          filteredDashboardData().map((report, index) => (
                            <tr key={report.event_id || index}>
                              <td>{index + 1}</td>
                              <td>{report.description}</td>
                              <td>
                                {report.assignment_time
                                  ? new Date(
                                      report.assignment_time
                                    ).toLocaleString()
                                  : "N/A"}
                              </td>
                              <td>
                                {/* {report.latitude}, {report.longitude} */}
                                <button
                                  style={{
                                    color: "#007bff",
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    marginLeft: "8px",
                                  }}
                                  title="View Location"
                                  onClick={() =>
                                    setMapCoordinates({
                                      lat: parseFloat(report.latitude),
                                      lng: parseFloat(report.longitude),
                                    })
                                  }
                                >
                                  📍View In Map
                                </button>
                              </td>
                              <td>
                                {report.image_url ? (
                                  <div
                                    style={{
                                      position: "relative",
                                      display: "inline-block",
                                    }}
                                  >
                                    <img
                                      src={report.image_url}
                                      alt={`Event ${report.event_id}`}
                                      title="Click to zoom"
                                      className="default-class"
                                      onClick={() =>
                                        setZoomedImageUrl(report.image_url)
                                      }
                                      style={{
                                        cursor: "zoom-in",
                                        maxWidth: "100px",
                                        borderRadius: "6px",
                                        maxHeight: "62px",
                                        display: "block",
                                        zIndex: 0,
                                      }}
                                      onLoad={(e) => {
                                        const img = e.target;
                                        const canvas = document.getElementById(
                                          `canvas-${report.event_id}`
                                        );
                                        const ctx = canvas?.getContext("2d");

                                        if (!ctx) {
                                          console.warn(
                                            "Canvas context not found."
                                          );
                                          return;
                                        }

                                        let x1, y1, x2, y2;

                                        if (
                                          typeof report.x1 === "number" &&
                                          typeof report.y1 === "number" &&
                                          typeof report.x2 === "number" &&
                                          typeof report.y2 === "number"
                                        ) {
                                          ({ x1, y1, x2, y2 } = report);
                                        } else if (
                                          Array.isArray(report.boundingBoxes) &&
                                          Array.isArray(
                                            report.boundingBoxes[0]
                                          ) &&
                                          report.boundingBoxes[0].length === 4
                                        ) {
                                          [x1, y1, x2, y2] =
                                            report.boundingBoxes[0];
                                        } else {
                                          console.warn(
                                            " No valid bounding box for report:",
                                            report
                                          );
                                          return;
                                        }

                                        canvas.width = img.clientWidth;
                                        canvas.height = img.clientHeight;

                                        requestAnimationFrame(() => {
                                          const scaleX =
                                            img.clientWidth / img.naturalWidth;
                                          const scaleY =
                                            img.clientHeight /
                                            img.naturalHeight;

                                          const boxX = x1 * scaleX;
                                          const boxY = y1 * scaleY;
                                          const boxWidth = (x2 - x1) * scaleX;
                                          const boxHeight = (y2 - y1) * scaleY;

                                          ctx.clearRect(
                                            0,
                                            0,
                                            canvas.width,
                                            canvas.height
                                          );
                                          ctx.strokeStyle = "red";
                                          ctx.lineWidth = 2;
                                          ctx.strokeRect(
                                            boxX,
                                            boxY,
                                            boxWidth,
                                            boxHeight
                                          );
                                        });
                                      }}
                                    />
                                    <canvas
                                      id={`canvas-${report.event_id}`}
                                      style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        zIndex: 1,
                                        pointerEvents: "none",
                                        display: zoomedImageUrl
                                          ? "none"
                                          : "block",
                                      }}
                                    />
                                  </div>
                                ) : (
                                  "No Image"
                                )}
                              </td>
                              <td>{renderEventActions(report)}</td>
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
          </div>
        </div>
      </section>
      {/* === Zoomed Image Overlay Section === */}
      {zoomedImageUrl && (
        <div className="zoom-overlay" onClick={() => setZoomedImageUrl(null)}>
          <div
            className="zoomed-image-container"
            onClick={(e) => e.stopPropagation()} // Prevents closing overlay when clicking inside container
            style={{ position: "relative" }} // Needed for positioning buttons/canvas
          >
            {/* Close Button */}
            <button
              className="close-button"
              style={{ marginTop: "15px", marginRight: "17px" }}
              onClick={() => setZoomedImageUrl(null)}
            >
              ✕ {/* Use a proper 'close' icon/character */}
            </button>
            {/* Image and Canvas Container */}
            <div style={{ position: "relative", display: "inline-block" }}>
              {(() => {
                // Find the event data associated with the zoomed image URL
                const event = dashboardData.find((event) =>
                  event.allIncidents.some(
                    (incident) => incident.image_url === zoomedImageUrl
                  )
                );

                // If event data isn't found, don't render image/canvas
                if (!event) {
                  console.error(
                    "Could not find event data for zoomed image:",
                    zoomedImageUrl
                  );
                  return <p>Error loading image data.</p>; // Or some other fallback
                }

                // Find the index of the currently displayed incident within its event
                const currentIndex = event.allIncidents.findIndex(
                  (incident) => incident.image_url === zoomedImageUrl
                );

                if (currentIndex === -1) {
                  console.error(
                    "Could not find incident index for zoomed image:",
                    zoomedImageUrl
                  );
                  return <p>Error loading incident data.</p>; // Or some other fallback
                }

                // Calculate indices for previous/next images in the carousel
                const prevIndex =
                  (currentIndex - 1 + event.allIncidents.length) %
                  event.allIncidents.length;
                const nextIndex =
                  (currentIndex + 1) % event.allIncidents.length;

                // Return the Image, Canvas, and Navigation Buttons
                return (
                  <>
                    <img
                      ref={imgRef} // You might need this ref for other purposes
                      src={zoomedImageUrl}
                      alt="Zoomed Event"
                      className="zoomed-image" // Style this class for appropriate sizing/display
                      style={{
                        display: "block",
                        maxWidth: "80vw",
                        maxHeight: "80vh",
                      }} // Adjust styling as needed
                      // --- onLoad Handler to Draw Bounding Box ---
                      onLoad={(e) => {
                        const img = e.target;
                        const canvas = document.getElementById("zoomed-canvas");
                        const ctx = canvas?.getContext("2d");

                        if (!ctx) {
                          console.warn("Zoomed canvas context not found.");
                          return;
                        }

                        // Get the bounding box for the current incident
                        // Use optional chaining for safety
                        const boundingBox =
                          event.allIncidents[currentIndex]?.boundingBoxes?.[0];

                        // Set canvas dimensions to match the displayed image size before drawing
                        canvas.width = img.clientWidth;
                        canvas.height = img.clientHeight;

                        // Check if bounding box data is valid
                        if (!boundingBox || boundingBox.length !== 4) {
                          console.warn(
                            "Invalid or missing bounding box for zoomed image:",
                            zoomedImageUrl
                          );
                          // Clear canvas if previous box was drawn, otherwise leave blank
                          ctx.clearRect(0, 0, canvas.width, canvas.height);
                          // Optional: Draw only the image if you want it on the canvas even without a box
                          // ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                          return; // Don't try to draw an invalid box
                        }

                        // Extract coordinates
                        const [x1, y1, x2, y2] = boundingBox;

                        // Ensure coordinates are numbers (add more robust checks if needed)
                        if ([x1, y1, x2, y2].some(isNaN)) {
                          console.warn(
                            "Invalid coordinate values in bounding box:",
                            boundingBox
                          );
                          ctx.clearRect(0, 0, canvas.width, canvas.height);
                          return;
                        }

                        // Calculate scaling factors based on displayed vs natural size
                        const scaleX = img.clientWidth / img.naturalWidth;
                        const scaleY = img.clientHeight / img.naturalHeight;

                        // --- CORRECTED CALCULATION ---
                        // Scale bounding box coordinates directly without adding offsets.
                        // These coordinates are relative to the top-left of the canvas/image.
                        const boxX = x1 * scaleX;
                        const boxY = y1 * scaleY;
                        const boxWidth = (x2 - x1) * scaleX;
                        const boxHeight = (y2 - y1) * scaleY;
                        // --- END CORRECTION ---

                        // Use requestAnimationFrame for smoother rendering
                        requestAnimationFrame(() => {
                          // Clear previous drawings (image and box) from the canvas
                          ctx.clearRect(0, 0, canvas.width, canvas.height);

                          // OPTION 1: Draw image ON the canvas, then the box
                          // This puts both on the same canvas, useful if you want to save/export canvas content.
                          // The box coordinates (boxX, boxY) work directly as they are relative to canvas 0,0.
                          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                          // OPTION 2: Don't draw the image on the canvas.
                          // The canvas acts purely as an overlay for the box, like the thumbnail.
                          // If you use this, comment out the ctx.drawImage line above.

                          // Draw the bounding box
                          ctx.strokeStyle = "red";
                          ctx.lineWidth = 2; // Adjust line thickness if needed
                          ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);
                        });
                      }} // End onLoad
                    />

                    {/* Canvas for Bounding Box Overlay */}
                    <canvas
                      id="zoomed-canvas"
                      style={{
                        position: "absolute", // Position over the image
                        top: 0,
                        left: 0,
                        pointerEvents: "none", // Make it ignore mouse events
                        // Width/Height are set dynamically in onLoad
                      }}
                    />

                    {/* Navigation Buttons (Previous) */}
                    <button
                      className="carousel-prev" // Style this button
                      onClick={() => {
                        console.log(
                          "Prev Button Clicked. New URL:",
                          event.allIncidents[prevIndex].image_url
                        );
                        setZoomedImageUrl(
                          event.allIncidents[prevIndex].image_url
                        );
                      }}
                      // Disable if only one image? (Optional)
                      // disabled={event.allIncidents.length <= 1}
                    >
                      ◀ {/* Left Arrow */}
                    </button>

                    {/* Navigation Buttons (Next) */}
                    <button
                      className="carousel-next" // Style this button
                      onClick={() => {
                        console.log(
                          "Next Button Clicked. New URL:",
                          nextIndex,
                          "    ",
                          event.allIncidents[nextIndex].image_url
                        );
                        setZoomedImageUrl(
                          event.allIncidents[nextIndex].image_url
                        );
                      }}
                      // Disable if only one image? (Optional)
                      // disabled={event.allIncidents.length <= 1}
                    >
                      ▶ {/* Right Arrow */}
                    </button>
                  </>
                );
              })()}{" "}
              {/* End Immediately Invoked Function Expression */}
            </div>{" "}
            {/* End Image and Canvas Container */}
          </div>{" "}
          {/* End Zoomed Image Container */}
        </div> /* End Zoom Overlay */
      )}{" "}
      {/* End Zoomed Image Section */}
      <footer className="footer" style={{ marginTop: "320px" }}>
        <div className="footer-container">
          <div className="row">
            <div
              className="col-md-12 text-center"
              style={{ marginTop: "185px" }}
            >
              <p>
                © 2025 All Rights Reserved.{" "}
                <span className="nic-credit">Developed by NIC</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
      {/* === Events Popup Section === */}
      {isPopupOpen && (
        <div
          className="popup-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            className="popup-content"
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              width: "80%",
              maxHeight: "80%",
              overflow: "hidden",
            }}
          >
            <h3>All Events</h3>
            <table
              className="table table-striped"
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginBottom: "20px",
              }}
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {currentEvents.map((event, index) => (
                  <tr key={event.event_id || index}>
                    <td>{index + 1 + startIndex}</td>
                    <td>{event.description}</td>
                    <td>
                      {event.assignment_time
                        ? new Date(event.assignment_time).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td>
                      {event.assignment_time
                        ? new Date(event.assignment_time).toLocaleTimeString()
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Buttons */}
            <div
              className="pagination"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                style={{
                  padding: "10px 20px",
                  backgroundColor: currentPage === 1 ? "#ccc" : "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                }}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of{" "}
                {Math.ceil(dashboardData.length / eventsPerPage)}
              </span>
              <button
                onClick={handleNextPage}
                disabled={
                  currentPage ===
                  Math.ceil(dashboardData.length / eventsPerPage)
                }
                style={{
                  padding: "10px 20px",
                  backgroundColor:
                    currentPage ===
                    Math.ceil(dashboardData.length / eventsPerPage)
                      ? "#ccc"
                      : "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor:
                    currentPage ===
                    Math.ceil(dashboardData.length / eventsPerPage)
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                Next
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsPopupOpen(false)}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                backgroundColor: "#dc3545",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {/* End Events Popup Section */}
    </>
  );
};

export default Dashboard;
