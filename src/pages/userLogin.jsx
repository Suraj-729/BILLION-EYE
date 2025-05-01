import React, { useState } from "react";
import "../public/assets/css/Login.css";
import { Link } from "react-router-dom";
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

      const response = await api.post("backend/user/login", payload);
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

  const handleLogin = () => {
    console.log("Login button clicked");
  };

  

  return (
    <section className="main sign-up">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold text-white">BILLIONEYE</span>
          <div className="ms-auto">
            <Link to={"/register"}>
              <button
                className="btn btn-outline-light me-2"
                onClick={handleLogin}
              >
                Register
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
        <section className="pag-2-wrapper-sec-1">
          <div className="pag-2-wrapper-sec-1-bgimg">
            <figure>
              <img src="./billioneye/images/pag-2-logo-bg.png" alt="Background" />
            </figure>
            <figure>
              <img
                src="./billioneye/images/pag-2-logo-bg-right.png"
                alt="Background Right"
              />
            </figure>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <figure className="logo-con">
                  <a href="index.html">
                    <img src="./billioneye/images/logo.png" alt="Logo" />
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
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                {/* <form onSubmit={handleSubmit}>
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
                    Login
                  </button>
                  <Link to={"/register"}>
                    <button type="submit" className="btn btn-primary">
                      Register
                    </button>
                  </Link>
                </form> */}

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
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Login Button (Form Submit) */}
                  <button type="submit" className="btn btn-primary">
                    Login
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
                          src="./billioneye/images/odisha-logo-white.png"
                          alt="Odisha"
                          title="Odisha"
                        />
                      </li>
                      <li>
                        <img
                          src="./billioneye/images/nic-logo.png"
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
      {/* <footer>
        <img src="./billioneye/images/footer-bg.png" alt="Footer" />
      </footer> */}
    </section>
  );
};

export default LoginPage;
