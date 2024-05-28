import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import ReservationConfirmation from "./pages/ReservationConfirmation";
import BookingCancelled from "./pages/BookingCancelled";
import ReservationSuccessful from "./pages/ReservationSuccessful";
import Bookings from "./pages/Bookings";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Hotels from "./pages/Hotels";
import Team from "./pages/Team";
import MapView from "./components/Map";
import HotelInfoAvailability from "./pages/HotelInfoAvailability";
import "./App.css";


function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const token = localStorage.getItem("jwt-token");
    useEffect(() => {
        if (token) {
            verifyToken().then(r => r);
        } else console.log("No token found");
    }, [loggedIn]);

    async function verifyToken() {
        try {
            const response = await fetch("http://localhost:5000/verify", {
                method: "POST", headers: {
                    "Content-Type": "application/json", "jwt-token": token,
                },
            });
            const data = await response.json();
            if (data.message === "success") {
                console.log("Token verified");
                setLoggedIn(true);
            }
        } catch (error) {
            console.error("Error verifying token:", error);
        }
    }


    return (<div className="App">
        <Router>
            <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route
                    path="/login"
                    element={<Login setLoggedIn={setLoggedIn}/>}
                />
                <Route
                    path="/register"
                    element={<Register setLoggedIn={setLoggedIn}/>}
                />
                <Route path="/hotels" element={<Hotels/>} loggedIn={loggedIn}/>
                <Route path="/team" element={<Team/>}/>
                <Route path="/map" element={<MapView/>}/>
                <Route path="/bookings" element={<Bookings/>}/>
                <Route path="/reservationconfirmation" element={<ReservationConfirmation/>}/>
                <Route path="/reservationcancelled" element={<BookingCancelled/>}/>
                <Route path="/bookingsuccessful" element={<ReservationSuccessful/>}/>
                <Route path="/check-availability" element={<HotelInfoAvailability/>}/>
            </Routes>
            <Footer/>
        </Router>
    </div>);
}

export default App;
