import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./CheckAvailability.module.css";
import RoomCard from "../components/RoomCard";

const CheckAvailability = () => {
  const [roomTypes, setRoomTypes] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const hotelName = location.state?.hotelName;
  const fetchRoomTypes = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/hotels/${hotelName
          .toLowerCase()
          .replace(/\s+/g, "%20")}/rooms`
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setRoomTypes(data);
    } catch (error) {
      console.error("Error fetching room types:", error);
    }
  };
  useEffect(() => {
    if (hotelName) {
      fetchRoomTypes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hotelName]);

  const handleReservation = (selectedRoom, guests, requiredRooms, totalPrice) => {
    const reservationData = {
      hotelName,
      roomType: selectedRoom.type,
      guests,
      requiredRooms,
      totalPrice,
    };
    navigate("/bookingconfirmation", { state: { reservationData } });
  };

  return (
    <div className={styles.checkAvailability}>
      <h2 className={styles.roomCardGridTitle}>
        Disponibilidad de habitaciones
      </h2>

      <div className={styles.roomCardGrid}>
        {roomTypes.map((roomType) => (
          <RoomCard
            key={roomType.type}
            {...roomType}
            onReserve={handleReservation}
          />
        ))}
      </div>
    </div>
  );
};

export default CheckAvailability;
