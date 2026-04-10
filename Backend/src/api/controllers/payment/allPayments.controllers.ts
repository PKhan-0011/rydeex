import express from "express";
import { Request, Response } from "express";
import { prisma } from "../../../db/src";
const app = express();
app.use(express.json());

export const allRidesPayment = async (req: Request, res: Response) => {
  // mai yha p like na payment create karna hai!..
  try {
    const data = await prisma.payment.findMany({});

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
