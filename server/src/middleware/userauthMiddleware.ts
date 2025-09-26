import type { Request, Response } from "express";
export const UserAuthmiddleware = (req: Request, res: Response, next: Function) => {
    
  if (!req.body.userId) {
    return res.status(401).json({ message: "unauthorized" });
  }
  next();
}