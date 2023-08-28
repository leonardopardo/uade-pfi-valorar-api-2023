import { Request, Response } from "express";


export class SentimentController {
  async index(req: Request, res: Response): Promise<any> {
    try {
      res.status(200).send("Sentiment Controller.");
    } catch (err) {
      res.status(500).send(err);
    }
  }
}
