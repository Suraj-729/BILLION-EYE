import React, { useState } from "react";
import "../public/assets/css/Register.css";
import { Link } from "react-router-dom";

import api from "../api";

const handleLogin = () => {
  console.log("Login button clicked");
};

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const payload = {
        fullname: {
          firstname: formData.firstName,
          lastname: formData.lastName,
        },
        email: formData.email,
        password: formData.password,
      };

      console.log("Sending request with data:", payload);

      const response = await api.post("/user/register", payload);
      console.log("Response:", response);

      console.log("Success response:", response.data);
      setSuccess("Registration successful!");
    } catch (error) {
      window.alert(error);
      console.error("Error:", error.response?.data || error.message);
      setError(
        error.response.data?.message || "Failed to register. Please try again."
      );
    }
  };

  return (
    <section className="main sign-up">
      <nav className="navbar navbar-expand-lg navbar-dark">
              <div className="container-fluid">
                <span className="navbar-brand fw-bold text-white">BILLIONEYE</span>
                <div className="ms-auto">
                  <Link to={"/login"}>
                    <button
                      className="btn btn-outline-light me-2"
                      onClick={handleLogin}
                    >
                      Login
                    </button>
                  </Link>
                  {/* <Link to={"/register"}>
                          <button className="btn btn-primary" onClick={handleSignUp}>
                            Sign Up
                          </button>
                        </Link> */}
                </div>
              </div>
            </nav>
      <div className="pag-1-wrapper">
        {/* Background Section */}
        <section className="pag-2-wrapper-sec-1">
          <div className="pag-2-wrapper-sec-1-bgimg">
            <figure>
              <img src="./images/pag-2-logo-bg.png" alt="Background" />
            </figure>
            <figure>
              <img
                src="./images/pag-2-logo-bg-right.png"
                alt="Background Right"
              />
            </figure>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <figure className="logo-con">
                  <Link to="/">
                    <img src="./images/logo.png" alt="Logo" />
                  </Link>
                </figure>
              </div>
            </div>
          </div>
        </section>

        {/* Sign-Up Form */}
        <section className="sign-up-form">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
              
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      id="firstName"
                      type="text"
                      className="form-control"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      id="lastName"
                      type="text"
                      className="form-control"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      id="email"
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      id="password"
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                
                    <button type="submit" className="btn btn-primary">
                      Register
                    </button>
                  

                  {/* <Link to={"/login"}>
                    <button type="submit" className="btn btn-primary">
                      Login
                    </button>
                  </Link> */}
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Section */}
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
                        <img
                          src="./images/nic-logo.png"
                          alt="NIC"
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
      <footer>
        <img src="./images/footer-bg.png" alt="Footer Background" />
      </footer>
    </section>
  );
};

export default RegisterPage;
