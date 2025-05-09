import React from "react";
import { useNavigate } from "react-router-dom";
import "../../src/public/assets/css/BillionEyePublic.css";


// export default BillionEye;
const BillionEyePublic = () => {
  const navigate = useNavigate();
  
  return (
    <section
      className="bg-cover main home-page"
      style={{ backgroundImage: "url(/billioneye/images/bg-1.png)" }}
    >
      

      {/* Page Content */}
      <div className="pag-1-wrapper">
        <section className="pag-1-wrapper-sec-1">
          <figure>
            <img src="/billioneye/images/pag-1-logo-bg.png" alt="Background Logo" />
          </figure>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <figure className="logo-con">
                  
                    <img src="/billioneye/images/logo.png" alt="Logo" />
                 
                </figure>
              </div>
            </div>
          </div>
        </section>
        
        {/* Emergency Support Section */}
        <section className="emergency-section text-center" 
        style={{position:"relative", zIndex:1}}>
       
          <button className="btn btn-danger"
           onClick={() => navigate('/Camera')}
          >
            <i className="bi bi-camera-fill"></i> Incident & Report
          </button>
       
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
                          src="/billioneye/images/odisha-logo-white.png"
                          alt="Odisha"
                          title="Odisha"
                        />
                      </li>
                      <li>
                        <img src="/billioneye/images/nic-logo.png" alt="NIC" title="NIC" />
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
