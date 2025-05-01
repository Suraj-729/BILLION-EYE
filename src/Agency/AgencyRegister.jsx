// import { useState } from "react";
// import "../public/assets/css/AgencyRegister.css";
// import { Link } from "react-router-dom";
// import api from "../api";
// const AgencyRegister = () => {
//   const [formData, setFormData] = useState({
//     agencyName: "",
//     mobileNumber: "",
//     latitude: "",
//     longitude: "",
//     agencyType: "",
//     password: "",
//   });

//   const forType = ["CRITICAL", "NON CRITICAL"]; // Dropdown options

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     console.log(`Updated ${name}:`, value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (
//       !formData.agencyName ||
//       !formData.mobileNumber ||
//       !formData.latitude ||
//       !formData.longitude ||
//       !formData.agencyType ||
//       !formData.password
//     ) {
//       alert("Please fill all fields before submitting.");
//       return;
//     }

//     console.log("Submitting Form Data:", formData);

//     try {
//       const requestData = {
//         agencyName: formData.agencyName,
//         phoneNumber: formData.mobileNumber,
//         lat: parseFloat(formData.latitude),
//         lng: parseFloat(formData.longitude),
//         forType:
//           formData.agencyType === "CRITICAL"
//             ? "Critical"
//             : formData.agencyType === "NON CRITICAL"
//             ? "Non-Critical"
//             : formData.agencyType, // Ensure correct format
//         password: formData.password,
//       };

//       const response = await api.post("/agencies/agencyId", requestData);

//       console.log("API Response:", response);

//       if (response.status === 200 || response.status === 201) {
//         alert("Agency Registered Successfully!");
//       } else {
//         alert(
//           "Registration Failed: " + (response.data?.message || "Unknown error")
//         );
//       }
//     } catch (error) {
//       console.error("Error Registering Agency:", error);

//       if (error.response) {
//         console.error("Response Data:", error.response.data);
//         console.error("Response Status:", error.response.status);
//         console.error("Response Headers:", error.response.headers);
//         alert(
//           `Error: ${error.response.data?.message || "Something went wrong!"}`
//         );
//       } else if (error.request) {
//         console.error("No Response Received:", error.request);
//         alert("No response received from the server.");
//       } else {
//         console.error("Axios Error:", error.message);
//         alert("Request failed: " + error.message);
//       }
//     }
//   };

//   return (
//     <section className="main dashboard-hospital">
//       <nav className="navbar navbar-expand-lg navbar-white">
//         <div className="container-fluid">
//           <span className="navbar-brand fw-bold " style={{ color: "#0d6efd" }}>
//             BILLIONEYE- AGENCY
//           </span>
//           <div className="ms-auto">
//             <Link to="/agencyLogin">
//               <button
//                 className="btn btn-outline-light me-2"
//                 style={{ backgroundColor: "#0d6efd" }}
//               >
//                 Login
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
//               <img src="/billioneye/images/pag-2-logo-bg.png" alt="Background Left" />
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
//                 <figure className="logo-con" style={{marginTop: "18px"}}>
//                   <a href="index.html">
//                     <img src="/billioneye/images/logo-blue.png" alt="Logo"  />
//                   </a>
//                 </figure>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Sign-Up Form Section */}
//         <section className="sign-up-form dashboard-hospital-sign-up" style={{marginTop:"-2px"}}>
//           <div className="container">
//             <div className="row">
//               <div className="col-md-12">
//                 <form style={{ marginTop: "-150px" }} onSubmit={handleSubmit}>
//                   <div className="mb-3">
//                     <input
//                       style={{ color: "black" }}
//                       type="text"
//                       className="form-control"
//                       placeholder="AGENCY NAME"
//                       name="agencyName"
//                       onChange={handleChange}
//                       value={formData.agencyName}
//                       required
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <input
//                       style={{ color: "black" }}
//                       type="tel"
//                       className="form-control"
//                       placeholder="MOBILE NUMBER"
//                       name="mobileNumber"
//                       onChange={handleChange}
//                       value={formData.mobileNumber}
//                       required
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <input
//                       style={{ color: "black" }}
//                       type="number"
//                       className="form-control"
//                       placeholder="LATITUDE"
//                       name="latitude"
//                       step="any"
//                       onChange={handleChange}
//                       value={formData.latitude}
//                       required
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <input
//                       style={{ color: "black" }}
//                       type="number"
//                       className="form-control"
//                       placeholder="LONGITUDE"
//                       name="longitude"
//                       step="any"
//                       onChange={handleChange}
//                       value={formData.longitude}
//                       required
//                     />
//                   </div>
//                   <div className="mb-3">
                    
//                       <select
//                         className="form-control"
//                         style={{ color: "black" }}
//                         name="agencyType"
                        
//                         value={formData.agencyType}
//                         onChange={handleChange}
//                         required
//                       >
//                         <option value=""
//                          disabled>
//                           SELECT AGENCY TYPE
//                         </option>
//                         {forType.map((type, index) => (
//                           <option key={index} value={type}>
//                             {type}
//                           </option>
//                         ))}
//                       </select>
                    
//                   </div>
//                   <div className="mb-3">
//                     <input
//                       style={{ color: "black" }}
//                       type="password"
//                       className="form-control"
//                       placeholder="PASSWORD"
//                       name="password"
//                       onChange={handleChange}
//                       value={formData.password}
//                       required
//                     />
//                   </div>
//                   <Link to={'/dashboard'}>
//                   <button type="submit" className="btn btn-primary">
//                     Register
//                   </button></Link>
                  
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

// export default AgencyRegister;


import { useState } from "react";
import "../public/assets/css/AgencyRegister.css";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
const AgencyRegister = () => {
  const [formData, setFormData] = useState({
    agencyName: "",
    mobileNumber: "",
    agencyType: "",
    password: "",
    confirmPassword:"",
    otp:"",
  });
  const [otp, setOtp] = useState(new Array(6).fill("")); // OTP input fields
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const forType = ["CRITICAL", "NON CRITICAL"]; // Dropdown options

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      let newValue = value;

      // Allow only numbers for mobileNumber
      if (name === "mobileNumber") {
        newValue = newValue.replace(/\D/g, "").slice(0, 10); // Remove non-numeric characters & limit to 10 digits
      }

      return { ...prevData, [name]: newValue };
    });
  };


   // 🟢 Send OTP Request
   const sendOtp = async () => {
    if (!formData.mobileNumber || formData.mobileNumber.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      const response = await api.post("/api/otp/send", { mobileNumber: formData.mobileNumber });

      if (response.status === 200) {
        setOtpSent(true);
        const receivedOtp = response.data.otp.toString().split(""); // Convert OTP to an array
      setOtp(receivedOtp);
        alert(`OTP sent successfully!\nYour OTP: ${response.data.otp}`); // Hide this alert in production
      } else {
        alert(response.data.message || "Failed to send OTP.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Error sending OTP. Try again.");
    }
  };

  // 🟢 Handle OTP Input
  // const handleOtpChange = (e, index) => {
  //   const value = e.target.value.replace(/\D/g, ""); // Only allow numbers
  //   if (value.length <= 1) {
  //     let newOtp = [...otp];
  //     newOtp[index] = value;
  //     setOtp(newOtp);
  //   }
  // };
  const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, ""); // Only numbers
    if (value.length > 1) return; // Prevent entering more than 1 digit manually
  
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  
    // ✅ Move to next input automatically
    if (value && index < otp.length - 1) {
      const nextInput = document.querySelectorAll(".otp-box")[index + 1];
      nextInput?.focus();
    }
  
    // ✅ Store full OTP in formData
    setFormData((prev) => ({
      ...prev,
      otp: newOtp.join(""),
    }));
  };
  
  // 🟢 Verify OTP Request
  const verifyOtp = async () => {
    const enteredOtp = otp.join(""); // Combine OTP inputs

    if (enteredOtp.length !== 6) {
      alert("Please enter a 6-digit OTP.");
      return;
    }

    try {
      const response = await api.post("/api/otp/verify", {
        mobileNumber: formData.mobileNumber,
        otp: enteredOtp,
      });

      if (response.status === 200) {
        alert("OTP Verified Successfully!");
        setOtpVerified(true);
      } else {
        alert(response.data.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Error verifying OTP. Try again.");
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
          
    if (!otpVerified) {
      alert("Please verify OTP before proceeding.");
      return;
    }
    if (
      !formData.agencyName ||
      !formData.mobileNumber ||
      !formData.agencyType ||
      !formData.password ||
      !formData.confirmPassword||
      !otp
    ) {
      alert("Please fill all fields before submitting.");
      return;
    }
    const joinedOtp = otp.join(""); // 🔑 Combine OTP digits here
    if (joinedOtp.length !== 6) {
      alert("Invalid OTP.");
      return;
    }
    setLoading(true);
    console.log("Submitting Form Data:", formData);

    try {
      const requestData = {
        agencyName: formData.agencyName,
        mobileNumber: formData.mobileNumber,

        forType:
          formData.agencyType === "CRITICAL"
            ? "Critical"
            : formData.agencyType === "NON CRITICAL"
              ? "Non-Critical"
              : formData.agencyType, // Ensure correct format
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        otp: joinedOtp, // 🔑 Include OTP here
      };

      const response = await api.post("/agencies/register", requestData);

      if (response.status === 201) {
        const agencyId = response.data.agencyId;
        alert(`Agency Registered Successfully!\nYour Agency ID: ${agencyId}`);
        navigate("/agencyLogin"); // Redirect to login page after alert
      } else {
        alert("Registration Failed: " + (response.data?.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error Registering Agency:", error);
      alert(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="main dashboard-hospital">
      <nav className="navbar navbar-expand-lg navbar-white">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold " style={{ color: "#0d6efd" }}>
            BILLIONEYE- AGENCY
          </span>
          <div className="ms-auto">
            <Link to="/agencyLogin">
              <button
                className="btn btn-outline-light me-2"
                style={{ backgroundColor: "#0d6efd" }}
              >
                Login
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
              <img src="/billioneye/images/pag-2-logo-bg.png" alt="Background Left" />
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
                <figure className="logo-con" style={{ marginTop: "18px" }}>

                  <img src="/billioneye/images/logo-blue.png" alt="Logo" style={{ marginTop : "-100px"}} />

                </figure>
              </div>
            </div>
          </div>
        </section>
                 
        {/* Sign-Up Form Section */}
        <section className="sign-up-form dashboard-hospital-sign-up" style={{ marginTop: "-2px" }}>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <form style={{ marginTop: "-250px" }} onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      type="text"
                      style={{ color: "black" }}

                      className="form-control"
                      placeholder="AGENCY NAME"
                      name="agencyName"
                      onChange={handleChange}
                      value={formData.agencyName}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      style={{ color: "black" }}
                      type="tel"
                      className="form-control"
                      placeholder="MOBILE NUMBER"
                      name="mobileNumber"
                      onChange={handleChange}
                      maxLength="10"
                      value={formData.mobileNumber}
                      required
                      disabled={otpVerified}
                    />
                  
                  {!otpVerified && (
               <button type="button" onClick={sendOtp} className="btn btn-primary ms-2">
                {otpSent ? "Resend OTP" : "Send OTP"}
               </button>
            )}
                  </div>
                  {otpSent && !otpVerified && (
            <div className="otp-container d-flex">
              {otp.map((digit, index) => (
                <input
                style={{ color: "black" }}
                  key={index}
                  type="text"
                  maxLength="1"
                  className="otp-box text-center"
                  value={digit}
                  onChange={(e) => handleOtpChange(e, index)}
                />
              ))}
              <button type="button" onClick={verifyOtp} className="btn btn-success ms-2">
                Verify OTP
              </button>
            </div>
          )}

                  <div className="mb-3">

                    <select
                      className="form-control"
                      style={{ color: "black" }}
                      name="agencyType"

                      value={formData.agencyType}
                      onChange={handleChange}
                      required
                    >
                      <option value=""
                        disabled>
                        SELECT AGENCY TYPE
                      </option>
                      {forType.map((type, index) => (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>

                  </div>
                  <div className="mb-3">
                    <input
                      style={{ color: "black" }}
                      type="password"
                      className="form-control"
                      placeholder="PASSWORD"
                      name="password"
                      onChange={handleChange}
                      value={formData.password}
                      required
                    />
                  </div>
                  <div className="mb-3">
                  
                  <input 
                  style={{ color: "black" }}
                  type="password" 
                  name="confirmPassword" 
                  placeholder="CONFIRM PASSWORD" 
                  value={formData.confirmPassword} 
                  onChange={handleChange} required />
                 </div>


                  {/* <Link to={'/dashboard'}> */}
                  <button type="submit" className="btn btn-primary" disabled={loading || !otpVerified}>
                    {loading ? "Registering..." : "Register"}
                  </button>
                  {/* </Link> */}

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

export default AgencyRegister;

