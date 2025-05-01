import React , {useState , useEffect }from "react";
import api from "../api";
import "../public/assets/css/OngoingTax.css";

const OngoingTax = () => {
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("backend/user/billioneye/images/latest");

        if (Array.isArray(response.data)) {
          if (response.data.length > 0) {
            setReportData(response.data[0]); // Use first object if it's an array
          } else {
            console.warn("Response is an empty array.");
          }
        } else if (
          typeof response.data === "object" &&
          response.data !== null
        ) {
          setReportData(response.data); // Set directly if it's an object
        } else {
          console.warn("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching report data:", error);
      }
    };

    fetchData();
  }, []);

  // Only format date & time if reportData is available
  const formattedDate = reportData?.timestamp
    ? new Date(reportData.timestamp).toLocaleDateString()
    : "N/A";

  const formattedTime = reportData?.timestamp
    ? new Date(reportData.timestamp).toLocaleTimeString()
    : "N/A";

  if (!reportData) {
    return <p>Loading report data...</p>;
  }

  return (
    <section className="main dashboard-main">
      <header>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="top-1">
                <div className="logo">
                  <a href="index.html">
                    <img
                      src="./billioneye/images/logo-small.png"
                      alt="Logo"
                      title=""
                    />
                  </a>
                </div>
                <div className="menu-con">
                  <nav id="navigation1" className="navigation">
                    <div className="nav-header">
                      <div className="nav-toggle"></div>
                    </div>
                    {/* <div className="nav-menus-wrapper">
                      <ul className="navbar-nav">
                        <li className="nav-item active">
                          <a href="index.html">HOME</a>
                        </li>
                        <li className="nav-item">
                          <a href="onboarding_ground_staff.html">
                            Onboarding ground staff
                          </a>
                        </li>
                      </ul>
                    </div> */}
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <section className="page-heading" style={{marginTop: "-24px"}}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h3>Ongoing Task</h3>
            </div>
          </div>
        </div>
      </section>
      <section className="dashboard-map">
        <iframe
          src="https://www.google.com/maps/embed?..."
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Maps Location"
        ></iframe>
      </section>
      <section className="dashboard-table-con ongoing_task_details">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="table-card">
                <div className="row">
                  <div className="col-md-3 col-4" style={{marginLeft:"14px"}}>
                    <figure>
                      <img src={reportData.imageUrl} alt="" className="w-100" />
                    </figure>
                  </div>
                  <div className="col-md-9 col-8">
                    <h6>{reportData.ObjDesc}</h6>
                    <div>
                      <i className="fa-solid fa-calendar-days"></i> {formattedDate}
                      <br /> <i className="fa-regular fa-clock"></i> {formattedTime}
                    </div>
                    <p>{reportData.ObjDesc}</p>
                  </div>
                  <div className="col-md-12">
                    <button type="submit" className="btn btn-primary">
                      <a href={'/'}>Capture</a>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <img src="./billioneye/images/footer-bg.png" alt="" />
      </footer>
    </section>
  );
};

export default OngoingTax;
