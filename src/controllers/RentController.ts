import { Request, Response } from "express";

export class RentController {
  async index(req: Request, res: Response): Promise<any> {
    try {
        res.status(200).send("Rent Controller.");
    } catch (err) {
        res.status(500).send(err);
    }
  }
}
