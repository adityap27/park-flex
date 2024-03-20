import express, { Request, Response } from "express"
import { dataBase } from "../dao/connection";
import multer from 'multer';
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/create', upload.single('image'), async (req: Request, res: Response) => {
    try {
        if(!req.file) return;
    
        const listingData = req.body;
    
        const newListing = new dataBase.listings({
          // owner: listingData._id,
          name: listingData.name,
          streetAddress: listingData.streetAddress,
          country: listingData.country,
          city: listingData.city,
          description: listingData.description,
          dailyRate: listingData.rate,
          postalCode: listingData.postalCode,
          image: req.file.buffer,
          location: {"coordinates": listingData.location.split(':').map(Number)}
        });
    
        await newListing.save();
        res.status(201).json({ message: "Listing created successfully", listing: newListing });
      } catch (error) {
        console.error("Error creating listing:", error);
        res.status(500).json({ message: "Failed to create listing" });
      }
});

export default router;