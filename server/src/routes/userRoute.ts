import { Router } from "express";

import { UserAuthmiddleware } from "../middleware/userauthMiddleware";
import { userData } from "../controllers/userController";
const userRoute = Router()

userRoute.get("/",UserAuthmiddleware,userData)
export default userRoute