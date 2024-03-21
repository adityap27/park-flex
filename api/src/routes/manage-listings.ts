import express, { Request, Response } from "express"
import { dataBase } from "../dao/connection";
import multer from 'multer';
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/create', upload.single('image'), async (req: Request, res: Response) => {
    try {
        if(!req.body.userId) {
          res.status(400).json({ success: false, message: "User ID missing" });
          return;
        }

        if(!req.file) {
          res.status(400).json({ success: false, message: "Listing image missing" });
          return;
        }
    
        const listingData = req.body;

        if(!listingData.name || !listingData.streetAddress || !listingData.country ||
          !listingData.city || !listingData.description || !listingData.rate || !listingData.postalCode ||
          !listingData.location) {
            res.status(400).json({ success: false, message: "Listing data missing" });
            return;
        }
    
        const newListing = new dataBase.listings({
          owner: listingData.userId,
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
        res.status(201).json({ success: true, message: "Listing created successfully" });
      } catch (error) {
        console.error("Error creating listing: ", error);
        res.status(500).json({ success: true, message: "Failed to create listing" });
      }
});

router.put('/edit', async (req: Request, res: Response) => {
  try {
      if(!req.body.listingId) {
        res.status(400).json({ success: false, message: "Listing ID missing" });
        return;
      }

      const listingData = req.body;
      const listingID = listingData.listingId;

      if(!listingData.name || !listingData.streetAddress || !listingData.country ||
        !listingData.city || !listingData.description || !listingData.rate || !listingData.postalCode ||
        !listingData.location) {
          res.status(400).json({ success: false, message: "Listing data missing" });
          return;
      }
  
      await dataBase.listings.updateOne({_id: listingID}, {$set: {
        "name": listingData.name,
        "streetAddress": listingData.streetAddress,
        "country": listingData.country,
        "city": listingData.city,
        "description": listingData.description,
        "dailyRate": listingData.rate,
        "postalCode": listingData.postalCode,
        "location": {"coordinates": listingData.location.split(':').map(Number), type: "Point"}
      }});

      res.status(201).json({ success: true, message: "Listing updated successfully"});
    } catch (error) {
      console.error("Error editing listing: ", error);
      res.status(500).json({ success: false, message: "Failed to update listing" });
    }
});

router.post('/get-all', async (req: Request, res: Response) => {
  try {
      if(!req.body.userId) {
        res.status(400).json({ success: false, message: "User ID missing" });
        return;
      }
  
      const listings = await dataBase.listings.find({owner: req.body.userId});

      res.status(201).json({ success: true, message: "Listings fetched successfully", data: listings});
    } catch (error) {
      console.error("Error fetching listings: ", error);
      res.status(500).json({ success: false, message: "Failed to fetch listings" });
    }
});

export default router;