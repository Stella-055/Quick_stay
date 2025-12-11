import type { Request, Response, NextFunction } from "express";
export const UserAuthmiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.body.userId) {
    return res.status(401).json({ message: "unauthorized" });
  }
  next();
};
