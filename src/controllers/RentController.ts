import { Request, Response } from "express";
import { RentService } from "../services/RentService";

export class RentController {
  private static service: RentService = new RentService();

  async index(req: Request, res: Response): Promise<any> {
    try {
        const result = await RentController.service.execute(req.body);
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send(err);
    }
  }
}
