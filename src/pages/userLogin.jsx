
import React, { useState } from "react";
import "../public/assets/css/Login.css";

import api from "../api"; // Assuming your API client is imported as `api`
import { useNavigate } from "react-router-dom"; // Replace useHistory with useNavigate

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); // Replace useHistory with useNavigate

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, // Use e.target.name instead of e.target.id
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const payload = {
        email: formData.email,
        password: formData.password,
      };

      console.log("Sending login request with data:", payload);

      const response = await api.post("/user/login", payload);
      console.log("Login response:", response);

      if (response.status === 200) {
        setSuccess("Login successful!");
        // Store the token in local storage (or a more secure mechanism)
        localStorage.setItem("token", response.data.token);
        // Redirect to /bmcreport after successful login
        navigate("/bmcreport"); // Replace history.push with navigate
      } else {
        setError("Invalid email or password.");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <section className="main sign-up">
      <div className="pag-1-wrapper">
        <section className="pag-2-wrapper-sec-1">
          <div className="pag-2-wrapper-sec-1-bgimg">
            <figure>
              <img src="./images/pag-2-logo-bg.png" alt="Background" />
            </figure>
            <figure>
              <img src="./images/pag-2-logo-bg-right.png" alt="Background Right" />
            </figure>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <figure className="logo-con">
                  <a href="index.html">
                    <img src="./images/logo.png" alt="Logo" />
                  </a>
                </figure>
              </div>
            </div>
          </div>
        </section>

        <section className="sign-up-form">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="heading-1">
                  <h4 className="text-uppercase">Login</h4>
                </div>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email Id"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password" // Changed from "tel" to "password"
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="pag-1-wrapper-sec-2">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="pag-1-wrapper-sec-2-wrapper text-center">
                  <div className="footer-logo-1">
                    <ul>
                      <li>
                        <img
                          src="./images/odisha-logo-white.png"
                          alt="Odisha"
                          title="Odisha"
                        />
                      </li>
                      <li>
                        <img src="./images/nic-logo.png" alt="NIC" title="NIC" />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* <footer>
        <img src="./images/footer-bg.png" alt="Footer" />
      </footer> */}
    </section>
  );
};

export default LoginPage;