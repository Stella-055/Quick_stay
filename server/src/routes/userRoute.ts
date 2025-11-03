import { Router } from "express";

import { UserAuthmiddleware } from "../middleware/userauthMiddleware";
import { addToRecentSearch, userData } from "../controllers/userController";
const userRoute = Router()

userRoute.post("/",UserAuthmiddleware,userData)
userRoute.post("/store-recent-search",UserAuthmiddleware,addToRecentSearch)
export default userRoute