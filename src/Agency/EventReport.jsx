import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; // Ensure all imports are at the top
import "../public/assets/css/EventReport.css";
import api from "../api";

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
  const { event_id } = useParams();
  const [anchorEl, setAnchorEl] = React.useState();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const [loading, setLoading] = useState(true);

  const [reportData, setReportData] = useState(null);
  const [selectedUser, setSelectedUser] = useState(""); // State for selected user
  const [userDetails, setUserDetails] = useState(null); // State for user details

  const [users] = useState([
    { id: "1", name: "John Doe", phone: "123-456-7890", responsibility: "Traffic Officer" },
    { id: "2", name: "Jane Smith", phone: "987-654-3210", responsibility: "Road Safety Analyst" },
    { id: "3", name: "Alice Johnson", phone: "555-666-7777", responsibility: "Emergency Responder" },
    { id: "4", name: "Bob Williams", phone: "111-222-3333", responsibility: "Field Inspector" },
  ]); // Manually added users

  const handleUserChange = (event) => {
    const userId = event.target.value;
    setSelectedUser(userId);

    // Find the selected user details (assuming user objects have id, name, phone, responsibility)
    const user = users.find((u) => u.id === userId);
    setUserDetails(user || null);
  };
  useEffect(() => {
    if (!event_id) {
      console.error("Event ID is missing");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await api.get(`/events/${event_id}`); // Adjust endpoint as needed
        setReportData(response.data);
      } catch (error) {
        console.error("Error fetching report data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [event_id]); // Run effect when eventId changes

  if (loading) {
    return <p>Loading report data...</p>;
  }

  if (!reportData) {
    return <p>No data found for event {event_id}</p>;
  }

  // Only format date & time if reportData is available
  const formattedDate = reportData?.timestamp
    ? new Date(reportData.timestamp).toLocaleDateString()
    : "N/A";

  const formattedTime = reportData?.timestamp
    ? new Date(reportData.timestamp).toLocaleTimeString()
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
                <div className="logo">
                  <Link to={"/dashboard"}>
                    <img src="./images/logo-small.png" alt="Logo" />
                  </Link>
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
                          <img src="./images/adminlogo.ico" alt="image-logo" />
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
                        src="./images/enterprise.png"
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
                       <img src="./images/enterprise.png" style={{ width: 42, height: 42 }} alt=""/> Agency       
                    </MenuItem> */}

                    <Divider />
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <PersonAdd fontSize="small" />
                      </ListItemIcon>
                     <Link to='/assignGroundstaff'>Add Ground Satff</Link> 
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
        style={{ marginTop: "-25px", padding: "2px" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h3>BMC</h3>
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
              style={{ marginTop: "-15px" }}
            >
              <div className="table-card-2">
                <div className="table-card-heading">
                  <div className="table-card-heading-icon">
                    <img src="./images/dashboard-icon.png" alt="Report " />
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
                    <img src="./images/location.png" alt="Location " />
                    {/* <h4 className="text-uppercase">LOCATION</h4> */}
                  </div>
                </div>
                <iframe
                  src="https://www.google.com/maps/embed?..."
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Map"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="assign-to-details">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="dashboard-report-img">
                <div className="table-card-heading">
                  <div className="table-card-heading-icon">
                    <img src="./images/image-icon.png" alt="Incident" />
                  </div>
                  <h4 className="text-uppercase">IMAGE</h4>
                </div>
                <figure>
                  <img
                    src={reportData.imageUrl}
                    style={{ width: "200px" }}
                    alt="Accident"
                  />
                </figure>
              </div>
            </div>
            <div className="col-md-6">
              <div
                className="dashboard-report-assign"
                style={{
                  marginTop: "-15px",
                }}
              >
                <div className="table-card-heading">
                  <div className="table-card-heading-icon">
                    <img src="./images/user.png" alt="" title="" />
                  </div>
                  <h4 className="text-uppercase" style={{ marginLeft: "-10px" }}>
                    ASSIGN TO
                  </h4>
                </div>
                <form>
                  <select
                    aria-label="Select User"
                    id="userSelect"
                    className="form-control"
                    value={selectedUser}
                    onChange={handleUserChange}
                  >
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {" "}
                        {/* Changed user.is → user.id */}
                        {user.name}
                      </option>
                    ))}
                  </select>
                </form>
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
                        <b>Phone:</b> {userDetails.phone}
                      </li>
                      <li>
                        <b>Responsibility:</b> {userDetails.responsibility}
                      </li>
                    </ul>
                    <div style={{ textAlign: "center", marginTop: "10px" }}>
                      <button className="btn btn-success">Assign</button>
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
        <img src="./images/footer-bg.png" alt="" />
      </footer>
    </section>
  );
};

export default EventReport;
