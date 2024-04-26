import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Navbar, Container, Nav } from "react-bootstrap";

function NavBar(props) {
  const { loggedIn } = props;
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
        style={{
          fontFamily: "Inter",
          background: "rgb(255, 255, 255)",
          height: "auto",
        }}
      >
        <nav className="nav container">
          <div style={{ display: "inline-flex", adjustContent: "center" }}>
            <img src="favicon-32x32.png" alt="Emerald Haven" />
            <b>
              <Link
                to="/"
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
              </Link>
            </b>
          </div>
          <div className="nav__menu ">
          <Navbar expand="lg" className="bg-body-tertiary">
              <Container>
                <Nav className="me-auto">
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="/hotels">Hotels</Nav.Link>
                  <Nav.Link href="/bookings">Bookings</Nav.Link>
                </Nav>
              </Container>
            </Navbar>
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
