import React from "react";
import { useLocation } from "react-router-dom";

function BookingSuccessful() {
  const location = useLocation();
  const { reservationData, bookedRoomIds } = location.state;

  function printReservation() {
    window.print();
  }

  const reservationDataContent = (
    <div className="container mx-auto px-4 py-8 text-xs" id="reservationDetails">
      <h1 className="text-3xl font-semibold mb-4">ID de Reserva: {reservationData.BookingID}</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Detalles de la Reserva:</h2>
        <p>
          <span className="font-semibold">Nombre:</span> {reservationData.Name}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {reservationData.Email}
        </p>
        <p>
          <span className="font-semibold">Teléfono:</span>{" "}
          {reservationData.phoneNumber}
        </p>
        <p>
          <span className="font-semibold">Fecha de Check-In:</span>{" "}
          {reservationData.checkInDate}
        </p>
        <p>
          <span className="font-semibold">Fecha de Check-Out:</span>{" "}
          {reservationData.checkOutDate}
        </p>
        <p>
          <span className="font-semibold">Hotel:</span>{" "}
          {reservationData.hotelName}
        </p>
        <p>
          <span className="font-semibold">Número de Invitados:</span>{" "}
          {reservationData.noOfGuests}
        </p>
        <p>
          <span className="font-semibold">Tipo de Habitación:</span>{" "}
          {reservationData.typeOfRoom}
        </p>
        <p>
          <span className="font-semibold">
            Número de Habitaciones Requeridas:
          </span>{" "}
          {reservationData.requiredRooms}
        </p>
        <p>
          <span className="font-semibold">Precio Total:</span>{" "}
          {reservationData.totalPrice}
        </p>
      </div>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">
          IDs de las Habitaciones Reservadas:
        </h2>
        <ul className="text-xl">
          {bookedRoomIds.map((roomId, index) => (
            <li key={index}>{roomId}</li>
          ))}
        </ul>
      </div>
      <div className="flex justify-between w-1/4 mx-auto text-sm">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={printReservation}
      >
        Imprimir Reserva
      </button>
      <button>
        <a
          href="/"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Volver al Inicio
        </a>
      </button>
      </div>
    </div>
  );

  return reservationDataContent;
}

export default BookingSuccessful;
