import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { User } from "../models/UserMgmt/User.mdb";

export class UserController {
  private static service: UserService = new UserService();

  async index(req: Request, res: Response): Promise<any> {
    try {
      res.status(201).send("User Index");
    } catch (err) {
      res.status(500).json({ error: "User Index Error" });
    }
  }

  async get(req: Request, res: Response): Promise<any> {
    try {
      const user: User = await UserController.service.get(req.query.username);
      if (user) {
        res.status(201).send(user);
      } else {
        res.status(201).send("User not found");
      }
    } catch (err) {
      if (err.code === "23505")
        res.status(400).json({ error: "El email ya existe." });
      else res.status(500).json({ error: "Error al crear el usuario." });
    }
  }

  async getHistory(req: Request, res: Response): Promise<any> {
    try {
      const { username } = req.body;
      const { history } = await UserController.service.get(username);
      res.status(200).send(history);
    } catch (err) {
      res.status(500).json({ error: "Error al obtener el historial." });
    }
  }

  async getUsage(req: Request, res: Response): Promise<any> {
    try {
      const { username } = req.body;
      const { usage } = await UserController.service.get(username);
      res.status(200).send(usage);
    } catch (err) {
      res.status(500).json({ error: "Error al obtener el uso." });
    }
  }

  async register(req: Request, res: Response): Promise<any> {
    try {
      const user: User = await UserController.service.store(req.body);
      res.status(201).send({ message: "Usuario creado correctamente." });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
