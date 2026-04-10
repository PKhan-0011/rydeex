import express from "express";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());

const JWT_SECRET = process.env.JWT_SECRET!;

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies?.token;

  try {
    if (!token) {
      return res.status(401).json({
        message: "Token missing..",
      });
    }

    // but agar token aa gya hai tab mughe actaully na verify karna hai is token ko okkh!..

    const verifiedToken = jwt.verify(token, JWT_SECRET) as {
      id: number;
    };

    // ye jo type de rha hu mai as {id: number} ye exactly maine jwt.sign() me aisa kuch hi diya tha.
    // tabhi mai yha p id hi lunga other wiise role bhi ata hai okkh!..

    // iska verify ka matlb ye hota hai na like ki chize aage send karnii hoti hai okkh!..
    (req as any).user = verifiedToken;
    next();
  } catch (e) {
    const error = e as Error;
    return res.status(500).json({
      message: "Invalid Token",
      error: error,
    });
  }
};

// req k andar req.body, req.josn, req.cokies ye sab chize ati hai req.user, req.email req.id ye sab
// chize nahi ati hai okkh!..

// authMiddleware k andar req.user.id hai jo ki hamne signIn p tokem k andar store kiya tha
// and uske baad jab bhi jwt.verify hoga to token aa jayega middleware p okkh! and wahi req.user.id
// se hi hamm id niklanege aur wo dataBase ki hi id hogi okkh!..
