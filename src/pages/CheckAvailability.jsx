import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./CheckAvailability.module.css";

function CheckAvailability() {
  const [guests, setGuests] = useState(1);
  const [priceData, setPriceData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  let [reservationData, setReservationData] = useState(null);

  const fetchAvailabilityData = async () => {
    try {
      const hotelName = location.state.hotelName
        .toLowerCase()
        .replace(/\s+/g, "%20");

      const response = await fetch(
        `http://localhost:5000/hotels/${hotelName}/rooms`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch availability data");
      }
      const availabilityData = await response.json();
      const priceData = availabilityData.map((room, index) => ({
        id: index + 1,
        type: room.type,
        price: room.price.replace(/[^0-9.]/g, ""),
        maxGuests: room.maxguests,
        available: room.availablecount,
      }));
      setPriceData(priceData);
    } catch (error) {
      console.error("Error fetching availability data:", error);
    }
  };

  useEffect(() => {
    fetchAvailabilityData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const calculateRequiredRooms = (guests) => {
    const maxGuestsPerRoom = Math.max(
      ...priceData.map((room) => room.maxGuests)
    );
    const requiredRooms = Math.ceil(guests / maxGuestsPerRoom);
    return requiredRooms;
  };

  const calculatePrices = () => {
    const requiredRooms = calculateRequiredRooms(guests);
    const newData = priceData.map((room) => {
      // Ensure originalPrice is set only once and used for calculations
      if (!room.originalPrice) {
        room.originalPrice = String(room.price).replace(/[^0-9]/g, "");
      }
      const price = guests * room.originalPrice * requiredRooms;
      return { ...room, price };
    });

    setPriceData(newData);
  };

  useEffect(() => {
    calculatePrices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guests]);

  const handleRoomSelection = async (roomId) => {
    const requiredRooms = calculateRequiredRooms(guests);
    const selectedRoom = priceData.find((room) => room.id === roomId);
    const hotelName = location.state.hotelName;
    if (hotelName) {
      setReservationData({
        hotelName,
        roomType: selectedRoom.type,
        guests,
        requiredRooms,
        totalPrice: selectedRoom.price * requiredRooms,
      });
      navigate("/bookingconfirmation", { state: { reservationData } });
    } else {
      alert("Hotel name not found");
      return;
    }
  };

  return (
    <div className={styles.container}>
      <h1>Availability</h1>
      <div className="items-center justify-center flex flex-col w-full h-full bg-gray-100 my-3">
        <div className={styles.searchContainer}>
          <div className={styles.options}>
            <div className={styles.guests}>
              <label htmlFor="guests">Guests:</label>
              <select
                id="guests"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
              >
                {[...Array(5).keys()].map((num) => (
                  <option key={num} value={num + 1}>
                    {num + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.infoContainer}>
        <table className={styles.infoTable}>
          <thead>
            <tr>
              <th>Room Type</th>
              <th>Max Guests</th>
              <th>Price per Night</th>
              <th>Availability</th>
              <th>Selected Guests</th>
              <th>Select Rooms</th>
            </tr>
          </thead>
          <tbody>
            {priceData.map((room) => (
              <tr key={room.id}>
                <td>{room.type}</td>
                <td>{room.maxGuests}</td>
                <td>${room.price}</td>
                <td>
                  {room.available > 0 ? (
                    <span>{room.available} available</span>
                  ) : (
                    <span>No rooms available</span>
                  )}
                </td>
                <td>{guests}</td>
                <td>
                  <button onClick={() => handleRoomSelection(room.id)}>
                    Select
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CheckAvailability;
