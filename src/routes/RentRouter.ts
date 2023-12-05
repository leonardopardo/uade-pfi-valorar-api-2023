import { Router } from "express";
import { RentController } from "../controllers/RentController";
import { jwtMiddleware } from "../middlewares/jwtMiddleware";

export class RentRouter {
  private controller: RentController;
  private prefix: string = "/rent";

  constructor() {
    this.controller = new RentController();
  }

  public routes(router: Router): void {
    router.post(`${this.prefix}`, this.controller.index);
    router.post(`${this.prefix}/predict`, jwtMiddleware, this.controller.predict);
  }
}
