import React from "react";
import "../public/assets/css/Dashboard.css";

const Dashboard = () => {
    return (
        <section className="main dashboard-main">
        <section className="dashboard-main-page-wrapper">
          <header>
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="top-1">
                    <div className="logo">
                      <a href="#">
                        <img src="./images/logo-small.png" alt="Logo" title="Logo" />
                      </a>
                    </div>
                    <div className="menu-con">
                      <nav id="navigation1" className="navigation">
                        <div className="nav-header">
                          <div className="nav-toggle"></div>
                        </div>
                        <div className="nav-menus-wrapper">
                          <ul className="navbar-nav">
                            <li className="nav-item active">
                              <a href="index.html">HOME</a>
                            </li>
                            <li className="nav-item"><a href="#">About</a></li>
                            <li className="nav-item"><a href="#">Author</a></li>
                            <li className="nav-item"><a href="#">Registration</a></li>
                            <li className="nav-item"><a href="#">Committees</a></li>
                            <li className="nav-item"><a href="#">Contact Us</a></li>
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
                  <h3>HOSPITALS</h3>
                </div>
              </div>
            </div>
          </section>
  
          <section className="dashboard-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d239487.1652253839!2d85.65564125231477!3d20.300807016970502!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1909d2d5170aa5%3A0xfc580e2b68b33fa8!2sBhubaneswar%2C%20Odisha!5e0!3m2!1sen!2sin!4v1737381279368!5m2!1sen!2sin"
              width="600" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"></iframe>
          </section>
  
          <section className="dashboard-table-con">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="table-card">
                    <div className="table-card-heading">
                      <div className="table-card-heading-icon">
                        <img src="./images/dashboard-icon.png" alt="Dashboard Icon" title="Dashboard Icon" />
                      </div>
                      <h4>Recent Reports</h4>
                      <a href="#" className="table-card-btn">View All <i className="fa-solid fa-play"></i></a>
                    </div>
  
                    <div className="table-con table-responsive">
                      <div className="table-heading">
                        <table className="table">
                          <thead>
                            <tr>
                              <td><div> Sl.No</div></td>
                              <td><div>Type</div></td>
                              <td><div>Timestamp</div></td>
                              <td><div>Location</div></td>
                              <td><div>Image</div></td>
                            </tr>
                          </thead>
                        </table>
                      </div>
  
                      <table className="table">
                        <tbody>
                          <tr>
                            <td><div>01</div></td>
                            <td><div>Car Accident</div></td>
                            <td><div>12:24:04</div></td>
                            <td><div>Khandagiri</div></td>
                            <td><div><img src="./images/accident-1.png" alt="Accident 1" title="Accident 1" /></div></td>
                          </tr>
                          <tr>
                            <td><div>02</div></td>
                            <td><div>Car Accident</div></td>
                            <td><div>12:24:04</div></td>
                            <td><div>Khandagiri</div></td>
                            <td><div><img src="./images/accident-2.png" alt="Accident 2" title="Accident 2" /></div></td>
                          </tr>
                          <tr>
                            <td><div>03</div></td>
                            <td><div>Car Accident</div></td>
                            <td><div>12:24:04</div></td>
                            <td><div>Khandagiri</div></td>
                            <td><div><img src="./images/accident-3.png" alt="Accident 3" title="Accident 3" /></div></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
      </section>
    );
}

export default Dashboard;