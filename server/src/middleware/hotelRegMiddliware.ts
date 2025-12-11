import type { Request, Response, NextFunction } from "express";
export const hotelmiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, address, contact, city } = req.body;
  if (!name || !address || !contact || !city) {
    return res.status(400).json({ message: "All fields are required" });
  }
  next();
};
