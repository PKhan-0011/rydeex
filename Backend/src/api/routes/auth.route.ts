import express from "express";
import { Router } from "express";
import { signIn } from "../controllers/auth/signIn.controllers";
import { signUp } from "../controllers/auth/signUp.controllers";
import { ownDetails } from "../controllers/auth/me.controllers";
import { authMiddleware } from "../../middleware/authMiddleware";

const router = Router();

router.post("/signUp", signIn);
router.post("/signIn", signUp);
router.get("/me", authMiddleware, ownDetails);

export default router;

// protected routes p auth middleware lagta hai okkh! and jab authMiddleware lagega!..
// to fir is case m req.user.id s dataBase ki id hamm  niaklenge hi nikalnge okkh!..
