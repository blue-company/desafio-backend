import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface PayloadRequest {
  sub: string;
}

export async function ensureAuthenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      message: "Token is missing.",
    });
  }

  const [_, token] = authorization.split(" ");

  try {
    const { sub } = verify(
      token,
      process.env.JWT_SECRET ?? "unit-test"
    ) as PayloadRequest;

    req.user_id = sub;

    return next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token.",
    });
  }
}
