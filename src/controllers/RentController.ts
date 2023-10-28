import { Request, Response } from "express";
import { RentService } from "../services/RentService";
import { SentimentService } from "../services/SentimentService";

export class RentController {
  private static service: RentService = new RentService();
  private static sentimentService: SentimentService = new SentimentService()

  async index(req: Request, res: Response): Promise<any> {
    try {
        const result = {
          price: parseInt(await RentController.service.execute(req.body)),
          sentiment: await RentController.sentimentService.getSentiment()
        } 
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send(err);
    }
  }
}
