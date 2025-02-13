import React from "react";
import { useLocation} from "react-router-dom";
import "../public/assets/css/IncidentReport.css"; // External CSS for styling

const ReportPage = () => {
//   const navigate = useNavigate();
  const location = useLocation();
  const { incidentId, latitude, longitude, imageUrl } = location.state || {};

  const handleSubmit = () => {
    alert("Report submitted successfully!");
   // Navigate after submission
  };

  return (
    <div className="report-container">
      <h2>Incident Report</h2>

      {imageUrl && (
        <div className="image-preview">
          <img src={''} alt="Captured" />
        </div>
      )}

      <div className="report-details">
        <p><strong>Incident ID:</strong> {incidentId || "N/A"}</p>
        <p><strong>Latitude:</strong> {latitude || "N/A"}</p>
        <p><strong>Longitude:</strong> {longitude || "N/A"}</p>
      </div>

      <button onClick={handleSubmit} className="submit-btn">Submit Report</button>
    </div>
  );
};

export default ReportPage;
