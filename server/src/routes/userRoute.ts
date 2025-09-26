import { Router } from "express";

import { UserAuthmiddleware } from "../middleware/userauthMiddleware";
import { addToRecentSearch, userData } from "../controllers/userController";
const userRoute = Router()

userRoute.get("/",UserAuthmiddleware,userData)
userRoute.get("/store-recent-search",UserAuthmiddleware,addToRecentSearch)
export default userRoute