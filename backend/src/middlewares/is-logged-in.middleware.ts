import express from "express";
import jwt from "jsonwebtoken";

import { IUser, User } from "../db_schema/user.schema";

declare global {
  namespace Express {
    interface Request {
      signedInUser: IUser | null;
    }
  }
}

export const isLoggedIn = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
):Promise<void> => {
    const token = req.cookies["token"];
    if (!token) {
      res.status(401).json({ ok: false, msg: "Unauthorized" });
      return;
    }

    const decodedToeken: any = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!decodedToeken || !decodedToeken.userId) {
      res.status(401).json({ ok: false, msg: "Unauthorized" });
      return;
    }

    const isUser = await User.findById(decodedToeken.userId);
    if (!isUser) {
      res.status(401).json({ ok: false, msg: "Unauthorized" });
      return;
    }

    req.signedInUser = isUser;

    next();
};
