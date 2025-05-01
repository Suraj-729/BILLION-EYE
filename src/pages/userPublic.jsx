import CryptoJS from "crypto-js";

import React, { useState, useRef } from "react";
import "../public/assets/css/userLogin.css";
import { Link, useNavigate } from "react-router-dom";
import api from "../api"; // Assuming your API client is configured properly


const SECRET_KEY = "PM"; 
const PublicRegister = () => {
  const [formData, setFormData] = useState({
    phone: "",
    otp: ["", "", "", "", "", ""], 
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();
  const otpInputRefs = useRef([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(/^\d*$/.test(value)){
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  };


  const handleOtpChange = (index, value) => {
    const newOtp = [...formData.otp];
    newOtp[index] = value;
    setFormData({ ...formData, otp: newOtp });

    if (value && index < 5) {
      otpInputRefs.current[index + 1].focus();
    }

    if (newOtp.every((digit) => digit !== "")) {
      verifyOtp(newOtp.join(""));
    }
  };
// otp send block
  const sendOtp = async () => {
    try {
      const response = await api.post("/api/otp/send", { mobileNumber: formData.phone });
      if (response.status === 200) {
        const otp=response.data.otp;


          // 🔐 Encrypt the OTP before storing it
      const encryptedOtp = CryptoJS.AES.encrypt(otp, SECRET_KEY).toString();
      sessionStorage.setItem("encryptedOtp", encryptedOtp);

        setOtpSent(true);
        setSuccess("OTP sent successfully!");
         

            // Show OTP in alert
        alert(`Your OTP is: ${otp}`);

        // Auto-fill OTP in input fields
        setFormData((prev) => ({
          ...prev,
          otp: otp.split(""),
      }));
      } else {
        setError("Failed to send OTP.");
      }

    } catch (error) {
      console.error("Error sending OTP:", error.response?.data || error.message);
      setError("Failed to send OTP. Please try again.");
    }
    
  };
// otp verify block
  const verifyOtp = async () => {
    setIsVerifying(true);
    setError("");
    setSuccess("");
  
    try {
      const enteredOtp = formData.otp.join(""); // Convert array to string
      const encryptedOtp = sessionStorage.getItem("encryptedOtp");
  
      if (!encryptedOtp) {
        setError("OTP expired or not found. Please resend OTP.");
        return;
      }
  
      // 🔓 Decrypt OTP
      const decryptedBytes = CryptoJS.AES.decrypt(encryptedOtp, SECRET_KEY);
      const storedOtp = decryptedBytes.toString(CryptoJS.enc.Utf8);
  
      if (enteredOtp !== storedOtp) {
        setError("Invalid OTP. Please try again.");
        return;
      }
  
      // OTP is correct, now verify with the backend
      const response = await api.post("/api/otp/verify", {
        mobileNumber: formData.phone,
        otp: enteredOtp,
      });
  
      if (response.status === 200) {
        setSuccess("OTP verified successfully!");
       localStorage.setItem("isVerified", "true");
       localStorage.setItem("token", response.data.token);
        sessionStorage.removeItem("encryptedOtp"); // Remove OTP after use
        
        navigate("/dashboard");
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error.response?.data || error.message);
      setError("OTP verification failed. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };
  

  return (
    <section className="main sign-up">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold text-white">BILLIONEYE</span>
          <div className="ms-auto">
            {/* <Link to={"/dashboard"}>
              <button className="btn btn-outline-light me-2">Dashboard</button>
            </Link> */}
          </div>
        </div>
      </nav>
      <div className="pag-1-wrapper">
        <section className="pag-2-wrapper-sec-1">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <figure className="logo-con">
                  <Link to="/">
                    <img src="./billioneye/images/logo.png" alt="Logo" />
                  </Link>
                </figure>
              </div>
            </div>
          </div>
        </section>

        <section className="sign-up-form">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="mb-3">
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      pattern="[0-9]*"
                      maxLength="10"
                      required
                    />
                  </div>

                  {!otpSent ? (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={sendOtp}
                      disabled={formData.phone.length !== 10}
                    >
                      Send OTP
                    </button>
                  ) : (
                    <>
                    <div className="mb-3 otp-container">
                        {formData.otp.map((digit, index) => (
                          <input
                            key={index}
                            type="text"
                            className="form-control otp-input"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            ref={(el) => (otpInputRefs.current[index] = el)}
                            required
                          />
                        ))}
                      </div>

                      {/* ✅ Change 3: Show Verify & Next button only when OTP is fully entered */}
                      {formData.otp.every((digit) => digit !== "") && (
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={()=>verifyOtp()}
                        >
                          Verify & Next
                        </button>
                      )}
                    </>
                  )}


                  {isVerifying && <p>Verifying OTP...</p>}
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default PublicRegister;
