import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { jwtMiddleware } from "../middlewares/jwtMiddleware";

export class UserRouter {
  private controller: UserController;
  private prefix: string = "/user";

  constructor() {
    this.controller = new UserController();
  }

  public routes(router: Router): void {
    router.get(`${this.prefix}`, this.controller.get);
    router.post(`${this.prefix}`, this.controller.register);
    router.post(`${this.prefix}/history`, this.controller.getHistory);
    router.post(`${this.prefix}/usage`, this.controller.getUsage);
  }
}
