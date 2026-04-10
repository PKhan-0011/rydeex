// api/v1/ride/:id/cancel koi particular id wala chaiye mughe isme okkh!..
import express from "express";

const app = express();
app.use(express.json());

import { Request, Response } from "express";
import { prisma } from "../../../db/src/index";

export const particularRideCanceled = async (req: Request, res: Response) => {
  const rideId = Number(req.params.id);

  if (isNaN(rideId)) {
    return res.status(400).json({ message: "Invalid ride ID!" });
  }

  try {
    const cancelledRide = await prisma.ride.update({
      where: { id: rideId },
      data: { status: "CANCELED" }, // yaha bas status change ho raha hai
    });

    return res.status(200).json({
      message: "Ride cancelled successfully!",
      ride: cancelledRide,
    });
  } catch (e) {
    const error = e as Error;

    if (error.message.includes("Record to update not found")) {
      return res.status(404).json({ message: "Ride not found!" });
    }

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
