import React from "react";
import { useLocation } from "react-router-dom";
import BookingDetails from "../components/BookingDetails";

function ReservationSuccessful() {
  const location = useLocation();
  const { reservationData, bookedRoomIds } = location.state;

  return (
    <>
      <BookingDetails
        reservationData={reservationData}
        bookedRoomIds={bookedRoomIds}
      />
    </>
  );
}

export default ReservationSuccessful;
