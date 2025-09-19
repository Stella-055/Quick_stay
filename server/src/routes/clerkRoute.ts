import { Router } from "express";
import { clerkwebhook } from "../controllers/clerkwebhook.js";
const clerkRoute = Router()

clerkRoute.post("/clerk", clerkwebhook)

export default clerkRoute