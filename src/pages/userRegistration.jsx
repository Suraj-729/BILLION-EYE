import "../public/assets/css/Register.css"; 
import React, { useState } from "react";
import api from "../api"; 

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 

    try {
      const payload = {
        fullname: {
          firstname: formData.firstName,
          lastname: formData.lastName
        },
        email: formData.email,
        password: formData.password,
      };

      console.log("Sending request with data:", payload);

      const response = await api.post("/user/register", payload);
      console.log("Response:", response);
      
      console.log("Success response:", response.data);
      setSuccess("Registration successful!");
    } catch (error) {
      window.alert(error)
      console.error("Error:", error.response?.data || error.message);
      setError(error.response.data?.message || "Failed to register. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Register</h2>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName" className="form-label">First Name</label>
            <input 
              id="firstName" 
              type="text" 
              placeholder="Enter your first name" 
              className="form-input" 
              value={formData.firstName} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName" className="form-label">Last Name</label>
            <input 
              id="lastName" 
              type="text" 
              placeholder="Enter your last name" 
              className="form-input" 
              value={formData.lastName} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input 
              id="email" 
              type="email" 
              placeholder="Enter your email" 
              className="form-input" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input 
              id="password" 
              type="password" 
              placeholder="Enter your password" 
              className="form-input" 
              value={formData.password} 
              onChange={handleChange} 
              required 
            />
          </div>
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;