import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function NavBar(props) {
  const { loggedIn, email } = props;
  const navigate = useNavigate();

  const onButtonClick = () => {
    if (loggedIn) {
      localStorage.removeItem("user");
      props.setLoggedIn(false);
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <header
        className="header"
        id="header"
        style={{ fontFamily: "Inter", background: "rgb(255, 255, 255)", height: "auto"}}
      >
        <nav className="nav container">
          <div style={{ display: "inline-flex", adjustContent: "center" }}>
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
          <div className="nav__menu ">
            <ul className="nav__list">
              <li className="nav__item">
                <Link to="/" className="">
                  Home
                </Link>
              </li>
              <li className="nav__item">
                <Link to="/hotels" className="nav__link">
                  Hotels
                </Link>
              </li>
              {loggedIn ? (
                <li className="nav__item">
                  <Link to="/bookings" className="nav__link">
                    My Bookings
                  </Link>
                </li>
              ) : (
                <div />
              )}
            </ul>
          </div>
          {/* Closing tag for <div> element */}
          {loggedIn ? <div>{email}</div> : <div />}
          <div className={"buttonContainer"}>
            <input
              className={"inputButton"}
              type="button"
              onClick={onButtonClick}
              value={loggedIn ? "Log out" : "Sign In / Log in"}
            />
          </div>
        </nav>
      </header>
    </div>
  );
}

export default NavBar;
