// import React, { useState } from "react";
// import api from "../api";
// import "../public/assets/css/AgencyLogin.css";
// import { Link, useNavigate, useParams } from "react-router-dom";

// const AgencyLogin = () => {
//   const { AgencyId } = useParams(); // Move useParams inside the component
//   const [formData, setFormData] = useState({
//     mobileNumber: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Login form submitted!");

//     if (!formData.mobileNumber || !formData.password) {
//       alert("Please enter Mobile Number and Password.");
//       return;
//     }

//     setLoading(true);

//     try {
//       console.log("Sending Login Request with:", formData);
//       const response = await api.post("backend/agency/login", {
//         mobileNumber: formData.mobileNumber.trim(),
//         password: formData.password,
//       });

//       console.log("Login Response:", response);
//       if (response.status === 200) {
//         const { token, agency } = response.data; // Extract 'agency' object from response
//         const agencyId = agency?.AgencyId; // Extract 'AgencyId' from the 'agency' object
//         console.log("Extracted Agency ID:", agencyId);

//         localStorage.setItem("token", token);
//         alert("Login Successful!");

//         if (agencyId) {
//           navigate(`/dashboard/${agencyId}`); // Redirect to dashboard with AgencyId
//         } else {
//           alert("Agency ID is missing. Please contact support.");
//         }
//       } else {
//         alert("Login Failed: " + (response.data?.message || "Unknown error"));
//       }
//     } catch (error) {
//       console.error("Error Logging In:", error);
//       alert(error.response?.data?.message || "Invalid credentials!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="main dashboard-hospital">
//       <nav className="navbar navbar-expand-lg navbar-dark">
//         <div className="container-fluid">
//           <span className="navbar-brand fw-bold" style={{ color: "#0d6efd" }}>
//             BILLIONEYE- AGENCY
//           </span>
//           <div className="ms-auto">
//             <Link to={"/agencyRegister"}>
//               <button
//                 className="btn btn-outline-light me-2"
//                 style={{ backgroundColor: "#0d6efd" }}
//               >
//                 Register
//               </button>
//             </Link>
//           </div>
//         </div>
//       </nav>
//       <div className="pag-1-wrapper">
//         {/* Background Images Section */}
//         <section className="pag-2-wrapper-sec-1">
//           <div className="pag-2-wrapper-sec-1-bgimg dashboard-hospital-logo-bg">
//             <figure>
//               <img
//                 src="/billioneye/images/pag-2-logo-bg.png"
//                 alt="Background Left"
//               />
//             </figure>
//             <figure>
//               <img
//                 src="/billioneye/images/pag-2-logo-bg-right.png"
//                 alt="Background Right"
//               />
//             </figure>
//           </div>

//           {/* Logo */}
//           <div className="container">
//             <div className="row">
//               <div className="col-md-12">
//                 <figure className="logo-con">
//                   <a href="index.html">
//                     <img src="/billioneye/images/logo-blue.png" alt="Logo" />
//                   </a>
//                 </figure>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Login Form Section */}
//         <section className="sign-up-form dashboard-hospital-sign-up">
//           <div className="container">
//             <div className="row">
//               <div className="col-md-12">
//                 <form onSubmit={handleSubmit} style={{ marginTop: "-150px" }}>
//                   <div className="mb-3">
//                     <input
//                       type="tel"
//                       className="form-control"
//                       placeholder="MOBILE NUMBER"
//                       name="mobileNumber"
//                       onChange={handleChange}
//                       value={formData.mobileNumber}
//                       style={{ color: "black" }}
//                       required
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <input
//                       type="password"
//                       className="form-control"
//                       placeholder="PASSWORD"
//                       name="password"
//                       onChange={handleChange}
//                       value={formData.password}
//                       style={{ color: "black" }}
//                       required
//                     />
//                   </div>

