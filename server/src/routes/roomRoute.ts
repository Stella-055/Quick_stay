import { Router } from "express";
import { UserAuthmiddleware } from "../middleware/userauthMiddleware";
import { roomMiddleware } from "../middleware/roomRegMiddliware";
import { createRoom } from "../controllers/roomController";
import upload from "../middleware/multer";
const roomRoute= Router()

roomRoute.post("/",UserAuthmiddleware,roomMiddleware, upload.array("images", 4) ,createRoom)

export default roomRoute