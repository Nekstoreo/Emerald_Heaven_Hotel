import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";

/**
 * Express router para autenticación y gestión de usuarios.
 * @type {express.Router}
 */
const router = express.Router();

/**
 * Clave secreta para firmar tokens JWT.
 * @type {string}
 */
const jwtSecretKey = "dsfdsfsdfdsvcsvdfgefg";

/**
 * Ruta del archivo de base de datos.
 * @type {string}
 */
const databasePath = "./authdb.json";

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Verifica si el archivo de la base de datos existe e imprimir el contenido
if (!fs.existsSync(databasePath)) {
  console.log("Database file not found.");
  process.exit(1);
}


/**
 * Endpoint para autenticar usuarios.
 * @name POST/auth
 * @function
 * @memberof module:authRouter
 * @param {object} req - Objeto de solicitud de Express.
 * @param {object} res - Objeto de respuesta de Express.
 */
router.post("/auth", (req, res) => {
  const { email, password } = req.body;

  let users = [];
  try {
    const data = fs.readFileSync(databasePath);
    users = JSON.parse(data);
  } catch (error) {
    console.error("Error reading database:", error);
    return res.status(500).json({ message: "Internal server error" });
  }

  const user = users.find((user) => email === user.email);

  if (user) {
    bcrypt.compare(password, user.password, function (_err, result) {
      if (!result) {
        return res.status(401).json({ message: "Invalid password" });
      } else {
        let loginData = {
          email,
          signInTime: Date.now(),
        };

        const token = jwt.sign(loginData, jwtSecretKey);
        res.status(200).json({ message: "success", token });
      }
    });
  } else {
    bcrypt.hash(password, 10, function (_err, hash) {
      const newUser = { email, password: hash };
      users.push(newUser);

      try {
        fs.writeFileSync(databasePath, JSON.stringify(users, null, 2));
      } catch (error) {
        console.error("Error writing to database:", error);
        return res.status(500).json({ message: "Internal server error" });
      }

      let loginData = {
        email,
        signInTime: Date.now(),
      };

      const token = jwt.sign(loginData, jwtSecretKey);
      res.status(200).json({ message: "success", token });
    });
  }
});

/**
 * Endpoint para verificar la validez de un token JWT.
 * @name POST/verify
 * @function
 * @memberof module:authRouter
 * @param {object} req - Objeto de solicitud de Express.
 * @param {object} res - Objeto de respuesta de Express.
 */
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

/**
 * Endpoint para verificar si existe una cuenta de usuario.
 * @name POST/check-account
 * @function
 * @memberof module:authRouter
 * @param {object} req - Objeto de solicitud de Express.
 * @param {object} res - Objeto de respuesta de Express.
 */
router.post("/check-account", (req, res) => {
  const { email } = req.body;

  let users = [];
  try {
    const data = fs.readFileSync(databasePath);
    users = JSON.parse(data);
  } catch (error) {
    console.error("Error reading database:", error);
    return res.status(500).json({ message: "Internal server error" });
  }

  const user = users.find((user) => email === user.email);

  res.status(200).json({
    status: user ? "User exists" : "User does not exist",
    userExists: !!user,
  });
});

export default router;
