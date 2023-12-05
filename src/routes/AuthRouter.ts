import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

export class AuthRouter {
  private controller: AuthController;
  private prefix: string = "/auth";

  constructor() {
    this.controller = new AuthController();
  }

  public routes(router: Router): void {
    router.post(`${this.prefix}/login`, this.controller.authenticate);
  }
}
