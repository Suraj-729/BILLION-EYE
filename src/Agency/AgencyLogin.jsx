// import React from "react";
// import "../public/assets/css/AgencyLogin.css";
// import { Link } from  'react-router-dom';
// const AgencyLogin = () => {
//   const handleLogin = () => {};

//   return (
//     <section className="main dashboard-hospital">
//       <nav className="navbar navbar-expand-lg navbar-dark">
//         <div className="container-fluid">
//           <span className="navbar-brand fw-bold " style={{ color : "#0d6efd"}}>BILLIONEYE- AGENCY</span>
//           <div className="ms-auto">
//             <Link to={"/agencyRegisiter"}>
//               <button
//                 className="btn btn-outline-light me-2"
//                 onClick={handleLogin}
//                 style={{ backgroundColor : "#0d6efd"}}
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
//               <img src="./images/pag-2-logo-bg.png" alt="Background Left" />
//             </figure>
//             <figure>
//               <img
//                 src="./images/pag-2-logo-bg-right.png"
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
//                     <img src="./images/logo-blue.png" alt="Logo" />
//                   </a>
//                 </figure>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Sign-Up Form Section */}
//         <section className="sign-up-form dashboard-hospital-sign-up">
//           <div className="container">
//             <div className="row">
//               <div className="col-md-12">
//                 <form style={{ marginTop: "-150px" }}>
//                   <div className="mb-3">
//                     <input
//                       type="email"
//                       className="form-control"
//                       placeholder="USER NAME"
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <input
//                       type="password"
//                       className="form-control"
//                       placeholder="PASSWORD"
//                     />
//                   </div>

//                   <button type="submit" className="btn btn-primary">
//                     <a
//                       href="ground-staff-assigned-task.html"
//                       style={{ textDecoration: "none", color: "#fff" }}
//                     >
//                       Login
//                     </a>
//                   </button>
//                   {/* <button type="submit" className="btn btn-primary">
//                     <a
//                       href="ground-staff-assigned-task.html"
//                       style={{ textDecoration: "none", color: "#fff" }}
//                     >
//                       Register
//                     </a>
//                   </button> */}
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
//                           src="./images/odisha-logo-blue.png"
//                           alt="Odisha Logo"
//                           title="Odisha"
//                         />
//                       </li>
//                       <li>
//                         <img
//                           src="./images/nic-logo.png"
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
//         <img src="./images/footer-bg.png" alt="Footer Background" />
//       </footer>
//     </section>
//   );
// };

// export default AgencyLogin;



import React from "react";
import { useState } from "react";
import api from "../api";
import "../public/assets/css/AgencyLogin.css";
import { Link, useNavigate } from 'react-router-dom';
const AgencyLogin = () => {
  const [formData, setFormData] = useState({
    agencyId: "",
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

    if (!formData.agencyId || !formData.password) {
      alert("Please enter Agency ID and Password.");
      return;
    }

    setLoading(true);

    try {
      console.log("Sending Login Request with:", formData);
      const response = await api.post("/agencies/login", {
        agencyId: formData.agencyId.trim(),
        password: formData.password
      }, { withCredentials: true });

      console.log("Login Response:", response);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        alert("Login Successful!");
        navigate("/dashboard"); // Redirect to dashboard
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
  const handleLogin = () => { };

  return (
    <section className="main dashboard-hospital">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold " style={{ color: "#0d6efd" }}>BILLIONEYE- AGENCY</span>
          <div className="ms-auto">
            <Link to={"/agencyRegister"}>
              <button
                className="btn btn-outline-light me-2"
                onClick={handleLogin}
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
                <form onSubmit={handleSubmit} style={{ marginTop: "-150px" }}>
                  <div className="mb-3">
                    <input type="text" className="form-control" placeholder="AGENCY ID" name="agencyId" onChange={handleChange} value={formData.agencyId} style={{ color: "black" }} required />
                  </div>
                  <div className="mb-3">
                    <input type="password" className="form-control" placeholder="PASSWORD" name="password" onChange={handleChange} value={formData.password} style={{ color: "black" }} required />

                  </div>

                  <button type="submit" className="btn btn-primary" disabled={loading}
                    style={{ textDecoration: "none", color: "#fff" }}>

                    {loading ? "Logging in..." : "Login"}


                  </button>
                  <p className="mt-3">
                    <span style={{ cursor: "pointer", color: "#0d6efd" }} onClick={() => navigate("/forgot-password")}>
                      Forgot Password?
                    </span>
                  </p>

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

