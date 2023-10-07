import * as express from "express";
import * as dotenv from "dotenv";
import * as cors from "cors";
import { DataSource } from "typeorm";
import { MongoDBDatasource, PsqlDatasource } from "./MyDataSoure";
import bodyParser = require("body-parser");
import path = require("path");
import "reflect-metadata";
import { SentimentRouter } from "./routes/SentimentRouter";
import { RentRouter } from "./routes/RentRouter";


class App {
  public app: express.Application;
  public corsOptions: cors.CorsOptions;
  public router: express.Router;

  constructor() {
    // set variables
    this.app = express();
    this.router = express.Router();

    // config envirnoment file
    dotenv.config({
      path: path.resolve(__dirname, "../.env"),
    });

    // setting uses
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // initialize resources
    this.initializeRoutes();

    this.initializeDatabase();

  }

  private initializeRoutes() {
    this.app.use(bodyParser.json());
    this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.log(`Received ${req.method} request from ${req.ip} to ${req.originalUrl}`);
      next(); // Continue processing the request
    });
    this.app.use("/", this.router);
    
    new SentimentRouter().routes(this.router);
    new RentRouter().routes(this.router);
  
  }

  private initializeDatabase() {
    // initialize database
    const PostgresDataSource: DataSource = PsqlDatasource;
    PostgresDataSource.initialize();

    const MongoDataSource: DataSource = MongoDBDatasource;
    MongoDataSource.initialize()
  }

  public listen(): void {
    this.app.listen();
  }
}
export default new App().app;
