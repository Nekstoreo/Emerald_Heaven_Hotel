import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Hotel from "../models/hotelsModel.js";
dotenv.config();

const router = express.Router();

router.get("/hotels", async (_req, res) => {
  try {
    const hotels = await Hotel.find(
      {},
      "description image price reviews location rating reviewsCount name"
    );
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/hotels/rooms", async (req, res) => {
  const hotelName = req.query.hotelName;
  try {
    const hotel = await Hotel.findOne({ name: hotelName });

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    const modifiedRoomtypes = hotel.roomtypes.map((roomtype) => ({
      type: roomtype.type,
      price: roomtype.price,
      maxguests: roomtype.maxguests,
      availablecount: roomtype.rooms.filter((room) => room.available).length,
    }));

    res.json(modifiedRoomtypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
