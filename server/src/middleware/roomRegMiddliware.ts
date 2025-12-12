import type { Request, Response, NextFunction } from "express";
export const roomMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {

  if (req.body.room) {
    req.body.room = JSON.parse(req.body.room);
  }
  const { roomType, pricePerNight, ammenities } = req.body.room;
  
  const files = req.files;
  if (!files || files.length === 0) {
    return res.status(400).json({ message: "At least one image is required" });
  }
  if (!roomType || !pricePerNight || !ammenities) {
    return res.status(400).json({ message: "All fields are required" });
  }
  next();
};
