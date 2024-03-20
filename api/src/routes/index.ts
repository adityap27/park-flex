import express, { Request, Response } from "express";
import manageListings from './manage-listings';

const router = express.Router();

router.use('/manage-listings', manageListings);

export default router;