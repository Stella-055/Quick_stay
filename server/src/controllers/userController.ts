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

 export const addToRecentSearch = async (req: Request,res:Response) => {
    try {
        const {userId, city} =req.body
        const user = await User.findById(userId)
       
        if(user!.recentSerachedCities.includes(city)){
            return res.status(200).json({message: "city already in recent search"})
        }
         if(user!.recentSerachedCities.length < 3 ){
            user!.recentSerachedCities.push(city)
         }
         else{
            user!.recentSerachedCities.shift()
            user!.recentSerachedCities.push(city)
         }
      
        await user!.save()
        res.status(200).json({message: "city added to recent search"})
    } catch (error) {
       res.status(500).json({ message: "internal server error" }); 
    }
 }