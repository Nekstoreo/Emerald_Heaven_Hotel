import React, { useState, useEffect } from "react";
import styles from "./Bookings.module.css";
import { jwtDecode } from "jwt-decode";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBookings(email) {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000/roombooking?email=${email}`
        );
        if (!response.ok) throw new Error("Failed to fetch bookings");

        const data = await response.json();
        setBookings(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    async function verifyTokenAndFetchBookings() {
      const userToken = JSON.parse(localStorage.getItem("user"))?.token;

      if (!userToken) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "jwt-token": userToken,
          },
        });
        if (!response.ok) throw new Error("Failed to verify token");

        const decodedToken = jwtDecode(userToken);
        const userEmail = decodedToken.email;
        await fetchBookings(userEmail);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    }

    verifyTokenAndFetchBookings();
  }, []);

  if (isLoading) return <div className={styles.message}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;
  return (
    <div className={styles.bookingsContainer}>
      <h2
       style={{
        fontFamily: "Product Sans Bold",
        letterSpacing: "-.5px",
        fontSize: "1.5rem",
        textDecoration: "none",
        color: "inherit",
       }
      }
      >Your Bookings</h2>
      {bookings.length === 0 ? (
        <div className={styles.message}>No bookings found.</div>
      ) : (
        <div className={styles.bookingsGrid}>
          {bookings.map((booking, index) => (
            <div key={index} className={styles.bookingItem}>
              <p className="bookingFields">Name: {booking.Name}</p>
              <p className="bookingFields">Check In Date: {booking.checkInDate}</p>
              <p className="bookingFields">Check Out Date: {booking.checkOutDate}</p>
              <p className="bookingFields">Number of People: {booking.noOfPeople}</p>
              <p className="bookingFields">Hotel Name: {booking.hotelName}</p>
              <p className="bookingFields">Type of Room: {booking.typeOfRoom}</p>
              <p className="bookingFields">Price Per Night: {booking.pricePerNight}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Bookings;
