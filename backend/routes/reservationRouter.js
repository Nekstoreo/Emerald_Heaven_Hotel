import express from "express";
import {
  createReservation,
  getReservations
} from "../controllers/reservationController.js";

const router = express.Router();

router.route("/reservations").post(createReservation);
router.route("/getReservations").post(getReservations);

export default router;
