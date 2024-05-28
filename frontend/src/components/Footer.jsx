import React from "react";

function Footer() {
  return (
    <div>
      {/*Footer Section*/}
      <div className="footer-dark" style={{ fontFamily: "Inter" }}>
        <footer>
          <div className="bscontainer">
            <div className="bsrow">
              <div className="bscol-md-2 item">
                <h3>Pages</h3>
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <a href="/hotels">Hotels</a>
                  </li>
                  <li>
                    <a href="/login">Login</a>
                  </li>
                  <li>
                    <a href="/roombooking">Book Hotel</a>
                  </li>
                </ul>
              </div>
              <div className="bscol-md-2 item">
                <h3>Know More</h3>
                <ul>
                  <li>
                    <a href="/team">Our Team</a>
                  </li>
                </ul>
              </div>
              <div className="bscol-md-2 item">
                <h3>Other Details</h3>
                <ul>
                  <li>
                    <a href="/privacy-policy">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="/terms-of-service">Terms of Service</a>
                  </li>
                </ul>
              </div>
              <div className="bscol-md-6 item text">
                <h3>Emerald Haven</h3>
                <p>
                  Over the last 25 years, Emerald Haven organisation has been
                  known for dependably providing the best Colombian hospitality
                  experience with more than 50 hotels and resorts worldwide.
                </p>
              </div>
            </div>
            <p className="copyright">Emerald Haven © 2021</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Footer;
