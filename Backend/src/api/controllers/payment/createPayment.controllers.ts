// api/v1/payments create all paymenst hai y!

import express from "express";
import { Request, Response } from "express";
import { prisma } from "../../../db/src";
const app = express();
app.use(express.json());

export const createPayment = async (req: Request, res: Response) => {
  // mai yha p like na payment create karna hai!...
  const { amount, rideId } = req.body;

  if (amount != isNaN) {
    return res.status(400).json({
      message: "amount number type ka hai hi nahi!..",
      success: false,
    });
  }
  try {
    const data = await prisma.payment.create({
      data: {
        amount: amount,
        ride: {
          connect: {
            id: rideId,
          },
        },
      },
    });

    return res.json({
      message: "data sara ja chuka hai in db!..",
      data,
      success: true,
    });
  } catch (e) {
    const error = e as Error;
    return res.status(500).json({
      message: "error ki dikkate hai isme!...",
      success: false,
    });
  }
};
