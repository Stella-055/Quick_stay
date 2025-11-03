import { Router } from "express";
import { checkAvailabilityApi, createBooking, getHotelBookings, getUserBookings } from "../controllers/bookngController";
import { UserAuthmiddleware } from "../middleware/userauthMiddleware";
 
const bookingRoute = Router()

bookingRoute.post("/check-availability", checkAvailabilityApi)
bookingRoute.post("/book",UserAuthmiddleware,createBooking)
bookingRoute.post("/owner:", UserAuthmiddleware ,getHotelBookings)
bookingRoute.get("/user/:userId", getUserBookings)

export default bookingRoute