import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { User } from "../models/UserMgmt/User.mdb";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

export class AuthController {
  private static service: UserService = new UserService();

  async resetPassword(req: Request, res: Response): Promise<Response> {
    try {
      return res.status(200).json({ message: "reset" });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async restorePassword(req: Request, res: Response): Promise<Response> {
    try {
      return res.status(200).json({ message: "restore" });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async authenticate(req: Request, res: Response): Promise<Response> {
    try {
      const { username, password } = req.body;
      const user: User = await AuthController.service.get(username);
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!user || !passwordMatch) {
        return res
          .status(404)
          .json({ error: "Error al autenticar el usuario." });
      }

      const token = jwt.sign({ userId: user.id }, "default-secret-key", {
        expiresIn: "6h",
      });

      return res.json({ token });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async validateToken(req: Request, res: Response): Promise<Response> {
    try {
      const { token, user } = req.body;
      console.log(token, user)
      const decoded = jwt.verify(token, "default-secret-key");
      return res.status(200).json({ decoded });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async refreshToken(req: Request, res: Response): Promise<Response> {
    try {
      const { token } = req.body;
      if (!token) {
        return res.status(401).json({ error: "No token provided." });
      }

      const decoded = jwt.verify(token, "default-secret-key");

      return res.status(200).json({ decoded });

    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}
