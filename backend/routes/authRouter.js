import express from "express";
import { loginUser, registerUser, verifyToken, checkAccount, getProfile } from "../controllers/authController.js";

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/verify", verifyToken);
router.post("/check-account", checkAccount);
router.get("/profile", getProfile);

export default router;
