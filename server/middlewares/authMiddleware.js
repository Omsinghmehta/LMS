import { clerkClient } from "@clerk/express";

export const protectEducator = async (req, res, next) => {
  try {
    const  userId  = await req.auth.userId; 

    if (!userId) {
           return res.status(401).json({ success: false, message: 'Unauthorized: Missing userId' });
    }

    const response = await clerkClient.users.getUser(userId);

    if (response.publicMetadata.role !== 'educator') {
      return res.status(403).json({ success: false, message: 'Unauthorized Access: Not an educator' });
    }

    next();
  } catch (error) {
    console.error("protectEducator error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
