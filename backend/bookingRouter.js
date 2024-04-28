import express from "express";
import fs from "fs";

import path from "path";
const router = express.Router();
const __dirname = path.resolve();
const dbBookingPath = path.join(__dirname, "bookingdb.json");
const dbHotelsPath = path.join(__dirname, "hotelsdb.json");

router.post("/booking", (req, res) => {
  const bookingData = req.body.formDataObject;

  try {
    const bookings = JSON.parse(fs.readFileSync(dbBookingPath));
    const hotels = JSON.parse(fs.readFileSync(dbHotelsPath));
    const hotel = hotels.hotels.find(
      (hotel) => hotel.name === bookingData.hotelName
    );
    if (!hotel) {
      throw new Error("Hotel not found");
    }

    const roomType = hotel.roomtypes.find(
      (roomType) => roomType.type === bookingData.roomType
    );
    if (!roomType) {
      throw new Error("Room type not found");
    }

    const availableRooms = roomType.rooms.filter((room) => room.available);
    if (availableRooms.length < bookingData.requiredRooms) {
      throw new Error("Not enough rooms available");
    }

    const bookedRoomIds = []; // Lista para almacenar los IDs de las habitaciones reservadas

    availableRooms.slice(0, bookingData.requiredRooms).forEach((room) => {
      room.available = false;
      bookedRoomIds.push(room.id); // Agrega el ID de la habitación reservada a la lista
    });

    fs.writeFileSync(dbHotelsPath, JSON.stringify(hotels, null, 2));

    const user = bookings.users.find(
      (user) => user.email === bookingData.Email
    );
    if (!user) {
      bookings.users.push({ email: bookingData.Email, reserves: [] });
    }

    const reserve = {
      BookingID: bookingData.BookingID,
      Name: bookingData.Name,
      phoneNumber: bookingData.phoneNumber,
      checkInDate: bookingData.checkInDate,
      checkOutDate: bookingData.checkOutDate,
      hotelName: bookingData.hotelName,
      typeOfRoom: bookingData.roomType,
      noOfGuests: bookingData.noOfGuests,
      requiredRooms: bookingData.requiredRooms,
      totalPrice: bookingData.totalPrice,
      bookedRoomIds: bookedRoomIds, // Agrega la lista de IDs de las habitaciones reservadas a la reserva
    };

    bookings.users.forEach((user) => {
      if (user.email === bookingData.Email) {
        user.reserves.push(reserve);
      }
    });

    fs.writeFileSync(dbBookingPath, JSON.stringify(bookings, null, 2));

    res.json({ success: true, bookedRoomIds });
  } catch (error) {
    console.error("Error saving booking:", error);
    res.status(400).json({ success: false, message: error.message });
  }
});

router.get("/mybookings", (req, res) => {
  const userEmail = req.query.email;

  try {
    // Lee el archivo de la base de datos y parsea su contenido
    const bookings = JSON.parse(fs.readFileSync(dbBookingPath));

    // Busca al usuario por su correo electrónico y devuelve sus reservas asociadas
    const user = bookings.users.find((user) => user.email === userEmail);
    if (user) {
      res.json(user.reserves);
    } else {
      res.json([]);
    }
  } catch (error) {
    console.error("Error fetching reserves:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch reserves" });
  }
});

export default router;
