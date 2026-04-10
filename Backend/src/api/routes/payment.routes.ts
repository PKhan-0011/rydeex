import express from "express";
import { Router } from "express";
import { createPayment } from "../controllers/payment/createPayment.controllers";
import { allRidesPayment } from "../controllers/payment/allPayments.controllers";

const router = Router();

router.post("/payments", createPayment); // isse like na sare ride's like sare cabs dekh sakte hai hamm okkh!..
router.get("/:rideId", allRidesPayment);
export default router;
