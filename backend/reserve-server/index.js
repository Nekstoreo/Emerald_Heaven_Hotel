const express = require("express");
const app = express();
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const cors = require("cors");
const adapter = new FileSync("db.json");
const db = low(adapter);

app.use(express.json());

app.use(cors());

app.post("/roombooking", function (req, res) {
  const formData = req.body;
  const userEmail = formData.Email;

  try {
    const user = db.get("users").find({ email: userEmail }).value();
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    // Agregar la reserva a la lista de reservas del usuario
    user.reserves.push(formData);
    db.write();
    res.json({ success: true });
  } catch (error) {
    console.error("Error saving reservation:", error);
    res.status(500).json({ success: false, message: "Failed to save reservation" });
  }
});

app.get("/roombooking", function (req, res) {
  const userEmail = req.query.email;

  try {
    // Buscar al usuario por su correo electrónico y devolver sus reservas asociadas
    const userReserves = db.get("users")
      .find({ email: userEmail })
      .get("reserves")
      .value();
    res.json(userReserves);
  } catch (error) {
    console.error("Error fetching reserves:", error);
    res.status(500).json({ success: false, message: "Failed to fetch reserves" });
  }
});

app.listen(3008);