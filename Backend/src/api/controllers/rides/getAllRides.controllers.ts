// ye get wala hai means isme chize frontend s nahi ayegngi okkh!.. hame infect frontend p den padega!..

import express from "express";
import { Request, Response } from "express";
import { prisma } from "../../../db/src/index";
const app = express();
app.use(express.json());

export const getAllRides = async (req: Request, res: Response) => {
  try {
    const data = await prisma.ride.findMany({
      take: 50,
      skip: 0,
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({
      message: "all rides data!",
      data,
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

// findMany s array aa rha hota hai okkh!..
