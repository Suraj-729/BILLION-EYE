import React from "react";
import "../public/assets/css/BmcReport.css";

const BmcDashboard = () => {
  const handleNavigation = (route) => {
    console.log(`Navigating to ${route}`);
    // Add navigation logic if using react-router
  };

  return (
    <section className="main dashboard-main dashboard-report">
      <section className="dashboard-main-page-wrapper">
        <header>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="top-1">
                  <div className="logo">
                    <button onClick={() => handleNavigation("/")}>
                      <img src="./billioneye/images/logo-small.png" alt="Company Logo" title="Company Logo" />
                    </button>
                  </div>
                  <div className="menu-con">
                    <nav id="navigation1" className="navigation">
                      <div className="nav-header">
                        <div className="nav-toggle"></div>
                      </div>
                      <div className="nav-menus-wrapper">
                        <ul className="navbar-nav">
                          <li className="nav-item active">
                            <button onClick={() => handleNavigation("/")}>HOME</button>
                          </li>
                        </ul>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="page-heading">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h3>BMC</h3>
              </div>
            </div>
          </div>
        </section>

        <section className="dashboard-report-con">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="table-card-2">
                  <div className="table-card-heading">
                    <div className="table-card-heading-icon">
                      <img src="./billioneye/images/dashboard-icon.png" alt="Dashboard" title="Dashboard" />
                    </div>
                    <h4 className="text-uppercase">Report</h4>
                  </div>
                  <div className="table-con-2 table-responsive">
                    <table className="table table-striped">
                      <tbody>
                        <tr>
                          <td><div><b>Report Id :</b></div></td>
                          <td><div>Khandagiri</div></td>
                        </tr>
                        <tr>
                          <td><div><b>Object Detected :</b></div></td>
                          <td><div>Car Accident</div></td>
                        </tr>
                        <tr>
                          <td><div><b>Date of Reporting :</b></div></td>
                          <td><div>12-02-2024</div></td>
                        </tr>
                        <tr>
                          <td><div><b>Time of Reporting :</b></div></td>
                          <td><div>12:24:10</div></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="dashboard-report-map">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="table-card-heading">
                  <div className="table-card-heading-icon">
                    <img src="./billioneye/images/location.png" alt="Location" title="Location" />
                  </div>
                  <h4 className="text-uppercase">LOCATION</h4>
                </div>
                <iframe
                  title="Map of BMC Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d239487.1652253839!2d85.65564125231477!3d20.300807016970502!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1909d2d5170aa5%3A0xfc580e2b68b33fa8!2sBhubaneswar%2C%20Odisha!5e0!3m2!1sen!2sin!4v1737381279368!5m2!1sen!2sin"
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        <section className="dashboard-report-img">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="table-card-heading">
                  <div className="table-card-heading-icon">
                    <img src="./billioneye/images/image-icon.png" alt="Gallery Icon" title="Gallery Icon" />
                  </div>
                  <h4 className="text-uppercase">IMAGE</h4>
                </div>
                <figure>
                  <img src="./billioneye/images/accident-img.png" alt="Car Accident Scene" />
                </figure>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="table-card-heading">
                  <div className="table-card-heading-icon">
                    <img src="./billioneye/images/image-icon.png" alt="Gallery Icon" title="Gallery Icon" />
                  </div>
                  <h4 className="text-uppercase">IMAGE</h4>
                </div>
                <figure>
                  <img src="./billioneye/images/accident-img.png" alt="Car Accident Scene" />
                </figure>
              </div>
            </div>
          </div>
        </section>
      </section>
    </section>
  );
};

export default BmcDashboard;
