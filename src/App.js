import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ScrollUpButton from "./components/ScrollUpButton";
import Book from "./pages/Book";
import Dining from "./pages/Dining";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Hotels from "./pages/Hotels";
import Team from "./pages/Team";
import MapView from "./components/Map";
import "./App.css";
import { useEffect, useState } from "react";

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
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nav" element={<NavBar email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path="/book" element={<Book />} />
          <Route path="/dining" element={<Dining />} />
          <Route
            path="/login"
            element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />}
          />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/team" element={<Team />} />
          <Route path="/map" element={<MapView />} />
        </Routes>
        <ScrollUpButton />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
