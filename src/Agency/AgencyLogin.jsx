import React from "react";
import "../public/assets/css/AgencyLogin.css";

const AgencyLogin = () => {
  return (
    <section className="main dashboard-hospital">
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
                <figure className="logo-con">
                  <a href="index.html">
                    <img src="./images/logo-blue.png" alt="Logo" />
                  </a>
                </figure>
              </div>
            </div>
          </div>
        </section>

        {/* Sign-Up Form Section */}
        <section className="sign-up-form dashboard-hospital-sign-up">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <form style={{ marginTop: "-150px" }}>
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="USER NAME"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="PASSWORD"
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">
                    <a
                      href="ground-staff-assigned-task.html"
                      style={{ textDecoration: "none", color: "#fff" }}
                    >
                      Login
                    </a>
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <a
                      href="ground-staff-assigned-task.html"
                      style={{ textDecoration: "none", color: "#fff" }}
                    >
                      Register
                    </a>
                  </button>
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

export default AgencyLogin;
