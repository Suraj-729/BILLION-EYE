import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../public/assets/css/SServiceLogin.css";
const ServiceLogin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!formData.username || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    // Simulate login logic (replace with actual API call)
    if (formData.username === "admin" && formData.password === "password") {
      // Redirect to the dashboard on successful login
      navigate("/dashboard-admin-bmc");
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <section className="main dashboard-hospital">
      <div className="pag-1-wrapper">
        <section className="pag-2-wrapper-sec-1">
          <div className="pag-2-wrapper-sec-1-bgimg dashboard-hospital-logo-bg">
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
                    <img src="./images/logo-blue.png" alt="Logo" />
                  </a>
                </figure>
              </div>
            </div>
          </div>
        </section>

        <section className="sign-up-form dashboard-hospital-sign-up">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="USER NAME"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="PASSWORD"
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
                          src="./images/odisha-logo-blue.png"
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
      <footer>
        <img src="./images/footer-bg.png" alt="Footer" />
      </footer>
    </section>
  );
};

export default ServiceLogin;