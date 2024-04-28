import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";

const router = express.Router();

const jwtSecretKey = "dsfdsfsdfdsvcsvdfgefg";
const expirationTime = 60 * 60 * 24 * 7 * 4; // 4 weeks
const databasePath = "./authdb.json";

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

if (!fs.existsSync(databasePath)) {
  console.log("Database file not found.");
  process.exit(1);
}

router.post("/auth", (req, res) => {
  const { email, password } = req.body;
  const authData = JSON.parse(fs.readFileSync(databasePath));

  const user = authData.users.find((user) => email === user.email);

  if (user) {
    bcrypt.compare(password, user.password, function (_err, result) {
      if (!result) {
        return res.status(401).json({ message: "Invalid password" });
      } else {
        let loginData = {
          email,
          signInTime: Date.now(),
        };

        // Add expiration time (in seconds) to the token
        const token = jwt.sign(loginData, jwtSecretKey, { expiresIn: expirationTime });
        res.status(200).json({ message: "success", token });
      }
    });
  } else {
    bcrypt.hash(password, 10, function (_err, hash) {
      const newUser = { email, password: hash };
      authData.users.push(newUser);

      try {
        fs.writeFileSync(databasePath, JSON.stringify(authData));
      } catch (error) {
        console.error("Error writing to database:", error);
        return res.status(500).json({ message: "Internal server error" });
      }

      let loginData = {
        email,
        signInTime: Date.now(),
      };

      // Add expiration time (in seconds) to the token
      const token = jwt.sign(loginData, jwtSecretKey, { expiresIn: expirationTime });
      res.status(200).json({ message: "success", token });
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

router.post("/check-account", (req, res) => {
  const { email } = req.body;
  const authData = JSON.parse(fs.readFileSync(databasePath));
  const user = authData.users.find((user) => email === user.email);

  res.status(200).json({
    status: user ? "User exists" : "User does not exist",
    userExists: !!user,
  });
});

export default router;

