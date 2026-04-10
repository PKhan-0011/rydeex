import express from "express";
import { Request, Response } from "express";
import { prisma } from "../../../db/src";
const app = express();
app.use(express.json());

export const updatesDriverAvailability = async (
  req: Request,
  res: Response,
) => {
  const driverId = Number(req.params.id);

  if (isNaN(driverId)) {
    return res.status(400).json({ message: "Invalid ride ID!" });
  }

  // is id k basis p hame dataBase k andar check krna hai ki chize hai bhi ya nahi okkkh!..
  try {
    const cancelledRide = await prisma.ride.update({
      where: { id: driverId },
      data: { status: "CANCELED" }, // yaha bas status change ho raha hai
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

// patch hai yha p tera means koi ek particular hi item change karna hai okh!>.
// /driver/:id aisa kuch aa rha hai!..

// location update kar rha hai ye hamara okkh!..
