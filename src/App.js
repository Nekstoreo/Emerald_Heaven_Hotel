import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import ScrollUpButton from './components/ScrollUpButton';
import Book from './pages/Book';
import Dining from './pages/Dining';
import Home from './pages/Home';
import Login from './pages/Login';
import Hotels from './pages/Hotels';
import Team from './pages/Team';
import './App.css';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<Book />} />
        <Route path="/dining" element={<Dining />} />
        <Route path="/login" element={<Login />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/team" element={<Team />} />
      </Routes>
      <ScrollUpButton />
      <Footer />
    </Router>
  );
}

export default App;
