import express from "express";
import { Router } from "express";
import { createRides } from "../controllers/rides/createRides.controllers";
import { particularRide } from "../controllers/rides/particularRide.controllers";
import { particularRideCanceled } from "../controllers/rides/rideCancel.controllers";
import { completeRide } from "../controllers/rides/completeRide.controllers";
import { getAllRides } from "../controllers/rides/getAllRides.controllers";

const router = Router();

router.post("/", createRides); // isse like na sare ride's like sare cabs dekh sakte hai hamm okkh!..
router.get("/allRides", getAllRides);
router.get("/:id", particularRide); // parans aur query params always get hi hota hai!.. iksa matlb ye hota hai like ki koi particular id wala ride check kar le!..
router.patch("/:id/cancel", particularRideCanceled);
router.patch("/:id/success", completeRide);

export default router;

// patch jo hota hai wo like koi particular chize update karega but put jo hai wo pra resource hi update kar dega okkh!...
