import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./Navbar.css";

function NavBar(props) {
  const { loggedIn } = props;
  const navigate = useNavigate();

  const onButtonClick = () => {
    if (loggedIn) {
      localStorage.removeItem("user");
      props.setLoggedIn(false);
      window.location.reload();
    } else {
      navigate("/login");
    }
  };

  const [openNav, setOpenNav] = useState(false);

  const toggleNav = () => {
    setOpenNav(!openNav);
  };

  const navList = () => {
    return (
      <>
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-blue-900" : ""
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/hotels"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-blue-900" : ""
          }
        >
          Hotels
        </NavLink>
        <NavLink
          to="/bookings"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-blue-900" : ""
          }
        >
          Bookings
        </NavLink>
      </>
    );
  };

  const UserButtons = () => {
    return (
      <div className="flex items-center gap-1">
        <Button
          onClick={onButtonClick}
          variant={loggedIn ? "danger" : "primary"}
        >
          {loggedIn ? "Logout" : "Login"}
        </Button>
        {!loggedIn && (
          <Button
            onClick={() => navigate("/register")}
            variant="secondary"
            className="text-white"
          >
            Register
          </Button>
        )}
      </div>
    );
  };

  return (
    <header className=" font-DM header" id="header">
      <div className="container mx-auto py-2 px-4 md:flex md:items-center md:justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <a href="/" className="text-2xl font-semibold text-gray-800">
              <img className="w-10" src="favicon.ico" alt="" />
            </a>
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
          </div>
          <button
            onClick={toggleNav}
            className="block md:hidden border border-gray-600 p-2 rounded text-gray-600 hover:bg-gray-200 focus:outline-none focus:bg-gray-300"
          >
            <svg
              className={`w-6 h-6 ${openNav ? "hidden" : "block"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
            <svg
              className={`w-6 h-6 ${openNav ? "block" : "hidden"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <nav className="hidden md:flex space-x-4">{navList()}</nav>
        <div
          className={`${
            openNav ? "" : "hidden"
          } mt-4  bg-slate-400 flex flex-col gap-4 p-6  rounded `}
        >
          {navList()}
        </div>
        <UserButtons />
      </div>
    </header>
  );
}

export default NavBar;
