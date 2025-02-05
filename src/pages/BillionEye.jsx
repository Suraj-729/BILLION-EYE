import React from "react";
import { Link } from "react-router-dom";
import "../../src/public/assets/css/BillionEye.css";


// export default BillionEye;
const BillionEye = () => {
  const handleLogin = () => {
    console.log("Login button clicked");
  };

  const handleSignUp = () => {
    console.log("Sign Up button clicked");
  };

  return (
    <section
      className="bg-cover main home-page"
      style={{ backgroundImage: "url(/images/bg-1.png)" }}
    >
      {/* Navbar */}
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
            <Link to={"/register"}>
              <button className="btn btn-primary" onClick={handleSignUp}>
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="pag-1-wrapper">
        <section className="pag-1-wrapper-sec-1">
          <figure>
            <img src="/images/pag-1-logo-bg.png" alt="Background Logo" />
          </figure>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <figure className="logo-con">
                  <Link to="/signup">
                    <img src="/images/logo.png" alt="Logo" />
                  </Link>
                </figure>
              </div>
            </div>
          </div>
        </section>

        <section className="pag-1-wrapper-sec-2">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="pag-1-wrapper-sec-2-wrapper text-center">
                  <h4>
                    <p>Your voice, Your Impact direct to the Government.</p>
                  </h4>
                  <div className="footer-logo-1">
                    <ul>
                      <li>
                        <img
                          src="/images/odisha-logo-white.png"
                          alt="Odisha"
                          title="Odisha"
                        />
                      </li>
                      <li>
                        <img src="/images/nic-logo.png" alt="NIC" title="NIC" />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default BillionEye;
