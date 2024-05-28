import express from "express";
import {
  createReservation,
  getReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
} from "../controllers/reservationController.js";

const router = express.Router();

router.route("/reservations").post(createReservation).get(getReservations);
router.route("/reservations/:id").get(getReservationById).put(updateReservation).delete(deleteReservation);

export default router;
