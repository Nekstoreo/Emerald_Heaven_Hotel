import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/userModel.js";
dotenv.config();

const router = express.Router();
const jwtSecretKey = process.env.JWT_SECRET_KEY;
const expirationTime = process.env.TOKEN_EXPIRATION_TIME;

const mongoDB = 'mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME;

mongoose.connect(mongoDB)
  .then(() => console.log('Conexión exitosa a MongoDB'))
  .catch(err => console.error('Error al conectar con MongoDB', err));

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/auth", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    bcrypt.compare(password, user.password, function (err, result) {
      if (!result) {
        return res.status(401).json({ message: "Invalid password" });
      } else {
        let loginData = { email, signInTime: Date.now() };
        const token = jwt.sign(loginData, jwtSecretKey, { expiresIn: expirationTime });
        res.status(200).json({ message: "success", token });
      }
    });
  } else {
    bcrypt.hash(password, 10, async function (err, hash) {
      const newUser = new User({ email, password: hash });
      try {
        await newUser.save();
        let loginData = { email, signInTime: Date.now() };
        const token = jwt.sign(loginData, jwtSecretKey, { expiresIn: expirationTime });
        res.status(200).json({ message: "success", token });
      } catch (error) {
        console.error("Error writing to database:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
    });
  }
});

router.post("/verify", (req, res) => {
  const tokenHeaderKey = "jwt-token";
  const authToken = req.headers[tokenHeaderKey];
  try {
    const verified = jwt.verify(authToken, jwtSecretKey);
    if (verified) {
      return res.status(200).json({ status: "logged in", message: "success" });
    } else {
      return res.status(401).json({ status: "invalid auth", message: "error" });
    }
  } catch (error) {
    return res.status(401).json({ status: "invalid auth", message: "error" });
  }
});

router.post("/check-account", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  res.status(200).json({ status: user ? "User exists" : "User does not exist", userExists: !!user });
});

export default router;