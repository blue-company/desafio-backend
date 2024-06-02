import jwt from "jsonwebtoken";
import dotev from "dotenv";
import { TokenPayload } from "../models/User";
import { medicaAppointmentTP } from "../models/medicalAppointment";

dotev.config();

export class TokenManager {
  public createToken = (payload: TokenPayload | medicaAppointmentTP): string => {
    const token = jwt.sign(payload, process.env.JWT_KEY as string, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return token;
  };

  public getPayload = (token: string): TokenPayload | medicaAppointmentTP | null => {
    try {
      const payload = jwt.verify(token, process.env.JWT_KEY as string);

      return payload as TokenPayload | medicaAppointmentTP;
    } catch (error) {
      return null;
    }
  };
}