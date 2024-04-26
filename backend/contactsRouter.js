import express from "express";
import fs from "fs";

const router = express.Router();

const dataFilePath = "./contactsdb.json";

if (!fs.existsSync(dataFilePath)) {
   console.log("Error: contactsdb.json file not found");
    process.exit(1);
}

router.post("/contactame", (req, res) => {
  const { fullName, email, message } = req.body;
  const formData = { fullName, email, message };

  // Lee el archivo de datos y parsea su contenido
  const data = JSON.parse(fs.readFileSync(dataFilePath));

  // Agrega el nuevo contacto a la lista de contactos en el archivo de datos
  data.contacts.push(formData);

  // Escribe los datos actualizados en el archivo
  fs.writeFileSync(dataFilePath, JSON.stringify(data));

  res.status(200).json({ message: "Formulario de contacto enviado con éxito." });
});

export default router;
