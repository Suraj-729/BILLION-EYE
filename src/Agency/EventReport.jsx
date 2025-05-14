import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom"; // Ensure all imports are at the top
import "../public/assets/css/EventReport.css";
import api from "../api";

import MapCanvas from "../components/mapCanvas";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

const EventReport = () => {
  const [anchorEl, setAnchorEl] = React.useState();
  const open = Boolean(anchorEl);
  const navigate = useNavigate(); // Initialize useNavigate
  const [users, setUsers] = useState([]);
  const { event_id } = useParams();
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState(null);
  const [selectedUser, setSelectedUser] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [isAssigned, setIsAssigned] = useState(false); // State to track assignment status
  const [mapCoordinates, setMapCoordinates] = useState(null);
  const [agencyGroundStaff, setAgencyGroundStaff] = useState([]);
  const { agencyId } = useParams(); // Retrieve agencyId from query params

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // useEffect(() => {
  //   // Fetch ground staff from the backend
  //   const fetchGroundStaff = async () => {
  //     try {
  //       const response = await api.get("backend/agency/groundstaff");
  //       setUsers(response.data); // Update users state with fetched data
  //     } catch (error) {
  //       console.error("Error fetching ground staff:", error);
  //     }
  //   };

  //   fetchGroundStaff();
  // }, []);

  useEffect(() => {
    if (!event_id) {
      console.error("Event ID is missing");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await api.get(`backend/event-report/${event_id}`);
        console.log("API Response:", response.data);
        setReportData(response.data);
        setIsAssigned(response.data.status === "Assigned"); // Set initial assignment status
      } catch (error) {
        console.error("Error fetching report data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [event_id]);

  // Fetch ground staff by agency ID
  useEffect(() => {
    if (!reportData || !reportData.AgencyId) {
      return; // Exit early if reportData or AgencyId is not available
    }

    const fetchAgencyGroundStaff = async () => {
      try {
        const response = await api.get(
          `backend/${reportData.AgencyId}/groundstaff`
        );
        if (response.data.success) {
          setAgencyGroundStaff(response.data.data);
        } else {
          console.error("Failed to fetch ground staff");
        }
      } catch (error) {
        console.error("Error fetching ground staff by agency:", error);
      }
    };

    fetchAgencyGroundStaff();
  }, [reportData]);

   //=================back button=====================================
//    useEffect(() => {
//   const storedStack = JSON.parse(localStorage.getItem("navigationStack")) || [];
//   if (agencyId && !storedStack.includes(agencyId)) {
//     const updatedStack = [...storedStack, agencyId];
//     localStorage.setItem("navigationStack", JSON.stringify(updatedStack));
//   }
// }, [agencyId]);

// const handleBack = () => {
//   const storedStack = JSON.parse(localStorage.getItem("navigationStack")) || [];
//   if (storedStack.length > 1) {
//     storedStack.pop(); // Remove current agencyId
//     const previousAgencyId = storedStack[storedStack.length - 1]; // Get previous
//     localStorage.setItem("navigationStack", JSON.stringify(storedStack)); // Save updated stack
//     navigate(`/dashboard/${previousAgencyId}`); // Navigate
//   } else {
//     // Optional: handle case when no previous page exists
//     navigate(`/dashboard?AgencyId=${agencyId}`);
//   }
// };



  const handleUserChange = (event) => {
    const userId = event.target.value;
    setSelectedUser(userId);

    const user = users.find((u) => u.id === userId);
    setUserDetails(user || null);
  };

  const handleAddGroundStaff = () => {
    if (reportData?.AgencyId) {
      navigate(`/assignGroundstaff?agencyId=${reportData.AgencyId}`);
    } else {
      console.error("Agency ID is not available");
    }
  };

  const updateEventStatus = async (newStatus) => {
    try {
      const response = await api.put(`backend/events/status/${event_id}`, {
        status: newStatus,
      });
      if (response.status === 200) {
        console.log(`Event ${event_id} status updated to ${newStatus}`);
        setIsAssigned(newStatus === "Assigned"); // Update assignment status
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleAssign = async () => {
    if (!selectedUser) {
      console.error("No ground staff selected");
      return;
    }

    try {
      const selectedStaff = agencyGroundStaff.find(
        (staff) => staff._id === selectedUser
      );

      if (!selectedStaff) {
        console.error("Selected ground staff not found");
        return;
      }

      const response = await api.put(`backend/events/status/${event_id}`, {
        status: "Assigned",
        groundStaffName: selectedStaff.name, // Updated to match API payload
      });

      if (response.status === 200) {
        console.log(`Event ${event_id} assigned to ${selectedStaff.name}`);
        setIsAssigned(true); // Update assignment status
        navigate(`/dashboard/${reportData.AgencyId}`);
      }
    } catch (error) {
      console.error("Error assigning ground staff:", error);
    }
  };

  if (loading) {
    return <p>Loading report data...</p>;
  }

  if (!reportData) {
    return <p>No data found for event {event_id}</p>;
  }

  // Only format date & time if reportData is available
  const formattedDate = reportData?.assignment_time
    ? new Date(reportData.assignment_time).toLocaleDateString()
    : "N/A";

  const formattedTime = reportData?.assignment_time
    ? new Date(reportData.assignment_time).toLocaleTimeString()
    : "N/A";

  if (!reportData) {
    return <p>Loading report data...</p>;
  }

  return (
    <section
      className="dashboard-main-page-wrapper"
      style={{ backgroundColor: "#eaf8ff" }}
    >
      <header>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="top-1">
                <div
                  className="logo"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/dashboard/agencyId=${agencyId}`)}
                >
                  <img src="/billioneye/images/logo-small.png" alt="Logo" />
                </div>

                <React.Fragment>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <Tooltip title="Account settings">
                      <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                      >
                        <Avatar sx={{ width: 52, height: 52 }}>
                          <img
                            src="/billioneye/images/adminlogo.ico"
                            alt="image-logo"
                          />
                        </Avatar>
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                  >
                    <MenuItem onClick={handleClose}>
                      <img
                        src="/billioneye/images/enterprise.png"
                        style={{ width: 42, height: 42 }}
                        alt=""
                      />{" "}
                      <div
                        style={{
                          marginLeft: "20px",
                          marginTop: "10px",
                          fontWeight: "bold",
                          fontSize: "18px",
                          color: "#333",
                          letterSpacing: "1px",
                        }}
                      >
                        <Link to="/dashboard">
                          <h5>AGENCY</h5>
                        </Link>
                      </div>
                    </MenuItem>
                    {/* <MenuItem onClick={handleClose}>
                       <img src="/billioneye/images/enterprise.png" style={{ width: 42, height: 42 }} alt=""/> Agency       
                    </MenuItem> */}

                    <Divider />
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <PersonAdd fontSize="small" />
                      </ListItemIcon>
                      <Link to="/assignGroundstaff">Add Ground Satff</Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <Settings fontSize="small" />
                      </ListItemIcon>
                      Settings
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                </React.Fragment>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section
        className="page-heading"
        style={{ marginTop: "-2px", padding: "2px" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h3>{reportData.assignedAgency}</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="dashboard-report-con">
        <div className="container">
          <div className="row">
            <div
              className="col-md-6 "
              id="report-coloumn"
              style={{ marginTop: "-100px" }}
            >
              <div className="table-card-2">
                <div
                  className="table-card-heading"
                  style={{ marginTop: "100px" }}
                >
                  <div className="table-card-heading-icon">
                    <img
                      src="/billioneye/images/dashboard-icon.png"
                      alt="Report "
                    />
                  </div>
                  <h4 className="text-uppercase">Report</h4>
                </div>

                <div className="table-con-2 table-responsive">
                  <table className="table table-striped">
                    <tbody>
                      <tr>
                        <td>
                          <b>Report Id :</b>
                        </td>
                        <td>{reportData.event_id}</td>
                      </tr>
                      <tr>
                        <td>
                          <b>Object Detected :</b>
                        </td>
                        <td>{reportData.description}</td>
                      </tr>
                      <tr>
                        <td>
                          <b>Date of Reporting :</b>
                        </td>
                        <td>{formattedDate}</td>
                      </tr>
                      <tr>
                        <td>
                          <b>Time of Reporting :</b>
                        </td>
                        <td>{formattedTime}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="dashboard-report-map">
                <div className="table-card-heading">
                  <div className="table-card-heading-icon">
                    <img src="/billioneye/images/location.png" alt="Location" />
                    {/* <h4 className="text-uppercase">LOCATION</h4> */}
                  </div>
                </div>

                {/* Map rendering here */}
                <div
                  className="map-container"
                  style={{
                    height: "400px",
                    width: "100%",
                    position: "relative", // Needed to position button inside
                  }}
                >
                  {/* Map or fallback message */}
                  {mapCoordinates ? (
                    <MapCanvas coordinates={mapCoordinates} />
                  ) : (
                    <p style={{ padding: "20px", textAlign: "center" }}>
                      Click 📍 on an event to view its location.
                    </p>
                  )}

                  {/* 📍 Button inside map section */}
                  <button
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      background: "white",
                      border: "1px solid #ccc",
                      borderRadius: "50%",
                      padding: "8px",
                      cursor: "pointer",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    }}
                    title="Go to Event Location"
                    onClick={() =>
                      setMapCoordinates({
                        lat: parseFloat(reportData.latitude), // You need access to a `report` here
                        lng: parseFloat(reportData.longitude),
                      })
                    }
                  >
                    📍
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="assign-to-details">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div
                className="dashboard-report-img"
                style={{ marginTop: "-100px" }}
              >
                <div className="table-card-heading">
                  <div className="table-card-heading-icon">
                    <img
                      src="/billioneye/images/image-icon.png"
                      alt="Incident"
                    />
                  </div>
                  <h4 className="text-uppercase">IMAGE</h4>
                </div>
                <figure>
                  <img
                    src={reportData.image_url}
                    style={{
                      width: "200px",
                      transform: "rotate(-90deg)",
                      objectFit: "contain", // Ensures the full image is visible
                    }}
                    alt="Accident"
                  />
                </figure>
              </div>
            </div>
            <div className="col-md-6" style={{ marginTop: "-200px" }}>
              <div className="dashboard-report-assign">
                <div className="table-card-heading">
                  <h4 className="text-uppercase">Assign To</h4>
                </div>

                <button
                  className="btn btn-success"
                  onClick={handleAddGroundStaff}
                  disabled={isAssigned}
                  // Disable if already assigned
                >
                  Onboard GroundStaff
                </button>

                <button
                  className="btn btn-success"
                  style={{marginLeft:"300px"}}
                  onClick={() => navigate(`/dashboard/${reportData.AgencyId}`)}
                  disabled={isAssigned} // Optional: disable only if needed
                >
                  Back
                </button>

                {/* Retained the second dropdown */}
                <div className="form-group">
                  <label htmlFor="agencyGroundStaffSelect">
                    Select Ground Staff:
                  </label>
                  <select
                    id="agencyGroundStaffSelect"
                    className="form-control"
                    value={selectedUser} // Bind the selected value to the state
                    onChange={(e) => {
                      const userId = e.target.value;
                      setSelectedUser(userId); // Update selectedUser state
                      const selectedStaff = agencyGroundStaff.find(
                        (staff) => staff._id === userId
                      );
                      setUserDetails(selectedStaff || null); // Update userDetails state
                    }}
                  >
                    <option value="">Select Ground Staff</option>
                    {agencyGroundStaff.map((staff) => (
                      <option key={staff._id} value={staff._id}>
                        {staff.name} - {staff.number}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Display selected ground staff details */}
                {userDetails && (
                  <div
                    className="assign-details"
                    style={{
                      marginTop: "10px",
                      background: "#f9f9f9",
                      padding: "10px",
                      borderRadius: "5px",
                    }}
                  >
                    <ul style={{ listStyle: "none", padding: 0 }}>
                      <li>
                        <b>Name:</b> {userDetails.name}
                      </li>
                      <li>
                        <b>Phone:</b> {userDetails.number}
                      </li>
                      <li>
                        <b>Address:</b> {userDetails.address}
                      </li>
                    </ul>
                    <div style={{ textAlign: "center", marginTop: "10px" }}>
                      <button
                        className="btn btn-success"
                        onClick={handleAssign}
                        disabled={isAssigned} // Disable if already assigned
                      >
                        Assign
                      </button>
                      <button
                        className="btn btn-danger"
                        disabled={isAssigned} // Disable if already assigned
                      >
                        Unassigned
                      </button>
                    </div>
                  </div>
                )}

                <div>
                  <span id="designation"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <img src="/billioneye/images/footer-bg.png" alt="" />
      </footer>
    </section>
  );
};

export default EventReport;
