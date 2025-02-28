import { useState } from "react";
import "../public/assets/css/AgencyRegister.css";
import { Link } from "react-router-dom";
import api from "../api";
const AgencyRegister = () => {
  const [formData, setFormData] = useState({
    agencyName: "",
    mobileNumber: "",
    latitude: "",
    longitude: "",
    agencyType: "",
    password: "",
  });

  const forType = ["CRITICAL", "NON CRITICAL"]; // Dropdown options

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(`Updated ${name}:`, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.agencyName ||
      !formData.mobileNumber ||
      !formData.latitude ||
      !formData.longitude ||
      !formData.agencyType ||
      !formData.password
    ) {
      alert("Please fill all fields before submitting.");
      return;
    }

    console.log("Submitting Form Data:", formData);

    try {
      const requestData = {
        agencyName: formData.agencyName,
        phoneNumber: formData.mobileNumber,
        lat: parseFloat(formData.latitude),
        lng: parseFloat(formData.longitude),
        forType:
          formData.agencyType === "CRITICAL"
            ? "Critical"
            : formData.agencyType === "NON CRITICAL"
            ? "Non-Critical"
            : formData.agencyType, // Ensure correct format
        password: formData.password,
      };

      const response = await api.post("/agencies/agencyId", requestData);

      console.log("API Response:", response);

      if (response.status === 200 || response.status === 201) {
        alert("Agency Registered Successfully!");
      } else {
        alert(
          "Registration Failed: " + (response.data?.message || "Unknown error")
        );
      }
    } catch (error) {
      console.error("Error Registering Agency:", error);

      if (error.response) {
        console.error("Response Data:", error.response.data);
        console.error("Response Status:", error.response.status);
        console.error("Response Headers:", error.response.headers);
        alert(
          `Error: ${error.response.data?.message || "Something went wrong!"}`
        );
      } else if (error.request) {
        console.error("No Response Received:", error.request);
        alert("No response received from the server.");
      } else {
        console.error("Axios Error:", error.message);
        alert("Request failed: " + error.message);
      }
    }
  };

  return (
    <section className="main dashboard-hospital">
      <nav className="navbar navbar-expand-lg navbar-white">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold " style={{ color: "#0d6efd" }}>
            BILLIONEYE- AGENCY
          </span>
          <div className="ms-auto">
            <Link to="/agencyLogin">
              <button
                className="btn btn-outline-light me-2"
                style={{ backgroundColor: "#0d6efd" }}
              >
                Login
              </button>
            </Link>
          </div>
        </div>
      </nav>
      <div className="pag-1-wrapper">
        {/* Background Images Section */}
        <section className="pag-2-wrapper-sec-1">
          <div className="pag-2-wrapper-sec-1-bgimg dashboard-hospital-logo-bg">
            <figure>
              <img src="./images/pag-2-logo-bg.png" alt="Background Left" />
            </figure>
            <figure>
              <img
                src="./images/pag-2-logo-bg-right.png"
                alt="Background Right"
              />
            </figure>
          </div>

          {/* Logo */}
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <figure className="logo-con" style={{marginTop: "18px"}}>
                  <a href="index.html">
                    <img src="./images/logo-blue.png" alt="Logo"  />
                  </a>
                </figure>
              </div>
            </div>
          </div>
        </section>

        {/* Sign-Up Form Section */}
        <section className="sign-up-form dashboard-hospital-sign-up" style={{marginTop:"-2px"}}>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <form style={{ marginTop: "-150px" }} onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      style={{ color: "black" }}
                      type="text"
                      className="form-control"
                      placeholder="AGENCY NAME"
                      name="agencyName"
                      onChange={handleChange}
                      value={formData.agencyName}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      style={{ color: "black" }}
                      type="tel"
                      className="form-control"
                      placeholder="MOBILE NUMBER"
                      name="mobileNumber"
                      onChange={handleChange}
                      value={formData.mobileNumber}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      style={{ color: "black" }}
                      type="number"
                      className="form-control"
                      placeholder="LATITUDE"
                      name="latitude"
                      step="any"
                      onChange={handleChange}
                      value={formData.latitude}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      style={{ color: "black" }}
                      type="number"
                      className="form-control"
                      placeholder="LONGITUDE"
                      name="longitude"
                      step="any"
                      onChange={handleChange}
                      value={formData.longitude}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    
                      <select
                        className="form-control"
                        style={{ color: "black" }}
                        name="agencyType"
                        
                        value={formData.agencyType}
                        onChange={handleChange}
                        required
                      >
                        <option value=""
                         disabled>
                          SELECT AGENCY TYPE
                        </option>
                        {forType.map((type, index) => (
                          <option key={index} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    
                  </div>
                  <div className="mb-3">
                    <input
                      style={{ color: "black" }}
                      type="password"
                      className="form-control"
                      placeholder="PASSWORD"
                      name="password"
                      onChange={handleChange}
                      value={formData.password}
                      required
                    />
                  </div>
                  <Link to={'/dashboard'}>
                  <button type="submit" className="btn btn-primary">
                    Register
                  </button></Link>
                  
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Logos Section */}
        <section className="pag-1-wrapper-sec-2">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="pag-1-wrapper-sec-2-wrapper text-center">
                  <div>
                    <ul>
                      <li>
                        <img
                          src="./images/odisha-logo-blue.png"
                          alt="Odisha Logo"
                          title="Odisha"
                        />
                      </li>
                      <li>
                        <img
                          src="./images/nic-logo.png"
                          alt="NIC Logo"
                          title="NIC"
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer style={{ marginTop: "-50px" }}>
        <img src="./images/footer-bg.png" alt="Footer Background" />
      </footer>
    </section>
  );
};

export default AgencyRegister;
