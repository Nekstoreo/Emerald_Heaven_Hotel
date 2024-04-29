import express from "express";
import authRouter from "./routes/authRouter.js";
import contactRouter from "./routes/contactRouter.js";
import bookingRouter from "./routes/bookingRouter.js";
import hotelRouter from "./routes/hotelRouter.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());

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
