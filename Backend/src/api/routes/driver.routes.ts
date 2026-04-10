import express from "express";
import { Router } from "express";
import { All_Available_Drivers } from "../controllers/driver/Available.controllers";
import { updatesLocations } from "../controllers/driver/upadateDrivers.controllers";
import { updatesDriverAvailability } from "../controllers/driver/checkStatus.controllers";

const router = Router();

router.get("/available", All_Available_Drivers); // isse like na sare ride's like sare cabs dekh sakte hai hamm okkh!..
router.patch("/:id/location", updatesLocations);
router.patch("/:id/status", updatesDriverAvailability);

export default router;
