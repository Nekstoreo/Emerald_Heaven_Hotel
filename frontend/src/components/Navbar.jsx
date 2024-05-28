import React, {useState, useEffect} from "react";
import {useNavigate, NavLink} from "react-router-dom";
import {Button} from "react-bootstrap";

export default function NavBar(props) {
    const {loggedIn} = props;
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [isOpen, setIsOpen] = useState(false); // Estado para el menú desplegable

    useEffect(() => {
        const profile = JSON.parse(localStorage.getItem("profile"));
        if (profile && profile.email) {
            setEmail(profile.email.split("@")[0]);
        } else console.log("No email found");
    }, []);

    async function handleLogout() {
        if (loggedIn) {
            localStorage.removeItem("jwt-token");
            localStorage.removeItem("profile");
            props.setLoggedIn(false);
            window.location.reload();
        } else {
            navigate("/login");
        }
    }

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (<nav className="bg-white text-gray-900">
        <div className="max-w-7xl mx-auto px-4 min-h-10 max-h-10 ">
            <div className="flex items-center justify-between h-16">
                <div className="flex justify-start items-center">
                    <NavLink
                        to="/"
                        className="nav__logo ml-2 text-2xl font-semibold text-gray-900"
                        style={{
                            fontFamily: "Product Sans Bold",
                            letterSpacing: "-.5px",
                            textDecoration: "none",
                            color: "inherit",
                        }}
                    >
                        <a href="/" className="">
                            <img className="h-10" src={"banner.png"} alt=""/>
                        </a>
                    </NavLink>
                </div>
                <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4 text-2xl">
                        <NavLink
                            to="/"
                            className={({isActive}) => isActive ? "text-blue-500 px-3 py-2 rounded-md text-xl font-medium " : "text-gray-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-xl font-medium"}
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/hotels"
                            className={({isActive}) => isActive ? "text-blue-500 px-3 py-2 rounded-md text-xl font-medium" : "text-gray-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-xl font-medium"}
                        >
                            Hotels
                        </NavLink>
                        <NavLink
                            to="/bookings"
                            className={({isActive}) => isActive ? "text-blue-500 px-3 py-2 rounded-md text-xl font-medium" : "text-gray-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-xl font-medium"}
                        >
                            Bookings
                        </NavLink>
                    </div>
                </div>
                <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                        {loggedIn ? (
                            <>
                                <span className="mr-4">Welcome, {email}</span>
                                <Button onClick={handleLogout}>Logout</Button>
                            </>
                        ) : (
                            <>
                                <Button
                                className="mr-4"
                                    onClick={() => navigate("/login")}>Login</Button>
                                <Button
                                    className="mr-4 text-white bg-blue-950"
                                    onClick={() => navigate("/register")}>Register</Button>
                            </>
                        )}
                    </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                    <button
                        onClick={toggleMenu}
                        type="button"
                        className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        aria-controls="mobile-menu"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        {isOpen ? (<svg
                            className="block h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>) : (<svg
                            className="block h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>)}
                    </button>
                </div>
            </div>
        </div>

        <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <NavLink
                    to="/"
                    className={({isActive}) => isActive ? "text-blue-500 block px-3 py-2 rounded-md text-base font-medium" : "text-gray-600 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"}
                >
                    Home
                </NavLink>
                <NavLink
                    to="/hotels"
                    className={({isActive}) => isActive ? "text-blue-500 block px-3 py-2 rounded-md text-base font-medium" : "text-gray-600 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"}
                >
                    Hotels
                </NavLink>
                <NavLink
                    to="/bookings"
                    className={({isActive}) => isActive ? "text-blue-500 block px-3 py-2 rounded-md text-base font-medium" : "text-gray-600 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"}
                >
                    Bookings
                </NavLink>
                {loggedIn ? (
                    <>
              <span className="block px-3 py-2 rounded-md text-base font-medium text-gray-400">
                Welcome, {email}
              </span>
                        <Button
                            onClick={handleLogout}
                            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-700 hover:text-white"
                        >
                            Logout
                        </Button>
                    </>
                ) : (
                    <>
                        <Button
                            onClick={() => navigate("/login")}
                            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium  hover:bg-gray-700 hover:text-white"
                        >
                            Login
                        </Button>
                        <Button
                            onClick={() => navigate("/register")}
                            className="block w-full text-left px-3 py-2 rounded-md text-base bg-blue-950 font-medium hover:bg-gray-700 hover:text-white"
                        >
                            Register
                        </Button>
                    </>
                )}
            </div>
        </div>
    </nav>);
}
