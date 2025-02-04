import React from "react";
import { Link } from 'react-router-dom';
import "../../src/public/assets/css/BillionEye.css";

const BillionEye = () => {
  return (
    
    <section
  className="bg-cover main home-page"
  style={{ backgroundImage: 'url(/images/bg-1.png)' }}
>
  
  <div className="pag-1-wrapper">

<Link to='/register'>
    <section className="pag-1-wrapper-sec-1">
      <figure>
        <img src="/images/pag-1-logo-bg.png" alt="" />
      </figure>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <figure className="logo-con">
              <a href="signup.html">
                <img src="/images/logo.png" alt="Logo" />
              </a>
            </figure>
          </div>
        </div>
      </div>
    </section>
    <section className="pag-1-wrapper-sec-2">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="pag-1-wrapper-sec-2-wrapper text-center">
              <h4>
                <p>
                  Your voice, Your Impact direct to the Government.
                </p>
              </h4>
              <div className="footer-logo-1">
                <ul>
                  <li>
                    <img
                      src="/images/odisha-logo-white.png"
                      alt="Odisha"
                      title="Odisha"
                    />
                  </li>
                  <li>
                    <img
                      src="/images/nic-logo.png"
                      alt="NIC"
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

</Link>
  </div>
  {/* <footer>
    <img src="./images/footer-bg.png" alt="" />
  </footer> */}
</section>

  );
}

export default BillionEye;
