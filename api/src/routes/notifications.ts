import express from "express";

import { getNotifications } from "../controllers/notifications";
import { authenticateToken } from "../middleware/authenticateToken";

const router = express.Router({ mergeParams: true });

router.get("/", authenticateToken, getNotifications);

export default router;
