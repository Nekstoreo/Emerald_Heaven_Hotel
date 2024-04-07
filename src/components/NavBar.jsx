import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div>
      {/* Navigation Bar */}
      <header
        className="header"
        id="header"
        style={{ fontFamily: "Inter", background: "rgb(255, 255, 255)" }}
      >
        <nav className="nav container">
          <b>
            <Link
              to="/"
              className="nav__logo"
              style={{
                fontFamily: "Product Sans Bold",
                letterSpacing: "-.5px",
                fontSize: "1.5rem",
                textDecoration: "none", // Optionally remove underline
                color: "inherit", // Optionally inherit color from parent
              }}
            >
              {" "}
              Emerald Haven{" "}
            </Link>
          </b>{" "}
          {/* Closing tag for <b> element */}
          <div className="nav__menu" id="nav-menu">
            <ul className="nav__list">
              <li className="nav__item">
                <Link
                  to="/"
                  className="nav__link font-medium leading-6 text-black-600 transition duration-150 ease-out hover:text-gray-600"
                >
                  Home
                </Link>
              </li>
              <li className="nav__item">
                <Link
                  to="/#about"
                  className="nav__link font-medium leading-6 text-black-600 transition duration-150 ease-out hover:text-gray-600"
                >
                  About
                </Link>
              </li>
              <li className="nav__item">
                <Link
                  to="/hotels"
                  className="nav__link font-medium leading-6 text-black-600 transition duration-150 ease-out hover:text-gray-600"
                >
                  Hotels
                </Link>
              </li>
              <li className="nav__item">
                <Link
                  to="/dining"
                  className="nav__link font-medium leading-6 text-black-600 transition duration-150 ease-out hover:text-gray-600"
                >
                  Dining
                </Link>
              </li>
            </ul>
          </div>
          <div className="nav__toggle" id="nav-toggle">
            <i className="bx bx-grid-alt"></i>
          </div>
          <Link
            to="/login"
            className="button button__header focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign in
          </Link>
        </nav>
      </header>
    </div>
  );
}

export default NavBar;
