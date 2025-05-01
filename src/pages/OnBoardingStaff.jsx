// import React from "react";

// const OnBoardingStaff = () => {
//   return (
//     <div>
//       <section className="main dashboard-main onboarding_ground_staff_page">
//         <section className="dashboard-main-page-wrapper">
//           <header>
//             <div className="container">
//               <div className="row">
//                 <div className="col-md-12">
//                   <div className="top-1">
//                     <div className="logo">
//                       <a href="dashboard-admin-bmc.html">
//                         <img src="assets/images/logo-small.png" alt="" title="" />
//                       </a>
//                     </div>
//                     {/* <div className="menu-con">
//                       <nav id="navigation1" className="navigation">
//                         <div className="nav-header">
//                           <div className="nav-toggle"></div>
//                         </div>
//                         <div className="nav-menus-wrapper">
//                           <ul className="navbar-nav">
//                             <li className="nav-item active">
//                               <a href="dashboard-admin-bmc.html">HOME</a>
//                             </li>
//                             <li className="nav-item">
//                               <a href="onboarding_ground_staff.html">Onboarding ground staff</a>
//                             </li>
//                           </ul>
//                         </div>
//                       </nav>
//                     </div> */}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </header>
//           <section className="page-heading">
//             <div className="container">
//               <div className="row">
//                 <div className="col-md-12">
//                   <h3>Govt. Agency</h3>
//                 </div>
//               </div>
//             </div>
//           </section>

//           <section className="onboarding_ground_staff_wrapper">
//             <div className="container">
//               <div className="row">
//                 <div className="col-md-12">
//                   <div className="table-card">
//                     <div className="table-card-heading">
//                       <div className="table-card-heading-icon">
//                         <img src="assets/images/On-boarding.png" alt="" title="" />
//                       </div>
//                       <h4>On-boarding</h4>
//                     </div>
//                     <div className="onboarding_ground_staff_formcon">
//                       <form>
//                         <div className="row">
//                           <div className="col-md-6">
//                             <div className="mb-3">
//                               <label htmlFor="name" className="form-label">Name</label>
//                               <input
//                                 type="text"
//                                 className="form-control"
//                                 id="name"
//                                 placeholder="Name of ground staff"
//                               />
//                             </div>
//                           </div>
//                           <div className="col-md-6">
//                             <div className="mb-3">
//                               <label htmlFor="number" className="form-label">Number</label>
//                               <input
//                                 type="text"
//                                 className="form-control"
//                                 id="number"
//                                 placeholder="Number of ground staff"
//                               />
//                             </div>
//                           </div>
//                         </div>
//                         <div className="mb-3">
//                           <label htmlFor="address" className="form-label">Address</label>
//                           <textarea
//                             className="form-control"
//                             id="address"
//                             placeholder="Address of ground staff"
//                           ></textarea>
//                         </div>
//                         <div className="mb-3">
//                           <h5>Type of problem responsible for</h5>
//                         </div>
//                         <div className="d-flex gap-3">
//                           <div className="form-check">
//                             <input type="checkbox" className="form-check-input" id="Pothole" />
//                             <label className="form-check-label" htmlFor="Pothole">Pothole</label>
//                           </div>
//                           <div className="form-check">
//                             <input type="checkbox" className="form-check-input" id="Litter" />
//                             <label className="form-check-label" htmlFor="Litter">Litter</label>
//                           </div>
//                           <div className="form-check">
//                             <input type="checkbox" className="form-check-input" id="StreetLight" />
//                             <label className="form-check-label" htmlFor="StreetLight">Street Light</label>
//                           </div>
//                         </div>
//                         <button type="submit" className="btn btn-primary">Submit</button>
//                       </form>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>
//         </section>
//       </section>
//     </div>
//   );
// };

// export default OnBoardingStaff;
import React from "react";
import { useState, useEffect } from "react";
import api from "../api";

const OnBoardingStaff = () => {
  const [incidents, setIncidents] = useState([]); // Store incidents data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await api.get("backend/user/incidents"); // Replace with your backend URL
        setIncidents(response.data);
      } catch (error) {
        console.error("❌ Error fetching incidents:", error);
        setError("Failed to fetch incidents");
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  if (loading) return <p>Loading incidents...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="table-container">
        <table className="event-table">
          <thead>
            <tr>
              <th>Sl.No</th>
              <th>User ID</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Timestamp</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(incidents) && incidents.length > 0 ? (
              incidents.map((incident, index) => (
                <tr key={incident.incidentId || index}>
                  <td>{index + 1}</td>
                  <td>{incident.userId}</td>
                  <td>{incident.latitude}</td>
                  <td>{incident.longitude}</td>
                  <td>{new Date(incident.timestamp).toLocaleString()}</td>
                  <td>
                    <img
                      src={incident.imageUrl}
                      alt="Incident"
                      width="100"
                      height="100"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No incidents found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default OnBoardingStaff;
