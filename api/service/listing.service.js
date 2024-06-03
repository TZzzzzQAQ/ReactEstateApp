import {createListing} from "../Dao/listing.dao.js";

export const createNewListingService = async (listingData) => {
    return createListing(listingData);
}