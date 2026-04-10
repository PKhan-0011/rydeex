import express from "express";
import { signUpSchema } from "../../../validators/signUp";
import { Request, Response } from "express";
import { prisma } from "../../../db/src";
import bcrypt from "bcrypt";
const app = express();
app.use(express());

export const signUp = async (req: Request, res: Response) => {
  // sabse pehle yha p frontend s chheck karna padega ki yha p like data aa bhi rha hai ya nahi okkh!..

  try {
    const body = req.body();
    const result = signUpSchema.safeParse(body);

    if (!result.success) {
      return res.status(400).json({
        message: result.error,
        success: false,
      });
    }

    // agar ye data aa gya like to mai check karunga ki ye dataBase m already exist t nahi karta na ?
    // check first ki ye dataBase m exist to nahi karta na > already agar karega to mai return false karung okkh!..

    const checkExisting = await prisma.user.findUnique({
      where: {
        email: result.data.email,
      },
    });

    if (checkExisting) {
      // iska matlb ye hai ki ye exist karta hai okkh!
      return res.status(400).json({
        message: "data exist! Please Login",
      });
    }

    // agar exist nahi karta to mai hash karunga password and dataBase m store karwa dunga thik!..

    const hashedPassword = await bcrypt.hash(result.data.password, 10);

    // abb isko dataBase m daldo okkh!..
    const dataInDb = await prisma.user.create({
      data: {
        email: result.data.email,
        password: hashedPassword,
        username: result.data.userName,
      },
    });

    res.status(201).json({
      message: dataInDb,
      success: true,
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
