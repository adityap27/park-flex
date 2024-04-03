import { Request, Response } from "express";
import { AuthRequest } from "../middleware/authenticateToken";
import { dataBase } from "../dao/connection";

/**
 * Get all notifications of a user and mark them as read.
 */
export const getNotifications = async (req: AuthRequest, res: Response) => {
  try {
    // Get the user id.
    const userId = req.user._id;

    // Fetch notifications of the user
    const notifications = await dataBase.notifications.find({ userId });

    // Mark notifications as read
    await dataBase.notifications.updateMany({ userId }, { read: true });

    return res.status(200).json({ notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
};
