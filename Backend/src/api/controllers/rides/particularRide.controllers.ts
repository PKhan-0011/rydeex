// api/v1/ride/:id koi particular id wala chaiye mughe isme okkh!..

import express from "express";
import { prisma } from "../../../db/src/index";
import { Request, Response } from "express";
const app = express();
app.use(express.json());

export const particularRide = async (req: Request, res: Response) => {
  // yha p ayega tera params id jo ki frontend s ayegi okkh!..
  // ye route hoga tera api/v1/riides/:id.. isme s mughe id niklna hai abb dekh kaise niklega ye okkh!..

  const Clientid = Number(req.params.id); // req.params.id jo hai wo return hi tera string karti hai but mai isko Number m likhunga okkh!..

  try {
    // id k basis p check karle ki kon sa client ayega and kon sa nahi okkh!??.
    // aur ye kind of unique type wala hai!..

    const data = await prisma.ride.findUnique({
      where: {
        id: Clientid,
      },
    });

    if (!data) {
      return res.status(404).json({
        message: "Not found",
      });
    }

    return res.status(200).json({
      message: "data Matched",
      data,
    });
  } catch (e) {
    const error = e as Error;
    return res.status(500).json({
      message: "server error!",
      error: error,
      success: false,
    });
  }
};
