// api/v1/ride/:id/success koi particular id wala chaiye mughe isme okkh!..
import express from "express";
import { Request, Response } from "express";
import { prisma } from "../../../db/src/index";
const app = express();
app.use(express.json());

export const completeRide = async (req: Request, res: Response) => {
  const rideId = Number(req.params.id);
  const { pickUpLat, pickUpLng, dropLat, dropLng, status } = req.body;

  if (isNaN(rideId)) {
    return res.status(400).json({ message: "Invalid ride ID!" });
  }

  try {
    const updatedRide = await prisma.ride.update({
      where: { id: rideId },
      data: { pickUpLat, pickUpLng, dropLat, dropLng, status: "COMPLETE" },
    });

    return res.status(200).json({
      message: "Ride updated successfully!",
      ride: updatedRide,
    });
  } catch (e) {
    const error = e as Error;

    // Agar record exist nahi karta → Prisma throws error
    if (error.message.includes("Record to update not found")) {
      return res.status(404).json({ message: "Ride not found!" });
    }

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
// yha p update hongi chize okkh!..
// and update m bhi hamm frontend s chize lete hai okkh!..
