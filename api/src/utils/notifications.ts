import { dataBase } from "../dao/connection";

/**
 * Create a notification for a user.
 * Returns a created notification.
 */
export const createNotification = async (userId: string, message: string) => {
  try {
    // Create the notification
    const notification = new dataBase.notifications({
      userId,
      message,
    });
    notification.save();

    return notification;
  } catch (error) {
    console.error("Error creating notification:", error);
    throw new Error("Failed to create notification.");
  }
};
