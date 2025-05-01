import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../public/assets/css/AgencyLogin.css";

const ForgotPassword = () => {
  const [agencyId, setAgencyId] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const sendOtp = async (e) => {
    e.preventDefault();

    if (!agencyId.trim() || !mobileNumber.trim()) {
      alert("Please fill in both Agency ID and Mobile Number.");
      return;
    }

    try {
      const res = await api.post("backend/agencies/requestOtpAgency", {
        agencyId: agencyId.trim(),
        mobileNumber: mobileNumber.trim(),
      });
      console.log("OTP sent:", res.data);
      if (res.status === 200) {
        alert(`OTP sent to your registered mobile number: ${res.data.otp}`);
        setGeneratedOtp(res.data.otp);
        setOtp(res.data.otp); // Auto fill for demo purpose
        setIsOtpSent(true);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send OTP");
    }
  };

  const verifyOtp = () => {
    if (otp === generatedOtp) {
      alert("OTP Verified!");
      setIsOtpVerified(true);
    } else {
      alert("Invalid OTP!");
    }
  };

  const resetPassword = async () => {
    try {
      if (password !== confirmPassword) {
        console.warn("Passwords do not match");
        return;
      }
  
      const res = await api.post("backend/agencies/reset-password", {
        agencyId,
        newPassword: password,
      });
  
      if (res.data.success) {
        console.log(res.data.message);
        navigate("/agencyLogin");
      } else {
        console.error(res.data.message);
      }
    } catch (err) {
      console.error("Reset password error:", err);
      console.error("Server error while resetting password");
    }
  };
  
  
  
  

  return (
    <section className="main dashboard-hospital">
      {/* Top Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold" style={{ color: "#0d6efd" }}>
            BILLIONEYE - AGENCY
          </span>
        </div>
      </nav>

      <div className="pag-1-wrapper">
        <section className="sign-up-form dashboard-hospital-sign-up">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                {!isOtpSent && (
                  <form onSubmit={sendOtp} style={{ marginTop: "-150px" }}>
                    <h5 className="mb-4 fw-bold">Forgot Password</h5>
                    <input
                      style={{ color: "black" }}
                      type="text"
                      className="form-control mb-3"
                      placeholder="Agency ID"
                      value={agencyId}
                      onChange={(e) => setAgencyId(e.target.value)}
                      required
                    />
                    <input
                      style={{ color: "black" }}
                      type="text"
                      className="form-control mb-3"
                      placeholder="Registered Mobile Number"
                      value={mobileNumber}
                      maxLength="10"
                      onChange={(e) => {
                        const input = e.target.value;
                        // Allow only digits
                        if (/^\d{0,10}$/.test(input)) {
                          setMobileNumber(input);
                        }
                      }}
                      required
                    />
                    <button className="btn btn-primary">Send OTP</button>
                  </form>
                )}

                {isOtpSent && !isOtpVerified && (
                  <>
                    <h5 className="mt-5">Verify OTP</h5>
                    <input
                      style={{ color: "black" }}
                      type="text"
                      className="form-control mb-3"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                    <button className="btn btn-success" onClick={verifyOtp}>
                      Verify OTP
                    </button>
                  </>
                )}

                {isOtpVerified && (
                  
                  <form onSubmit={(e) => { e.preventDefault(); resetPassword(); }}>
                    <h5 className="mt-5">Reset Password</h5>
                    <input
                      style={{ color: "black" }}
                      type="password"
                      className="form-control mb-3"
                      placeholder="New Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                      style={{ color: "black" }}
                      type="password"
                      className="form-control mb-3"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button className="btn btn-warning" onClick={resetPassword}>
                      Set New Password
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer style={{ marginTop: "-50px" }}>
        <img src="./billioneye/images/footer-bg.png" alt="Footer" />
      </footer>
    </section>
  );
};

export default ForgotPassword;
