import {createNewListingService} from "../service/listing.service.js";

export async function createNewListing(req, res, next) {
    try {
        const newListing = await createNewListingService(req.body);
        res.status(201).json(newListing);
    } catch (e) {
        next(e)
    }
}