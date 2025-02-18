import React from "react";
import "../public/assets/css/Dashboard.css";

const EventReport = () => {
  return (
    <section className="main dashboard-main dashboard-report">
      <section className="dashboard-main-page-wrapper">
        <header>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="top-1">
                  <div className="logo">
                    <a href="index.html">
                      <img src="./images/logo-small.png" alt="Logo" />
                    </a>
                  </div>
                  <nav id="navigation1" className="navigation">
                    <div className="nav-header">
                      <div className="nav-toggle"></div>
                    </div>
                    <div className="nav-menus-wrapper">
                      <ul className="navbar-nav">
                        <li className="nav-item active">
                          <a href="index.html">HOME</a>
                        </li>
                        <li className="nav-item">
                          <a href="onboarding_ground_staff.html">Onboarding ground staff</a>
                        </li>
                      </ul>
                    </div>
                  </nav>
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
              <div className="col-md-6">
                <div className="table-card-2">
                  <div className="table-card-heading">
                    <div className="table-card-heading-icon">
                      <img src="./images/dashboard-icon.png" alt="Report Icon" />
                    </div>
                    <h4 className="text-uppercase">Report</h4>
                  </div>
                  <div className="table-con-2 table-responsive">
                    <table className="table table-striped">
                      <tbody>
                        <tr><td><b>Report Id :</b></td><td>Khandagiri</td></tr>
                        <tr><td><b>Object Detected :</b></td><td>Car Accident</td></tr>
                        <tr><td><b>Date of Reporting :</b></td><td>12-02-2024</td></tr>
                        <tr><td><b>Time of Reporting :</b></td><td>12:24:10</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="dashboard-report-map">
                  <div className="table-card-heading">
                    <div className="table-card-heading-icon">
                      <img src="./images/location.png" alt="Location Icon" />
                    </div>
                    <h4 className="text-uppercase">LOCATION</h4>
                  </div>
                  <iframe src="https://www.google.com/maps/embed?..." width="600" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Google Map"></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="assign-to-details">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="dashboard-report-img">
                  <div className="table-card-heading">
                    <div className="table-card-heading-icon">
                      <img src="./images/image-icon.png" alt="Image Icon" />
                    </div>
                    <h4 className="text-uppercase">IMAGE</h4>
                  </div>
                  <figure>
                    <img src="./images/accident-img.png" alt="Accident" />
                  </figure>
                </div>
              </div>
              <div className="col-md-6">
                <div className="dashboard-report-assign">
                  <div className="table-card-heading">
                    <div className="table-card-heading-icon">
                      <img src="./images/user.png" alt="User Icon" />
                    </div>
                    <h4 className="text-uppercase">ASSIGN TO</h4>
                  </div>
                  <form>
                    <select aria-label="Select User" id="userSelect" className="form-control">
                      <option selected>Select</option>
                      <option value="1">Manasi</option>
                      <option value="2">Prasad</option>
                      <option value="3">Milan</option>
                    </select>
                  </form>
                  <div>
                    <span id="designation"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </section>
    </section>
  );
};

export default EventReport;
