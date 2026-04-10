import express from "express";
import { Request, Response } from "express";
import { prisma } from "../../../db/src/index";

export const ownDetails = async (req: Request, res: Response) => {
  const dataBaseId = (req as any).user;
  const id = dataBaseId?.id;

  if (!id) {
    return res.status(401).json({
      message: "Unauthorzed!..",
    });
  }
  // agar id miil gayi mughe tab kya karna hai okkh!...
  // abb dataBase m check kar lenge ki te id dataBase m hai bhi ya nhai okkh!
  // agar joga to data sara returne karwa denge haina!..
  try {
    // simple sa logic ye bhi hai yha p like ki id jo hai wo unique hai agar unique hoga to mai
    // ek hi dataBase excess kar paunga jisse login hua hoga okkh!..
    const authenticatedData = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    // abb simple hai ye isme authentication m sirf tega id userName email yahi hoga simple sa bass okkh!.

    if (!authenticatedData) {
      // iska mtlb yahi hoga sirf ki data aya hi nahi hai authenticated hi nahi hai okkh!..
      return res.status(401).json({
        message: "unauthorized pls login/SignUp first",
        success: false,
      });
    }

    // agar authorized hai tab kya krna hai!.. fir to thik hai sara data client side p chla jayega
    // only important data!..

    return res.status(200).json({
      message: { authenticatedData },
      success: true,
    });

    // findFirst kar ya kuch bhi kar wo ek hi ayega bcz isme!.. hamm id unique hai tahts why okkh!..
  } catch (e) {
    const error = e as Error;
    return res.status(500).json({
      message: "error ki dikkate hai isme!...",
      success: false,
    });
  }
};

// yha s jo bhi hai wo sari details dikhayega frontend p okkh!..
