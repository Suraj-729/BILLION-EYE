import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Added useLocation
import api from "../api";

const AssignGroundStaff = () => {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    address: "",
  });
  const navigate = useNavigate();
  const location = useLocation(); // Fixed useLocation
  const [message, setMessage] = useState("");

  const queryParams = new URLSearchParams(location.search);
  const eventId = queryParams.get("eventId");
  const agencyId = queryParams.get("agencyId"); // Retrieve agencyId from query params

  const [isOpen, setIsOpen] = useState(false); // Added useState
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name.trim() ||
      !formData.number.trim() ||
      !formData.address.trim()
    ) {
      setMessage("Please fill all fields before submitting.");
      return;
    }
    try {
      // Include agencyId in the formData
      const dataToSubmit = { ...formData, agencyId };

      const response = await api.post(
        "backend/agency/addgroundstaff",
        dataToSubmit
      );
      if (response.data.success) {
        setMessage("Ground staff added successfully!");
        setFormData({ name: "", number: "", address: "" }); // Reset form

        // Redirect back to EventReport with eventId or dashboard if not present
        if (eventId) {
          navigate(`/eventReport/${eventId}`);
        } else if (agencyId) {
          navigate(`/dashboard/${agencyId}`);
        }
      } else {
        setMessage("Failed to add ground staff.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      console.error(error);
    }
  };

  const [namePlaceholder, setNamePlaceholder] = useState("Name of ground staff");
  const [numberPlaceholder, setNumberPlaceholder] = useState("Enter 10-digit mobile number starting with 6");

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
                  <div
                    className="logo"
                    onClick={() => navigate(`/dashboard/${agencyId}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src="/billioneye/images/logo-small.png"
                      alt="Logo"
                      title=""
                    />
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
                        <li
                          onClick={() => navigate(`/dashboard/${agencyId}`)}
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
                      </ul>
                    </div>
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

        <section className="page-heading" style={{ padding: "2px" }}>
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
                    <h4>On-boarding</h4>
                  </div>
                  <div className="onboarding_ground_staff_formcon">
                    <form onSubmit={handleSubmit}>
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
                              name="name"
                              value={formData.name}
                              onChange={(e) => {
                                const input = e.target.value;
                                // Allow only letters and spaces
                                if (/^[a-zA-Z\s]*$/.test(input)) {
                                  handleChange(e);
                                  setNamePlaceholder("Name of ground staff");
                                }
                              }}
                              onBlur={(e) => {
                                const input = e.target.value.trim();
                                // Validate that each word starts with a capital letter
                                const isValid = input
                                  .split(" ")
                                  .filter(Boolean)
                                  .every((word) => /^[A-Z][a-z]*$/.test(word));

                                if (!isValid && input.length > 0) {
                                  setNamePlaceholder("Each word should start with a capital letter (e.g., John Doe)");
                                  setFormData({ ...formData, name: "" });
                                }
                              }}
                              placeholder={namePlaceholder}
                              required
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
                              Mobile Number
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="number"
                              name="number"
                              value={formData.number}
                              onChange={(e) => {
                                const input = e.target.value;
                                // Allow only digits and limit to 10 characters
                                if (/^\d{0,10}$/.test(input)) {
                                  handleChange(e);
                                  setNumberPlaceholder("Enter 10-digit mobile number starting with 6");
                                }
                              }}
                              placeholder={numberPlaceholder}
                              onBlur={(e) => {
                                const input = e.target.value;
                                if (!/^[6-9]\d{9}$/.test(input) && input.length > 0) {
                                  setNumberPlaceholder("Mobile number must be 10 digits and start with 6, 7, 8, or 9");
                                  setFormData({ ...formData, number: "" });
                                }
                              }}
                              maxLength={10}
                              required
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
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          placeholder="Address of ground staff"
                          required
                        ></textarea>
                      </div>
                      {/* <div className="mb-3" style={{ marginLeft: "11px" }}>
                        <h5>Type of problem responsible for</h5>
                      </div> */}
                      {/* <div className="d-flex gap-3">
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
                      </div> */}
                      <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ marginLeft: "5px" }}
                      >
                        Submit
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ marginLeft: "5px" }}
                        onClick={() => {
                          if (eventId) {
                            navigate(`/eventReport/${eventId}`);
                          } else if (agencyId) {
                            navigate(`/dashboard/${agencyId}`);
                          } else {
                            console.error(
                              "No valid eventId or agencyId to navigate back."
                            );
                          }
                        }}
                      >
                        Back
                      </button>
                    </form>
                    {message && <p>{message}</p>}
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
