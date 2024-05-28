import express from "express";
import authRouter from "./routes/authRouter.js";
import contactRouter from "./routes/contactRouter.js";
import bookingRouter from "./routes/reservationRouter.js";
import hotelRouter from "./routes/hotelRouter.js"; // Asegúrate de que la ruta sea correcta
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

const mongoDB = process.env.MONGODB_URI;

mongoose
    .connect(mongoDB)
    .then(() => console.log("Conexión exitosa a MongoDB"))
    .catch((err) => console.error("Error al conectar con MongoDB", err));

app.use(cors());
app.use(express.json());

app.use(authRouter);
app.use(contactRouter);
app.use(bookingRouter);
app.use(hotelRouter);

app.get("/", (_req, res) => {
  res.send(
      "Auth API.\nPlease use POST /auth & POST /verify for authentication"
  );
});

app.listen(PORT, (error) => {
  if (!error)
    console.log(
        "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
