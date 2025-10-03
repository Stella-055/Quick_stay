import { Router } from "express";
import { checkAvailabilityApi, createBooking, getHotelBookings, getUserBookings } from "../controllers/bookngController";
import { UserAuthmiddleware } from "../middleware/userauthMiddleware";
 
const bookingRoute = Router()

bookingRoute.post("/check-availability", checkAvailabilityApi)
bookingRoute.post("/book",UserAuthmiddleware,createBooking)
bookingRoute.get("/owner:", UserAuthmiddleware ,getHotelBookings)
bookingRoute.get("/user/:userId",UserAuthmiddleware, getUserBookings)

export default bookingRoute