import { Router } from "express";
import { clerkwebhook } from "../controllers/clerkwebhook";
const clerkRoute = Router()

clerkRoute.post("/", clerkwebhook)

export default clerkRoute