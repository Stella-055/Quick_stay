import User from "../models/User"
import type { Request, Response } from "express";
  export const userData = async (req: Request,res:Response) => {
    try {
        const {userId} =req.body
     const user = await User.findById(userId)
   
      const recentSearchedCities = user!.recentSerachedCities 
      const role = user!.role
      res.status(200).json({recentSearchedCities, role})
    } catch (error) {
       res.status(500).json({ message: "internal server error" }); 
    }
 }