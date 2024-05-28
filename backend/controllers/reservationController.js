import Reservation from "../models/reservationModel.js";

export const createReservation = async (req, res) => {
    try {
        const reservation = await Reservation.create(req.body);
        res.status(201).json({ success: true, data: reservation });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const getReservations = async (_req, res) => {
    try {
        const reservations = await Reservation.find();
        res.status(200).json({ success: true, data: reservations });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getReservationById = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) {
            return res.status(404).json({ success: false, message: "Reservation not found" });
        }
        res.status(200).json({ success: true, data: reservation });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!reservation) {
            return res.status(404).json({ success: false, message: "Reservation not found" });
        }
        res.status(200).json({ success: true, data: reservation });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndDelete(req.params.id);
        if (!reservation) {
            return res.status(404).json({ success: false, message: "Reservation not found" });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
