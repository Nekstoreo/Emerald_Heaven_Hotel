import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Booking from "../models/bookingModel.js";
import Hotel from "../models/hotelsModel.js";
dotenv.config();

const router = express.Router();

const mongoDB =
  "mongodb://" +
  process.env.DB_USER +
  ":" +
  process.env.DB_PASS +
  "@" +
  process.env.DB_HOST +
  ":" +
  process.env.DB_PORT +
  "/" +
  process.env.DB_NAME;

mongoose
  .connect(mongoDB)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

router.post("/booking", async (req, res) => {
  const bookingData = req.body.formDataObject;

  try {
    const hotel = await Hotel.findOne({ name: bookingData.hotelName });
    if (!hotel) {
      throw new Error("Hotel not found");
    }
    console.log(hotel);

    const roomType = hotel.roomtypes.find(
      (roomType) => roomType.type === bookingData.roomType
    );
    if (!roomType) {
      throw new Error("Room type not found");
    }

    console.log(roomType);

    const availableRooms = roomType.rooms.filter((room) => room.available);
    if (availableRooms.length < bookingData.requiredRooms) {
      throw new Error("Not enough rooms available");
    }

    console.log(availableRooms);

    const bookedRoomIds = [];

    availableRooms.slice(0, bookingData.requiredRooms).forEach((room) => {
      room.available = false;
      bookedRoomIds.push(room.id);
    });

    // save the booking data to the database in the email field if the email is not already in the database
    await Booking
      .updateOne(
        { email: bookingData.Email },
        {
          $push: {
            reserves: {
              ...bookingData,
              bookedRoomIds,
            },
          },
        },
        { upsert: true }
      );

    await hotel.save();

    res.json({ success: true, bookedRoomIds });
  } catch (error) {
    console.error("Error saving booking:", error);
    res.status(400).json({ success: false, message: error.message });
  }
});

router.get("/mybookings", async (req, res) => {
  const userEmail = req.query.email;

  try {
    // return the reserves array of the booking document where the email matches the userEmail
    const userBookings = await Booking.findOne(
      { email: userEmail },
      { _id: 0, "reserves._id": 0 }
    );
    // only return the reserves array
    res.json( userBookings.reserves );
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch bookings" });
  }
});

export default router;
