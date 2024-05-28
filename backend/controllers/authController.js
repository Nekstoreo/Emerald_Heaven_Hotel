import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/usersModel.js";

dotenv.config();

const jwtSecretKey = process.env.JWT_SECRET_KEY;
const expirationTime = process.env.TOKEN_EXPIRATION_TIME;

export const loginUser = async (req, res) => {
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
        res.status(401).json({ message: "User not found" });
    }
};

export const registerUser = async (req, res) => {
    const { firstName, lastName, email, password, phone } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    bcrypt.hash(password, 10, async function (err, hash) {
        if (err) {
            console.error("Error hashing password:", err);
            return res.status(500).json({ message: "Internal server error" });
        }

        const newUser = new User({ firstName, lastName, email, password: hash, phone });
        try {
            await newUser.save();
            let loginData = { email, signInTime: Date.now() };
            const token = jwt.sign(loginData, jwtSecretKey, { expiresIn: expirationTime });
            res.status(201).json({ message: "success", token });
        } catch (error) {
            console.error("Error writing to database:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    });
};


export const verifyToken = (req, res) => {
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
};

export const checkAccount = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    res.status(200).json({ status: user ? "User exists" : "User does not exist", userExists: !!user });
};

export const getProfile = async (req, res) => {
    const tokenHeaderKey = "jwt-token";
    const authToken = req.headers[tokenHeaderKey];

    try {
        const decodedToken = jwt.verify(authToken, jwtSecretKey);
        const userEmail = decodedToken.email;
        const profile = await User.findOne({ email: userEmail }).select("-password");

        if (profile) {
            res.status(200).json({ message: "success", profile });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};
