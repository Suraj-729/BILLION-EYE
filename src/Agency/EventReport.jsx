import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import "../public/assets/css/Dashboard.css";
import api from "../api";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

const EventReport = () => {
  const [anchorEl, setAnchorEl] = React.useState();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [reportData, setReportData] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try{
  //          const response = await api.get("/user/images/latest");
  //          if (Array.isArray(response.data) && response.data.length > 0) {
  //           setReportData(response.data[0]);
  //       } else {
  //           console.warn("No data found in response:", response.data);
  //       }

  //     }catch (error) {
  //       console.error("Error fetching report data:", error);
  //     }
  //   };
  //   fetchData();

  // }, []);

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
    <section className="dashboard-main-page-wrapper">
      <header>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="top-1">
                <div className="logo">
                  <a href="index.html">
                    <img src="./images/logo-small.png" alt="Logo" />
                  </a>
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
                        <h5>AGENCY</h5>
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
                      Add another account
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

      <section className="page-heading" style={{ marginTop: "-25px" }}>
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
                        <td>{reportData.incidentID}</td>
                      </tr>
                      <tr>
                        <td>
                          <b>Object Detected :</b>
                        </td>
                        <td>{reportData.ObjDesc}</td>
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
                  <img src={reportData.imageUrl} alt="Accident" />
                </figure>
              </div>
            </div>
            <div className="col-md-6">
              <div
                className="dashboard-report-assign"
                style={{
                  marginTop: "-115px",
                }}
              >
                <div className="table-card-heading">
                  <div className="table-card-heading-icon">
                    <h4 className="text-uppercase">ASSIGN TO</h4>
                  </div>
                </div>
                <form>
                  <select
                    aria-label="Select User"
                    id="userSelect"
                    className="form-control"
                  >
                    <option selected>Select</option>
                    <option value="1">Manasi</option>
                    <option value="2">Prasad</option>
                    <option value="3">Milan</option>
                  </select>
                </form>
                <div>
                  <span id="designation"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default EventReport;
