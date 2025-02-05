import React from 'react';
import { Link } from 'react-router-dom';
import "../../public/assets/css/HospitalReport.css";

const HospitalDashboard = () => {
    return (
        <section className="main dashboard-main">
            <section className="dashboard-main-page-wrapper">
                <header>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="top-1">
                                    <div className="logo">
                                        <Link to="/">
                                            <img src="/assets/images/logo-small.png" alt="Logo" title="Logo" />
                                        </Link>
                                    </div>
                                    <div className="menu-con">
                                        <nav id="navigation1" className="navigation">
                                            <div className="nav-header">
                                                <div className="nav-toggle"></div>
                                            </div>
                                            <div className="nav-menus-wrapper">
                                                <ul className="navbar-nav">
                                                    <li className="nav-item active">
                                                        <Link to="/">HOME</Link>
                                                    </li>
                                                    <li className="nav-item"><Link to="/about">About</Link></li>
                                                    <li className="nav-item"><Link to="/author">Author</Link></li>
                                                    <li className="nav-item"><Link to="/registration">Registration</Link></li>
                                                    <li className="nav-item"><Link to="/committees">Committees</Link></li>
                                                    <li className="nav-item"><Link to="/contact">Contact Us</Link></li>
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
                                <h3>Hospital</h3>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="dashboard-map">
                    <iframe
                        title="Hospital Location Map"
                        src="https://www.google.com/maps/embed?..."
                        width="600"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </section>

                <section className="dashboard-table-con">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="table-card">
                                    <div className="table-card-heading">
                                        <div className="table-card-heading-icon">
                                            <img src="/assets/images/dashboard-icon.png" alt="Dashboard Icon" title="Dashboard Icon" />
                                        </div>
                                        <h4>Recent Reports</h4>
                                        <button className="table-card-btn">View All <i className="fa-solid fa-play"></i></button>
                                    </div>
                                    <div className="table-con table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Sl.No</th>
                                                    <th>Type</th>
                                                    <th>Timestamp</th>
                                                    <th>Location</th>
                                                    <th>Image</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>01</td>
                                                    <td>Car Accident</td>
                                                    <td>12:24:04</td>
                                                    <td>Khandagiri</td>
                                                    <td><img src="/assets/images/accident-1.png" alt="Accident 1" title="Accident 1" /></td>
                                                </tr>
                                                <tr>
                                                    <td>02</td>
                                                    <td>Car Accident</td>
                                                    <td>12:24:04</td>
                                                    <td>Khandagiri</td>
                                                    <td><img src="/assets/images/accident-2.png" alt="Accident 2" title="Accident 2" /></td>
                                                </tr>
                                                <tr>
                                                    <td>03</td>
                                                    <td>Car Accident</td>
                                                    <td>12:24:04</td>
                                                    <td>Khandagiri</td>
                                                    <td><img src="/assets/images/accident-3.png" alt="Accident 3" title="Accident 3" /></td>
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
};

export default HospitalDashboard;
// Compare this snippet from interface/src/pages/Reports/PoliceDashboard.jsx: