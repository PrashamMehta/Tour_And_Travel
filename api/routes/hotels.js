import express from "express";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getHotel,
  getHotels,
  updateHotel,
} from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();
router.get("/find/:id", getHotel);
router.post("/createhotel",createHotel);

router.get("/", getHotels);

router.get("/countByCity", countByCity);

router.get("/countByType", countByType);

export default router;
