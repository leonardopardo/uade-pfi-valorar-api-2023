import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { jwtMiddleware } from "../middlewares/jwtMiddleware";

export class AuthRouter {
  private controller: AuthController;
  private prefix: string = "/auth";

  constructor() {
    this.controller = new AuthController();
  }

  public routes(router: Router): void {
    router.post(`${this.prefix}/login`, this.controller.authenticate);
    router.post(`${this.prefix}/restore`, this.controller.restorePassword);
    router.post(`${this.prefix}/reset`, this.controller.resetPassword);
    router.post(`${this.prefix}/validate`, jwtMiddleware, this.controller.validateToken);
  }
}
