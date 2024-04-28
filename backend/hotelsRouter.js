import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();
const __dirname = path.resolve();

const hotelsDataPath = path.join(__dirname, "hotelsdb.json");
const hotelsData = JSON.parse(fs.readFileSync(hotelsDataPath, "utf8"));

router.get("/hotels", (_req, res) => {
  const hotels = hotelsData.hotels.map((hotel) => {
    const { roomtypes, ...hotelData } = hotel;
    return hotelData;
  });
  res.json(hotels);
});

router.get("/hotels/:hotelName/rooms", (req, res) => {
  const { hotelName } = req.params;
  const hotel = hotelsData.hotels.find(
    (h) => h.name.toLowerCase() === hotelName.toLowerCase()
  );

  if (!hotel) {
    return res.status(404).json({ message: "Hotel not found" });
  }

  try {
    const modifiedRoomtypes = [];
    hotel.roomtypes.forEach((roomtype) => {
      const availableRooms = roomtype.rooms.filter((room) => room.available).length;
      const modifiedRoomtype = {
        type: roomtype.type,
        price: roomtype.price,
        maxguests: roomtype.maxguests,
        availablecount: availableRooms,
      };
      modifiedRoomtypes.push(modifiedRoomtype);
    });

    res.json(modifiedRoomtypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
