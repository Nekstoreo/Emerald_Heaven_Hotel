import express from "express";
import { getHotels, getHotelDetails } from "../controllers/hotelController.js";

const router = express.Router();

router.get("/hotels", getHotels);
router.get("/hotels/:id", getHotelDetails);

export default router;