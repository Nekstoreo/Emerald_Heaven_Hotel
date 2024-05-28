import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    hotelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",
        required: true,
    },
    guestNames: [{ type: String, required: true }],
    guestDocumentNumbers: [{ type: String, required: true }],
    numberOfGuests: { type: Number, required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    roomIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }],
    serviceIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "HotelService" }],
    reservationHolderName: { type: String, required: true },
    reservationHolderPhone: { type: String, required: true },
});

const Reservation = mongoose.model("Reservation", reservationSchema);

export default Reservation;
