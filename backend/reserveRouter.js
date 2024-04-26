import express from "express";
import fs from "fs";
import cors from "cors";

const router = express.Router();

router.use(express.json());
router.use(cors());

const dbFilePath = "reservedb.json";

// Verifica si el archivo de la base de datos existe, si no, crea una estructura vacía
if (!fs.existsSync(dbFilePath)) {
  console.log("Error: reservedb.json file not found");
  process.exit(1);
}

router.post("/roombooking", (req, res) => {
  const formData = req.body;
  const userEmail = formData.Email;

  try {
    // Lee el archivo de la base de datos y parsea su contenido
    const data = JSON.parse(fs.readFileSync(dbFilePath));

    let user = data.users.find(user => user.email === userEmail);

    // Si el usuario no existe, lo creamos
    if (!user) {
      user = {
        email: userEmail,
        reserves: []
      };
      data.users.push(user);
    }

    // Agrega la reserva a la lista de reservas del usuario
    user.reserves.push(formData);

    // Escribe los datos actualizados en el archivo de la base de datos
    fs.writeFileSync(dbFilePath, JSON.stringify(data));

    res.json({ success: true });
  } catch (error) {
    console.error("Error saving reservation:", error);
    res.status(500).json({ success: false, message: "Failed to save reservation" });
  }
});

router.get("/roombooking", (req, res) => {
  const userEmail = req.query.email;

  try {
    // Lee el archivo de la base de datos y parsea su contenido
    const data = JSON.parse(fs.readFileSync(dbFilePath));

    // Busca al usuario por su correo electrónico y devuelve sus reservas asociadas
    const user = data.users.find(user => user.email === userEmail);
    if (user) {
      res.json(user.reserves);
    } else {
      res.json([]);
    }
  } catch (error) {
    console.error("Error fetching reserves:", error);
    res.status(500).json({ success: false, message: "Failed to fetch reserves" });
  }
});

export default router;
