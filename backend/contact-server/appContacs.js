const express = require("express");
const cors = require("cors");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("./dataContacs.json");
const db = low(adapter);

const app = express();

// Inicializar la base de datos
db.defaults({ contacts: [] }).write();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/contactame", (req, res) => {
  const { fullName, email, message } = req.body;
  const formData = { fullName, email, message };
  // Agregar el nuevo contacto a la BD
  db.get("contacts").push(formData).write();
  res.status(200).json({ message: "Formulario de contacto enviado con éxito." });
});

const PORT = 3020;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
