import { Router } from "express";
import { UserAuthmiddleware } from "../middleware/userauthMiddleware";
import { registerHotel } from "../controllers/hotelController";

const hotelRoute= Router()

hotelRoute.post("/",UserAuthmiddleware,registerHotel)

export default hotelRoute