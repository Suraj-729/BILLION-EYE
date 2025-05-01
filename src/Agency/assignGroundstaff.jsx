import React, { useState } from "react";
import { Link } from "react-router-dom";
const AssignGroundStaff = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className="main dashboard-main onboarding_ground_staff_page">
      <section
        className="dashboard-main-page-wrapper"
        style={{ backgroundColor: " #eaf8ff" }}
      >
        <header>
          <div className="container">
            <div className="row" style={{ marginTop: "-11px" }}>
              <div className="col-md-12">
                <div className="top-1">
                  <div className="logo">
                    <a href="dashboard-admin-bmc.html">
                      <img src="/billioneye/images/logo-small.png" alt="Logo" title="" />
                    </a>
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
                    <img src="/billioneye/images/menu-bar.svg" alt="" />
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
                      <Link to="/dashboard">
                        <li>HOME</li>
                      </Link>
                    </ul>
                  </div>
                  {/* <div className="menu-con">
                                        <nav id="navigation1" className="navigation">
                                            <div className="nav-header">
                                                <div className="nav-toggle"></div>
                                            </div>
                                            <div className="nav-menus-wrapper">
                                                <ul className="navbar-nav">
                                                    <li className="nav-item active">
                                                        <a href="dashboard-admin-bmc.html">HOME</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href="onboarding_ground_staff.html">Onboarding ground staff</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </nav>
                                    </div> */}
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

        <section className="onboarding_ground_staff_wrapper">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="table-card">
                  <div className="table-card-heading">
                    <div className="table-card-heading-icon">
                      <img
                        src="/billioneye/images/On-boarding.png"
                        alt="Onboarding"
                        title=""
                      />
                    </div>
                    <h4 style={{ marginRight: "1011px" }}>On-boarding</h4>
                  </div>
                  <div className="onboarding_ground_staff_formcon">
                    <form>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label
                              htmlFor="name"
                              className="form-label"
                              style={{ marginLeft: "5px" }}
                            >
                              Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="name"
                              placeholder="Name of ground staff"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label
                              htmlFor="number"
                              className="form-label"
                              style={{ marginLeft: "5px" }}
                            >
                              Number
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="number"
                              placeholder="Number of ground staff"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="address"
                          className="form-label"
                          style={{ marginLeft: "10px" }}
                        >
                          Address
                        </label>
                        <textarea
                          className="form-control"
                          id="address"
                          placeholder="Address of ground staff"
                        ></textarea>
                      </div>
                      <div className="mb-3" style={{ marginLeft: "11px" }}>
                        <h5>Type of problem responsible for</h5>
                      </div>
                      <div className="d-flex gap-3">
                        <div className="form-check">
                          <div className="mb-3">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="Pothole"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="Pothole"
                            >
                              Pothole
                            </label>
                          </div>
                        </div>
                        <div className="form-check">
                          <div className="mb-3">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="Litter"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="Litter"
                            >
                              Litter
                            </label>
                          </div>
                        </div>
                        <div className="form-check">
                          <div className="mb-3">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="StreetLight"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="StreetLight"
                            >
                              Street Light
                            </label>
                          </div>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ marginLeft: "5px" }}
                      >
                        <a href="ground-staff-login.html">Submit</a>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>

      <footer>
        <img src="/billioneye/images/footer-bg.png" alt="Footer" />
      </footer>
    </section>
  );
};

export default AssignGroundStaff;
