import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
    reservationDetails: {
        hotel: {
            _id: { type: String, required: true },
            name: { type: String, required: true },
        },
        rooms: [{
            type: { type: String, required: true },
            totalPrice: { type: Number, required: true },
            reservedRoomIds: [{ type: String, required: true }],
            selectedRooms: { type: Number, required: true },
        }],
        services: [{
            service: {
                _id: { type: String, required: true },
                name: { type: String, required: true },
                description: { type: String, required: true },
            },
            price: { type: String, required: true },
        }],
    },
    paymentData: {
        totalRoomsAndServicesPrice: { type: Number, required: true },
        name: { type: String, required: true },
        number: { type: String, required: true },
        cvc: { type: String, required: true },
        expiry: { type: String, required: true },
    },
    guestData: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        checkInDate: { type: Date, required: true },
        checkOutDate: { type: Date, required: true },
        ccDniPassport: { type: String, required: true },
    },
});

const Reservation = mongoose.model("Reservation", reservationSchema);

export default Reservation;