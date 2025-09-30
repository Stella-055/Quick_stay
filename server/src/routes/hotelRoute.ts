import { Router } from "express";
import { UserAuthmiddleware } from "../middleware/userauthMiddleware";
import { registerHotel } from "../controllers/hotelController";
import { hotelmiddleware } from "../middleware/hotelRegMiddliware";

const hotelRoute= Router()

hotelRoute.post("/",UserAuthmiddleware, hotelmiddleware, registerHotel)

export default hotelRoute