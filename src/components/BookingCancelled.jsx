import React from 'react';

function BookingCancelled() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">¡Reserva Cancelada!</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <p className="text-lg">Lo sentimos, tu reserva no pudo ser procesada en este momento.</p>
        <p className="text-lg">Por favor, ponte en contacto con el hotel para obtener más información.</p>
      </div>
    </div>
  );
}

export default BookingCancelled;

