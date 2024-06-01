import jwt from "jsonwebtoken";
import dotev from "dotenv";
import { TokenPayload } from "../models/User";

dotev.config();

export class TokenManager {
  public createToken = (payload: TokenPayload): string => {
    const token = jwt.sign(payload, process.env.JWT_KEY as string, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return token;
  };

  public getPayload = (token: string): TokenPayload | null => {
    try {
      const payload = jwt.verify(token, process.env.JWT_KEY as string);

      return payload as TokenPayload;
    } catch (error) {
      return null;
    }
  };
}