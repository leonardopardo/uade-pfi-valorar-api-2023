import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

export class AuthController {
  private static service: AuthService = new AuthService();

  async authenticate(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      return res.status(200).json({ email, password });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}
