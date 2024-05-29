// models/hotelsModel.js

import mongoose from "mongoose";


const roomSchema = new mongoose.Schema({
  id: String,
  available: Boolean,
});

const roomTypeSchema = new mongoose.Schema({
  type: String,
  price: String,
  maxguests: String,
  rooms: [roomSchema],
});
const hotelServicesSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
});

const hotelSchema = new mongoose.Schema({
  name: String,
  location: String,
  description: String,
  rating: String,
  review: String,
  reviewCount: Number,
  price: String,
  image: String,
  roomtypes: [roomTypeSchema],
  hotelServices: [
    {
      service: { type: mongoose.Schema.Types.ObjectId, ref: "HotelService" },
      price: String, // or Number, depending on your preference
    },
  ],
});

export const Hotel = mongoose.model("Hotel", hotelSchema);
export const HotelService = mongoose.model("HotelService", hotelServicesSchema);
