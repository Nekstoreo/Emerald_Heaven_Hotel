import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import BookingConfirmation from "./components/BookingConfirmation";
import BookingCancelled from "./components/BookingCancelled";
import BookingSuccessful from "./components/BookingSuccessful";
import Bookings from "./pages/Bookings";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Hotels from "./pages/Hotels";
import Team from "./pages/Team";
import MapView from "./components/Map";
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
    fetch("http://localhost:5000/verify", {
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
          <Route
            path="/register"
            element={<Register setLoggedIn={setLoggedIn} setEmail={setEmail} />}
          />
          <Route path="/hotels" element={<Hotels />} loggedIn={loggedIn} />
          <Route path="/team" element={<Team />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/bookings" element={<Bookings email={email} />} />
          <Route path="/bookingconfirmation" element={<BookingConfirmation />} />
          <Route path="/bookingcancelled" element={<BookingCancelled />} />
          <Route path="/bookingsuccessful" element={<BookingSuccessful />} />
          <Route path="/check-availability" element={<CheckAvailability />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
