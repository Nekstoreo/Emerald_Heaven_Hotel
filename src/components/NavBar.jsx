import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <header
        className="header"
        id="header"
        style={{ fontFamily: "Inter", background: "rgb(255, 255, 255)" }}
      >
        <nav className="nav container" style={{ width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
      <img src="favicon-32x32.png" alt="Emerald Haven" />
      <b>
        <Link
          to="/"
          className="nav__logo"
          style={{
            fontFamily: "Product Sans Bold",
            letterSpacing: "-.5px",
            fontSize: "1.5rem",
            textDecoration: "none",
            color: "inherit",
            marginLeft: "5px", // Espacio entre el favicon y la etiqueta
          }}
        >
          {" "}
          Emerald Haven{" "}
        </Link>
      </b>
    </div>
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
          {/* Closing tag for <div> element */}
          <div className="nav__btns">
            <Link
              to="/login"
              className="button button--flex button--link font-medium leading-6 text-black-600 transition duration-150 ease-out hover:text-gray-600"
            >
              Log in
              <i className="bx bx-log-in button__icon"></i>
            </Link>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default NavBar;
