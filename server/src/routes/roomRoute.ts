import { Router } from "express";
import { UserAuthmiddleware } from "../middleware/userauthMiddleware";
import { roomMiddleware } from "../middleware/roomRegMiddliware";
import {
  createRoom,
  getAllRooms,
  getOwnerRooms,
  toggleRoomAvailability,
} from "../controllers/roomController";
import upload from "../middleware/multer";
const roomRoute = Router();

roomRoute.post(
  "/",
  upload.array("images", 4),
  UserAuthmiddleware,
  roomMiddleware,
 
  createRoom,
);
roomRoute.get("/", getAllRooms);
roomRoute.post("/owner", UserAuthmiddleware, getOwnerRooms);
roomRoute.patch(
  "/availability/:roomId",
  UserAuthmiddleware,
  toggleRoomAvailability,
);
export default roomRoute;
