import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ScrollUpButton from "./components/ScrollUpButton";
import BookingCancelled from "./components/BookingCancelled";
import BookingSuccessfull from "./components/BookingSuccessfull";
import RoomBookingPage from "./pages/RoomBookingPage";
import Bookings from "./pages/Bookings";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Hotels from "./pages/Hotels";
import Team from "./pages/Team";
import MapView from "./components/Map";
import AdminLogin from "./pages/AdminLogin";
import CheckAvailability from "./pages/CheckAvailability";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Fetch the user email and token from local storage
    const user = JSON.parse(localStorage.getItem("user"));

    // If the token/email does not exist, mark the user as logged out
    if (!user || !user.token) {
      setLoggedIn(false);
      return;
    }

    // If the token exists, verify it with the auth server to see if it is valid
    fetch("http://localhost:3080/verify", {
      method: "POST",
      headers: {
        "jwt-token": user.token,
      },
    })
      .then((r) => r.json())
      .then((r) => {
        setLoggedIn("success" === r.message);
        setEmail(user.email || "");
      });
  }, []);

  return (
    <div className="App">
      <Router>
        <NavBar email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />}
          />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/team" element={<Team />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/roombooking" element={<RoomBookingPage email={email} />} />
          <Route path="/bookings" element={<Bookings email={email} />} />
          <Route path="/bookingcancelled" element={<BookingCancelled />} />
          <Route path="/bookingsuccessfull" element={<BookingSuccessfull />} />
          <Route path="/errorbooking" element={<Error />} />
          <Route path="/check-availability" element={<CheckAvailability />} />
        </Routes>
        <ScrollUpButton />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
