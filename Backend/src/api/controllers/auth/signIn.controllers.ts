import express from "express";
import { Request, Response } from "express";
import { signInSchema } from "../../../validators/signIn";
import { prisma } from "../../../db/src";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const app = express();

app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET!;

export const signIn = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    // iske 4-5 steps hai bass!
    const result = signInSchema.safeParse(body);

    if (!result.success) {
      return res.status(400).json({
        message: "clinet error data not match!",
      });
    }

    // agar data thik hua tab kya karna hai  okkh!..
    // check ye dataBase m exist karta hai ya nahi okkh!..

    const checkAvail = await prisma.user.findUnique({
      where: {
        email: result.data.email,
      },
    });

    if (!checkAvail) {
      return res.status(400).json({
        message: "data not in the dataBase!.. plesae signUp first!",
        success: false,
      });
    }

    // avaible hai abb yha s password ko hash karo okkh!.

    const isTrue = await bcrypt.compare(
      result.data.password,
      checkAvail.password,
    );

    if (!isTrue) {
      return res.status(400).json({
        message: "password not match!..",
        success: false,
      });
    }

    // agar sabhi chize true hai tab yha s token create karna hai  okkh!.. and us token ko cookies k andar
    // rakhna hai!..

    const token = jwt.sign({ id: checkAvail.id }, JWT_SECRET);

    // abb aisa ho hi nahi skta ki token ayega ji nahi wo oobv ayega thats why isko cookies m store karo okkh!..

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
    });

    return res.status(200).json({
      message: "token and signIn done successfully!",
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
