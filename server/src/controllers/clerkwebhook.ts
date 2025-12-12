import { Webhook } from "svix";
import User from "../models/User";
import type { Request, Response } from "express";


interface ClerkWebhookEvent {
  data: {
    id: string;
    username?: string;
    email_addresses: { email_address: string }[];
    image_url?: string;
    [key: string]: any;
  };
  type: string;
}
export const clerkwebhook = async (req: Request, res: Response) => {
  console.log(" Clerk reached backend");

  try {
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);

    const headers = {
      "svix-id": req.headers["svix-id"] as string,
      "svix-timestamp": req.headers["svix-timestamp"] as string,
      "svix-signature": req.headers["svix-signature"] as string,
    };

    
    const evt = await wh.verify(req.body, headers) as ClerkWebhookEvent;

  
   

    const { data, type } = evt; // Clerk uses "type", NOT "event_type"

    const userData = {
      _id: data.id,
      username: data.first_name,
      email: data.email_addresses?.[0]?.email_address,
      image: data.image_url,
    };

    switch (type) {
      case "user.created":
        await new User(userData).save();
        return res.status(200).json({ message: "user created" });

      case "user.deleted":
        await User.findByIdAndDelete(data.id);
        return res.status(200).json({ message: "user deleted" });

      case "user.updated":
        await User.findByIdAndUpdate(data.id, userData);
        return res.status(200).json({ message: "user updated" });

      default:
        return res.status(200).json({ message: "ignored unsupported event" });
    }
  } catch (error) {
    console.error(" Webhook error:", error);
    return res.status(500).json({ message: "internal server error" });
  }
};
