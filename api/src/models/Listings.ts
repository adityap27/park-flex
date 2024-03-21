import mongoose from "mongoose";

interface IListing extends mongoose.Document {
    owner: mongoose.Types.ObjectId,
    name: string,
    streetAddress: string,
    country: string,
    city: string,
    description: string,
    dailyRate: number,
    postalCode: string,
    image: {
        data: Buffer;
        contentType: string;
    }
    location: {
        type: string;
        coordinates: [number, number];
    };
}

const ListingSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    name: {
        type: String,
        required: true
    },
    streetAddress: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dailyRate: {
        type: Number,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    image: {
        data: {
            type: Buffer,
            required: true
        },
        contentType: {
            type: String,
            required: true
        }
    },
    location: {
        type: {
            type: String,
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            default: [44.6356313, -63.5951737],
            required: true
        }
    }
}, { timestamps: true });

// index for geospatial queries
ListingSchema.index({ location: '2dsphere' });

export const Listings = mongoose.model<IListing>("Listings", ListingSchema);
export {IListing};