import express from "express";
import {verifyToken} from "../middleWare/verifyUser.middleware.js";
import {createNewListing} from "../controllers/listing.controller.js";

const listing = express.Router();
listing.post('/create', verifyToken, createNewListing);
