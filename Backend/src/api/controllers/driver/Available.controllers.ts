import express from "express";
import { Request, Response } from "express";
import { prisma } from "../../../db/src";
import { CheckDriverAvailability } from "../../../db/generated/prisma/enums";
const app = express();
app.use(express.json());

export const All_Available_Drivers = async (req: Request, res: Response) => {
  try {
    // yha p wahi values ayengi saru jo true hongi okkh!..
    const driver = await prisma.driver.findMany({
      where: {
        isAvailable: CheckDriverAvailability.TRUE,
      },
    });

    // findMany jo hota hai wo hame array return karke deta hai aur wo null nahi deta
    // ya size == 0 dega ya array full dega khali null nahi dega okjg!
    // that's the reason hamm !driver aisa nahi likhte okkh!..

    if (driver.lebgth == 0) {
      return res.status(200).json({
        data: [],
        message: "driver box are empty...",
        success: true,
      });
    }

    return res.status(200).json({
      message: driver,
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
