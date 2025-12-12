import { Webhook } from "svix";

import User from "../models/User";
import type { Request, Response } from "express";

export const clerkwebhook = async (req: Request, res: Response) => {
  console.log("🔥 Clerk reached backend");

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);
  try {
    const headers = {
      "svix-id": req.headers["svix-id"] as string,
      "svix-timestamp": req.headers["svix-timestamp"] as string,
      "svix-signature": req.headers["svix-signature"] as string,
    };

    await wh.verify(req.body, headers);
  
    console.log(req.body)
    const { data, event_type } = req.body;

    const userData = {
      _id: data.id,
      username: data.username,
      email: data.email_addresses[0].email_address,
      image: data.image_url,
    };

    switch (event_type) {
      case "user.created":
        const newUser = new User(userData);
        await newUser.save();
        return res.status(200).json({ message: "user created" });
      case "user.deleted":
        await User.findByIdAndDelete(data.id);
        return res.status(200).json({ message: "user deleted" });
      case "user.updated":
        await User.findByIdAndUpdate(data.id, userData);
        return res.status(200).json({ message: "user updated" });
      default:
        return res.status(400).json({ message: "event type not supported" });
    }
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};
