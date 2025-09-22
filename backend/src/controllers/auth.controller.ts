import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Models
import { User } from "../db_schema/user.schema";

// Utils
import { asyncRequestHandler } from "../utils/asyncRequestHandler";
import AppError from "../utils/appError";
import { SendMail } from "../utils/sendMail";
import { emailVerification, welcomeEmail } from "../config/email-templates";

const signup = async (req: Request, res: Response): Promise<void> => {
  const { email, password, name } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({
    email: email.toLowerCase(),
  });
  if (existingUser) {
    throw new AppError("User already exists", 400);
  }
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser = await User.create({
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
  }); // Exclude password from returned user

  if (!newUser) {
    throw new AppError("Error creating user", 500);
  }

  const verificationToken = jwt.sign(
    { userId: newUser._id },
    process.env.JWT_SECRET as string,
    { expiresIn: "5m", algorithm: "HS512" }
  );

  const isVerificationEmailSent: boolean = await SendMail(
    newUser.email,
    "Email Verification",
    emailVerification(
      newUser.name,
      `${process.env.SERVER}/api/auth/verify-email?token=${verificationToken}`,
      new Date().getFullYear().toString()
    )
  );

  if (!isVerificationEmailSent) {
    res.status(500).json({
      ok: false,
      msg: "User created but failed to send verification email.",
    });
    return;
  }

  res.status(201).json({
    ok: true,
    msg: "User created successfully. Please check your email to verify your account.",
  });
};

const verifyEmail = async (req: Request, res: Response): Promise<void> => {
  const { token } = req.query;

  if (!token || typeof token !== "string") {
    throw new AppError("Invalid token", 400);
  }

  let decodedToken: any;
  decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
  if (!decodedToken || !decodedToken.userId) {
    throw new AppError("Invalid token or link expired.", 400);
  }

  const user = await User.findByIdAndUpdate(decodedToken.userId, {
    $set: { is_verified: true },
  });
  if (!user) {
    throw new AppError("Unable to verify your email.", 404);
  }

  const isWelcoemEmailSent: boolean = await SendMail(
    user.email,
    "Welcome to crewneruo.ai",
    welcomeEmail(user.name, new Date().getFullYear().toString())
  );

  if (!isWelcoemEmailSent) {
    res.status(500).json({
      ok: false,
      msg: "User created but failed to send welcome email.",
    });
    return;
  }

  res.status(200).json({
    ok: true,
    msg: "Email verified successfully",
  });
  return;
};


const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.query;
    if (!email || !password || typeof email !== "string" || typeof password !== "string") {
        throw new AppError("Email and password are required", 400);
    }
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
        throw new AppError("Invalid email or password", 401);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new AppError("Invalid email or password", 401);
    }
    if (!user.is_verified) {
        throw new AppError("Please verify your email before logging in", 403);
    }
    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET as string,
        { expiresIn: "30d", algorithm: "HS512" }
    );

    if(process.env.NODE_ENV === 'production'){
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });
    }

    res.status(200).json({
        ok: true,
        msg: "Login successful",
        token
    })
}



export const SignUp = asyncRequestHandler({ fn: signup });
export const VerifyEmail = asyncRequestHandler({ fn: verifyEmail });
export const Login = asyncRequestHandler({ fn: login });
