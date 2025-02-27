import React , {useState , useEffect , useRef}from "react";
import "../public/assets/css/GroundStaff.css";
// Assuming you have a separate CSS file

const tasks = [
  {
    id: "01",
    type: "Car Accident",
    timestamp: "12th/Jan/2025 12:24:04",
    location: "Khandagiri",
    image: "./images/accident-1.png",
  },
  {
    id: "02",
    type: "Car Accident",
    timestamp: "12th/Jan/2025 12:24:04",
    location: "Khandagiri",
    image: "./images/accident-2.png",
  },
  {
    id: "03",
    type: "Car Accident",
    timestamp: "12th/Jan/2025 12:24:04",
    location: "Khandagiri",
    image: "./images/accident-3.png",
  },
];

const GroundStaffTax = () => {

  const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    // Toggle menu visibility
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
  return (
    <section className="main dashboard-main">
      <section className="dashboard-main-page-wrapper">
        <header>
          <div className="container">
            <div className="row">
            <div className="navbar">
            <a href="#">Gmail</a>
            <a href="#">Images</a>
            <div className="menu-icon" onClick={toggleMenu}>
                <img src="menu-icon.png" alt="Menu" width="30" />
            </div>

            {/* Apps Menu */}
            {isOpen && (
                <div className="apps-menu" ref={menuRef}>
                    <div className="menu-grid">
                        <div className="menu-item">
                            <img src="profile.png" alt="Account" />
                            <p>Account</p>
                        </div>
                        <div className="menu-item">
                            <img src="google.png" alt="Search" />
                            <p>Search</p>
                        </div>
                        <div className="menu-item">
                            <img src="youtube.png" alt="YouTube" />
                            <p>YouTube</p>
                        </div>
                        <div className="menu-item">
                            <img src="maps.png" alt="Maps" />
                            <p>Maps</p>
                        </div>
                        <div className="menu-item">
                            <img src="gmail.png" alt="Gmail" />
                            <p>Gmail</p>
                        </div>
                        <div className="menu-item">
                            <img src="drive.png" alt="Drive" />
                            <p>Drive</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
              <div className="col-md-12">
                <div className="top-1">
                  <div className="logo">
                    <a href="index.html">
                      <img
                        src="./images/logo-small.png"
                        alt="Logo"
                        title="Logo"
                      />
                    </a>
                  </div>
                  <div className="menu-con">
                    <nav id="navigation1" className="navigation">
                      <div className="nav-header">
                        <div className="nav-toggle"></div>
                      </div>
                      <div className="nav-menus-wrapper">
                        <ul className="navbar-nav">
                          <li className="nav-item active">
                            <a href="ground-staff-login.html">HOME</a>
                          </li>
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
                <h3>Assigned Task</h3>
              </div>
            </div>
          </div>
        </section>

        <section className="assigned-task-event-con">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="table-card">
                  <div className="table-responsive" style={{color:"red"}}>
                    <table className="table">
                      <thead >
                        <tr>
                          <th>Event</th>
                          <th>Type</th>
                          <th>Timestamp</th>
                          <th>Location</th>
                          <th>Image</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tasks.map((task) => (
                          <tr key={task.id}>
                            <td>
                              <a href="ongoing-task.html">{task.id}</a>
                            </td>
                            <td>
                              <a href="ongoing-task.html">{task.type}</a>
                            </td>
                            <td>
                              <a href="ongoing-task.html">
                                <i
                                  className="bi bi-calendar"
                                  style={{ marginRight: "5px" }}
                                ></i>{" "}
                                12th/Jan/2025
                                <br />
                                <i
                                  className="bi bi-clock"
                                  style={{ marginRight: "5px" }}
                                ></i>{" "}
                                12:24:04
                              </a>
                            </td>
                            <td>
                              <a href="ongoing-task.html">{task.location}</a>
                            </td>
                            <td>
                              <a href="ongoing-task.html">
                                <img
                                  src={task.image}
                                  alt={task.type}
                                  title={task.type}
                                />
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>

      <footer>
        <img src="./images/footer-bg.png" alt="Footer" />
      </footer>
    </section>
  );
};

export default GroundStaffTax;
