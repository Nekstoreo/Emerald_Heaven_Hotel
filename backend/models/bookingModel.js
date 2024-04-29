import mongoose from "mongoose";

const bookingsSchema = new mongoose.Schema({
  email: String,
  reserves: [
    {
      BookingID: String,
      Name: String,
      phoneNumber: String,
      checkInDate: String,
      checkOutDate: String,
      hotelName: String,
      typeOfRoom: String,
      noOfGuests: String,
      requiredRooms: String,
      totalPrice: Number,
      bookedRoomIds: [String],
    },
  ],
});

export default mongoose.model("Booking", bookingsSchema);
