import React from "react";
import { Link } from "react-router-dom";
import "../../src/public/assets/css/BillionEyePublic.css";


// export default BillionEye;
const BillionEyePublic = () => {
  
  return (
    <section
      className="bg-cover main home-page"
      style={{ backgroundImage: "url(/images/bg-1.png)" }}
    >
      

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

        {/* Emergency Support Section */}
        <section className="emergency-section text-center">
          <Link to={'/Camera'}>
          <button className="btn btn-danger">
            <i className="bi bi-camera-fill"></i> Incident & Report
          </button>
        </Link>
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

export default BillionEyePublic;
