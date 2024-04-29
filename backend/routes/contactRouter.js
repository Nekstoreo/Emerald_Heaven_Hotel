import express from "express";
import mongoose from "mongoose";
import Contact from "../models/contactModel.js";
const router = express.Router();

const mongoDB =
  "mongodb://" +
  process.env.DB_USER +
  ":" +
  process.env.DB_PASS +
  "@" +
  process.env.DB_HOST +
  ":" +
  process.env.DB_PORT +
  "/" +
  process.env.DB_NAME;

mongoose
  .connect(mongoDB)
  .then(() => console.log("Conexión exitosa a MongoDB"))
  .catch((err) => console.error("Error al conectar con MongoDB", err));

router.post("/contactus", async (req, res) => {
  const { fullName, email, message } = req.body;
  if (!fullName || !email || !message) {
    return res
      .status(400)
      .json({ message: "Por favor, complete todos los campos." });
  }

  if (!email.includes("@") || !email.includes(".")) {
    return res
      .status(400)
      .json({ message: "Por favor, ingrese un correo electrónico válido." });
  }

  const formData = new Contact({ fullName, email, message });

  try {
    await formData.save();
    res
      .status(200)
      .json({ message: "Formulario de contacto enviado con éxito." });
  } catch (error) {
    res
      .status(500)
      .json({
        message:
          "Hubo un error al guardar el formulario de contacto. Disculpe las molestias.",
      });
  }
});

router.get("/getconctactus", async (_req, res) => {
  try {
    const contacts = await Contact.find(
      {},
      { _id: 0, fullName: 1, email: 1, message: 1 }
    );
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
