/* Author: Shubham Patel */
import { NextFunction, Request, Response } from "express";
import { dataBase } from "../dao/connection";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create new listing
export const createListing = [upload.single("image"), async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Check for presence of user id in request body
        if (!req.body.userId) {
            return res.status(400).json({ success: false, message: "User ID missing" });
        }

        // Check for presence of file
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Listing image missing" });
        }

        const listingData = req.body;

        // Check for presence of data relavent to create new listing
        if (!listingData.name || !listingData.streetAddress || !listingData.country ||
            !listingData.city || !listingData.description || !listingData.rate || !listingData.postalCode ||
            !listingData.location || !listingData.type) {
            return res.status(400).json({ success: false, message: "Listing data missing" });
        }

        // Create new listing from listing interface
        const newListing = new dataBase.listings({
            owner: listingData.userId,
            name: listingData.name,
            streetAddress: listingData.streetAddress,
            country: listingData.country,
            city: listingData.city,
            description: listingData.description,
            dailyRate: listingData.rate,
            postalCode: listingData.postalCode,
            image: {
                "data": req.file.buffer.toString('base64'),
                "contentType": req.file.mimetype
            },
            location: { "coordinates": listingData.location.split(':').map(Number) },
            parkingType: listingData.type
        });

        // Saving listing to the database
        await newListing.save();
        return res.status(201).json({ success: true, message: "Listing created successfully" });
    } catch (error) {
        // Handling errors while creating listing
        console.error("Error creating listing: ", error);
        return res.status(500).json({ success: true, message: "Failed to create listing" });
    }
}];

// Edit listing
export const editListing = async (req: Request, res: Response) => {
    try {
        // Check for presence of listing id in request body
        if (!req.body.listingId) {
            return res.status(400).json({ success: false, message: "Listing ID missing" });
        }

        const listingData = req.body;
        const listingID = listingData.listingId;

        // Check for presence of data relavent to edit listing
        if (!listingData.name || !listingData.streetAddress || !listingData.country ||
            !listingData.city || !listingData.description || !listingData.rate || !listingData.postalCode ||
            !listingData.location || !listingData.type) {
            return res.status(400).json({ success: false, message: "Listing data missing" });
        }

        // Updating listing data in database
        await dataBase.listings.updateOne({ _id: listingID }, {
            $set: {
                "name": listingData.name,
                "streetAddress": listingData.streetAddress,
                "country": listingData.country,
                "city": listingData.city,
                "description": listingData.description,
                "dailyRate": listingData.rate,
                "postalCode": listingData.postalCode,
                "location": { "coordinates": listingData.location.split(':').map(Number), type: "Point" },
                "parkingType": listingData.type
            }
        });

        return res.status(201).json({ success: true, message: "Listing updated successfully" });
    } catch (error) {
        // Handling errors while editing listing
        console.error("Error editing listing: ", error);
        return res.status(500).json({ success: false, message: "Failed to update listing" });
    }
}

// Fetching all listings belonging to a particular user
export const getAllListings = async (req: Request, res: Response) => {
    try {
        // Check for presence of user id in request body
        if (!req.body.userId) {
            return res.status(400).json({ success: false, message: "User ID missing" });
        }

        // Fetching all listings from database
        const listings = await dataBase.listings.find({ owner: req.body.userId }).select('name streetAddress country city postalCode');

        return res.status(201).json({ success: true, message: "Listings fetched successfully", data: listings });
    } catch (error) {
        // Handling errors while fetching listings
        console.error("Error fetching listings: ", error);
        return res.status(500).json({ success: false, message: "Failed to fetch listings" });
    }
}

// Fetching a particular listing
export const getListing = async (req: Request, res: Response) => {
    try {
        // Check for presence of listing id in request body
        if (!req.body.listingId) {
            return res.status(400).json({ success: false, message: "Listing ID missing" });
        }

        let listing;

        // If request is for editing listing, then fetch all data except image otherwise fetch all data
        if (req.body.editListing) {
            listing = await dataBase.listings.findOne({ _id: req.body.listingId }).select('-image');
        } else {
            listing = await dataBase.listings.findOne({ _id: req.body.listingId });
        }

        return res.status(201).json({ success: true, message: "Listing fetched successfully", data: listing });
    } catch (error) {
        // Handling errors while fetching listing
        console.error("Error fetching listing: ", error);
        return res.status(500).json({ success: false, message: "Failed to fetch listing" });
    }
}

// Deleting a particular listing
export const deleteListing = async (req: Request, res: Response) => {
    try {
        // Check for presence of listing id in request body
        if (!req.body.listingId) {
            return res.status(400).json({ success: false, message: "Listing ID missing" });
        }

        // Check for presence of user id in request body
        if (!req.body.userId) {
            return res.status(400).json({ success: false, message: "User ID missing" });
        }
        
        // Deleting listing from the database
        const listing = await dataBase.listings.deleteOne({ _id: req.body.listingId });

        // Fetching listings belonging to a particular user
        const listings = await dataBase.listings.find({ owner: req.body.userId });

        return res.status(201).json({ success: true, message: "Listing deleted successfully", data: listings });
    } catch (error) {
        // Handling errors while deleting listing
        console.error("Error deleting listing: ", error);
        return res.status(500).json({ success: false, message: "Failed to delete listing" });
    }
}