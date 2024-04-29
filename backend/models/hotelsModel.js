import mongoose from "mongoose";
const hotelSchema = new mongoose.Schema({
  name: String,
  location: String,
  description: String,
  rating: String,
  review: String,
  reviewCount: Number,
  price: String,
  image: String,
  roomtypes: [
    {
      type: new mongoose.Schema({
        type: String,
        price: String,
        maxguests: String,
        rooms: [
          {
            type: new mongoose.Schema({
              id: String,
              available: Boolean,
            }),
          },
        ],
      }),
    },
  ],
});

export default mongoose.model("Hotel", hotelSchema);
