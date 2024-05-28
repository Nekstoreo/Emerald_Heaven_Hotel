import express from "express";
import mongoose from "mongoose";
const router = express.Router();

const contactSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  message: String
});

const Contact = mongoose.model("Contact", contactSchema);

router.post("/contact-us", async (req, res) => {
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

export default router;