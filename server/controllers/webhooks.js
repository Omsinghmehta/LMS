import { Webhook } from 'svix'; // Capital 'W' – class name
import User from "../models/User.js";

export const clerkWebHooks = async (req, res) => {
  try {
    // 1. Create the Webhook instance using the secret
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // 2. Validate the webhook signature
    const payload = JSON.stringify(req.body);
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    // This throws if invalid
    wh.verify(payload, headers);

    // 3. Extract data
    const { data, type } = req.body;

    // 4. Handle event types
    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id, // Corrected from data._id
          email: data.email_addresses?.[0]?.email_address || "",
          name: `${data.first_name || ""} ${data.last_name || ""}`,
          imageUrl: data.image_url,
        };

        await User.create(userData); // FIX: was `User.created` → should be `create`
        return res.status(200).json({ success: true });
      }

      case "user.updated": {
        const updatedData = {
          email: data.email_addresses?.[0]?.email_address || "",
          name: `${data.first_name || ""} ${data.last_name || ""}`,
          imageUrl: data.image_url,
        };

        await User.findByIdAndUpdate(data.id, updatedData); // FIX: proper usage
        return res.status(200).json({ success: true });
      }

      default:
        return res.status(200).json({ message: "Unhandled event type" });
    }
  } catch (error) {
    console.error("Webhook error:", error); // for debugging
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};
