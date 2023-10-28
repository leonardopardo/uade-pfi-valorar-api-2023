import { Request, Response } from "express";
import { SentimentService } from "../services/SentimentService";
import { Sentiment } from "../models/Sentiment.mdb";

export class SentimentController {

  private static service: SentimentService = new SentimentService();

  async index(req: Request, res: Response): Promise<any> {
    try {
      const result = await SentimentController.service.getSentiment();
      res.status(200).send(result);
    } catch (err) {
      res.status(500).send(err);
    }
  }

}