//                   <button
//                     type="submit"
//                     className="btn btn-primary"
//                     disabled={loading}
//                     style={{ textDecoration: "none", color: "#fff" }}
//                   >
//                     {loading ? "Logging in..." : "Login"}
//                   </button>
//                   <p className="mt-3">
//                     <span
//                       style={{ cursor: "pointer", color: "#0d6efd" }}
//                       onClick={() => navigate("/forgot-password")}
//                     >
//                       Forgot Password?
//                     </span>
//                   </p>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Footer Logos Section */}
//         <section className="pag-1-wrapper-sec-2">
//           <div className="container">
//             <div className="row">
//               <div className="col-md-12">
//                 <div className="pag-1-wrapper-sec-2-wrapper text-center">
//                   <div>
//                     <ul>
//                       <li>
//                         <img
//                           src="/billioneye/images/odisha-logo-blue.png"
//                           alt="Odisha Logo"
//                           title="Odisha"
//                         />
//                       </li>
//                       <li>
//                         <img
//                           src="/billioneye/images/nic-logo.png"
//                           alt="NIC Logo"
//                           title="NIC"
//                         />
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>

//       {/* Footer */}
//       <footer style={{ marginTop: "-50px" }}>
//         <img src="/billioneye/images/footer-bg.png" alt="Footer Background" />
//       </footer>
//     </section>
//   );
// };

// export default AgencyLogin;


import React, { useState } from "react";
import api from "../api";
import "../public/assets/css/AgencyLogin.css";
import { Link, useNavigate } from "react-router-dom";

const AgencyLogin = () => {
  // const { AgencyId } = useParams();
  const [formData, setFormData] = useState({
    mobileNumber: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login form submitted!");

    if (!formData.mobileNumber || !formData.password) {
      alert("Please enter Mobile Number and Password.");
      return;
    }

    setLoading(true);

    try {
      console.log("Sending Login Request with:", formData);
      const response = await api.post("backend/agency/login", {
        mobileNumber: formData.mobileNumber.trim(),
        password: formData.password,
      });

      console.log("Login Response:", response);
      if (response.status === 200) {
        const { token, agency } = response.data;
        const agencyId = agency?.AgencyId;
        console.log("Extracted Agency ID:", agencyId);

        // Store token in localStorage
        localStorage.setItem("token", token);
        alert("Login Successful!");

        if (agencyId) {
          navigate(`/dashboard/${agencyId}`); // Redirect to dashboard with AgencyId
        } else {
          alert("Agency ID is missing. Please contact support.");
        }
      } else {
        alert("Login Failed: " + (response.data?.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error Logging In:", error);
      alert(error.response?.data?.message || "Invalid credentials!");
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <section className="main dashboard-hospital">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold" style={{ color: "#0d6efd" }}>
            BILLIONEYE- AGENCY
          </span>
          <div className="ms-auto">
            <Link to={"/agencyRegister"}>
              <button
                className="btn btn-outline-light me-2"
                style={{ backgroundColor: "#0d6efd" }}
              >
                Register
              </button>
            </Link>
           
          </div>
        </div>
      </nav>
      <div className="pag-1-wrapper">
        {/* Background Images Section */}
        <section className="pag-2-wrapper-sec-1">
          <div className="pag-2-wrapper-sec-1-bgimg dashboard-hospital-logo-bg">
            <figure>
              <img
                src="/billioneye/images/pag-2-logo-bg.png"
                alt="Background Left"
              />
            </figure>
            <figure>
              <img
                src="/billioneye/images/pag-2-logo-bg-right.png"
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
                    <img src="/billioneye/images/logo-blue.png" alt="Logo" />
                  </a>
                </figure>
              </div>
            </div>
          </div>
        </section>

        {/* Login Form Section */}
        <section className="sign-up-form dashboard-hospital-sign-up">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <form onSubmit={handleSubmit} style={{ marginTop: "-150px" }}>
                  <div className="mb-3">
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="MOBILE NUMBER"
                      name="mobileNumber"
                      onChange={handleChange}
                      value={formData.mobileNumber}
                      style={{ color: "black" }}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="PASSWORD"
                      name="password"
                      onChange={handleChange}
                      value={formData.password}
                      style={{ color: "black" }}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                    style={{ textDecoration: "none", color: "#fff" }}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                  {/* <p className="mt-3">
                    <span
                      style={{ cursor: "pointer", color: "#0d6efd" }}
                      onClick={() => navigate("/forgot-password")}
                    >
                      Forgot Password?
                    </span>
                  </p> */}
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
                          src="/billioneye/images/odisha-logo-blue.png"
                          alt="Odisha Logo"
                          title="Odisha"
                        />
                      </li>
                      <li>
                        <img
                          src="/billioneye/images/nic-logo.png"
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
        <img src="/billioneye/images/footer-bg.png" alt="Footer Background" />
      </footer>
    </section>
  );
};

export default AgencyLogin;