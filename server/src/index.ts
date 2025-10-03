import "dotenv/config"; 
import type { Request, Response } from "express";
import express from "express";
import cors from "cors";
import userRoute from "./routes/userRoute";
import { dbConnect } from "./utils/db";
import {cloudinaryConfig} from "./utils/cloudinary";
import { clerkMiddleware } from "@clerk/express";
import clerkRoute from "./routes/clerkRoute";
import hotelRoute from "./routes/hotelRoute";
import roomRoute from "./routes/roomRoute";
import bookingRoute from "./routes/bookingRoute";
dbConnect();
cloudinaryConfig();
const app = express();
app.use(clerkMiddleware());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://qshotel.netlify.app/"],
    credentials: true,
  }),
);
app.use("/api/clerk", clerkRoute);
app.use("/api/user", userRoute);
app.use("/api/hotels", hotelRoute)
app.use("/api/rooms", roomRoute)
app.use("api/bookings",bookingRoute)
app.get("/", (req: Request, res: Response) => {
  res.send("welcome to quick stay");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`serer is upand running on port ${PORT}`);
});
