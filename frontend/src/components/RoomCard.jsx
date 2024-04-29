import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import cardStyles from "./RoomCard.module.css";

const RoomCard = ({ type, price, maxguests, availablecount, onReserve }) => {
  const [selectedRooms, setSelectedRooms] = useState(1);
  
  const handleIncrement = () => {
    if (selectedRooms < availablecount) {
      setSelectedRooms(selectedRooms + 1);
    }
  };

  const handleDecrement = () => {
    if (selectedRooms > 0) {
      setSelectedRooms(selectedRooms - 1);
    }
  };

  const handleReserve = () => {
    const roomprice = price.replace("$", "").replace(",", "");
    const totalPrice = selectedRooms * parseFloat(roomprice);
    onReserve({ type, price }, maxguests, selectedRooms, totalPrice);
  };
  

  return (
    <div className={cardStyles.roomCard}>
      <h3 className={cardStyles.roomType}>{type}</h3>
      <p className={cardStyles.roomField}>Precio: ${price}</p>
      <p className={cardStyles.roomField}>Máximo de huéspedes: {maxguests}</p>
      <p className={cardStyles.roomField}>
        Habitaciones disponibles: {availablecount}
      </p>
      <div className={cardStyles.roomCounterContainer}>
        <Button onClick={handleDecrement} disabled={selectedRooms === 0}>
          -
        </Button>
        <span>{selectedRooms}</span>
        <Button
          onClick={handleIncrement}
          disabled={selectedRooms === availablecount}
        >
          +
        </Button>
      </div>
      <Button
        className={cardStyles.reserveButton}
        onClick={handleReserve}
        disabled={selectedRooms === 0}
      >
        Reservar
      </Button>
    </div>
  );
};

export default RoomCard;
