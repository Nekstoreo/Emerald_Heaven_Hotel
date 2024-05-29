import Reservation from "../models/reservationModel.js";

export const createReservation = async (req, res) => {
    try {
        const { reservationDetails, paymentData, guestData } = req.body;
        if (!reservationDetails || !paymentData || !guestData) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }
        // Implementar la lógica para marcar como false la disponibilidad de las habitaciones seleccionadas
        //
        //

        const newReservation = new Reservation({ reservationDetails, paymentData, guestData });
        const reservation = await newReservation.save();
        return res.status(201).json({ success: true, data: reservation });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

export const getReservations = async (req, res) => {
    try {
        if (!req.body.email) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }
        const reservations = await Reservation.find({ "guestData.email": req.body.email });
        if (!reservations) {
            return res.status(404).json({ success: false, message: "Reservations not found" });
        }
        return res.status(200).json({ success: true, data: reservations });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

