import { Router } from "express";
import { SentimentController } from "../controllers/SentimentController";
import { jwtMiddleware } from "../middlewares/jwtMiddleware";

export class SentimentRouter {
  private controller: SentimentController;
  private prefix: string = "/sentiment";

  constructor() {
    this.controller = new SentimentController();
  }

  public routes(router: Router): void {
    router.get(`${this.prefix}`, this.controller.index);
    router.post(`${this.prefix}/get`, this.controller.index);
  }
}
