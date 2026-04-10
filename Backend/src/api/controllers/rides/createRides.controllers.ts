// api/v1/rides post wala hai ye iska matlb generally ye hai ki check all rides okkh!..

import express, { NextFunction } from "express";
import { Request, Response } from "express";
import { createRideSchema } from "../../../validators/rideControllers";
import { prisma } from "../../../db/src/index";

const app = express();
app.use(express.json());

export const createRides = async (req: Request, res: Response) => {
  // mugeh yha p actully sare rides dekhne hai!..
  // post request hai ye to yha p frontend ka bhi kuch role hoga means
  const data = req.body;
  const validData = createRideSchema.safeParse(data);

  try {
    if (!validData.success) {
      return res.status(400).json({
        message: "not valiid data please give some valiid inputs!..",
        errors: validData.error,
      });
    }

    // agar data mil gya hai mughe tab kya karna hai okkh!..
    // mughe iske baad bas store kar dena hai in dataBase okh!..

    const dataNames = await prisma.ride.create({
      data: {
        userId: validData.data?.userId!,
        driverId: validData.data?.driverId!,
        pickUpLat: validData.data?.pickUpLat!,
        pickUpLng: validData.data?.pickUpLng!,
        dropLat: validData.data?.dropLat!,
        dropLng: validData.data?.dropLng!,
      },
    });

    if (!dataNames) {
      return res.status(400).json({
        message: "ride having some issue!",
      });
    }

    return res.status(200).json({
      message: "Ride added successfully!",
      dataNames,
    });
  } catch (e) {
    const error = e as Error;
    return res.status(500).json({
      message: "catch error!",
      error: error,
      success: false,
    });
  }
};
