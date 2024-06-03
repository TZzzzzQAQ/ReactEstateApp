import Listing from "../models/listing.model.js";

export const createListing = async (data) => {
    return await new Listing(data).save();
}