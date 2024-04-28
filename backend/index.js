import express from "express";
import authRouter from "./authRouter.js";
import contactRouter from "./contactsRouter.js";
import mapRouter from "./mapRouter.js";
import bookingRouter from "./bookingRouter.js";
import hotelRouter from "./hotelsRouter.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(authRouter);
app.use(contactRouter);
app.use(mapRouter);
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
