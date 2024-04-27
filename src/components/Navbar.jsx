import React from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";

function NavBar(props) {
  const { loggedIn } = props;
  const navigate = useNavigate();

  const onButtonClick = () => {
    if (loggedIn) {
      localStorage.removeItem("user");
      props.setLoggedIn(false);
      // Refresh the page to reflect the changes
      window.location.reload();
    } else {
      navigate("/login");
    }
  };

  return (
    <div
    style={{
      fontFamily: "Product Sans",
      letterSpacing: "-.5px",
      color: "inherit",
     }}
    >
      <header
        className="header"
        id="header"
        style={{
          fontFamily: "Inter",
          background: "rgb(255, 255, 255)",
          height: "auto",
        }}
      >
        <nav className="nav container">
          <div style={{ display: "inline-flex", adjustContent: "center" }}>
            <img src="favicon-32x32.png" alt="" />
            <b>
              <NavLink
                to="/"
                className={"nav__logo"}
                style={{
                  fontFamily: "Product Sans Bold",
                  letterSpacing: "-.5px",
                  fontSize: "1.5rem",
                  textDecoration: "none",
                  color: "inherit",
                  marginLeft: "5px", // Espacio entre el favicon y la etiqueta
                }}
              >
                Emerald Haven
              </NavLink>
            </b>
          </div>
          <div
         className={"nav__menu"}
         id="nav-menu"
       >
         <ul className="nav__list">
           <li className="nav__item">
             <NavLink to="/" className="nav__link">
               Home
             </NavLink>
           </li>
           <li className="nav__item">
             <NavLink to="/hotels" className="nav__link">
                Hotels
             </NavLink>
           </li>
           <li className="nav__item">
             <NavLink
               to="/bookings"
               className="nav__link"
             >
                Bookings
             </NavLink>
           </li>
         </ul>
       </div>
          <div className={"buttonContainer"}>
            <Button variant="outline-primary" onClick={onButtonClick}>
              {loggedIn ? "Log out" : "Log in"}
            </Button>
            {!loggedIn ? (
              <Button variant="primary" onClick={() => navigate("/signup")}>
                Sign up
              </Button>
            ) : (
              <div />
            )}
          </div>
        </nav>
      </header>
    </div>
  );
}

export default NavBar;
