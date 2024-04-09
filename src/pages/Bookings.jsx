import React, { useState, useEffect } from 'react';
import styles from './Bookings.module.css';

function Bookings({ email }) {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBookings() {
      if (!email) return;

      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:3008/roombooking?email=${email}`);
        if (!response.ok) throw new Error('Failed to fetch bookings');

        const data = await response.json();
        setBookings(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBookings();
  }, [email]);

  if (!email) return <div className={styles.message}>Please provide an email.</div>;
  if (isLoading) return <div className={styles.message}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles['bookingsContainer']}>
      <h2>Your Bookings</h2>
      {bookings.length === 0 ? (
        <div className={styles.message}>No bookings found.</div>
      ) : (
        <ul className={styles["bookingsList"]}>
          {bookings.map((booking, index) => (
            <li key={index} className={styles["bookingItem"]}>
              <p>Name: {booking.Name}</p>
              <p>Check In Date: {booking.checkInDate}</p>
              <p>Check Out Date: {booking.checkOutDate}</p>
              <p>Number of People: {booking.noOfPeople}</p>
              <p>Type of Room: {booking.typeOfRoom}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Bookings;
