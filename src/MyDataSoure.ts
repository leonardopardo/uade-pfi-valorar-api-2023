import "reflect-metadata";
import * as dotenv from 'dotenv';
import path = require('path');
import { DataSource } from "typeorm";
import { Sentiment } from "./models/Sentiment";
import { User } from "./models/UserMgmt/User.mdb";

dotenv.config({
  path: path.resolve(__dirname, '../.env')
})

const PsqlDatasource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: false,
  entities: [],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
});

const MongoDBDatasource = new DataSource({
  type: "mongodb",
  host: process.env.MONGO_HOST,
  port: parseInt(process.env.MONGO_PORT),
  database: process.env.MONGO_DATABASE,
  username: process.env.MONGO_USERNAME,
  password: process.env.MONGO_PASSWORD,
  useUnifiedTopology: true,
  entities: [Sentiment, User],
  synchronize: false
})

const TestDataSource = new DataSource({
  type: "sqlite",
  database: ":memory:",
  dropSchema: true,
  entities: [],
  synchronize: true,
  logging: false
});

export { PsqlDatasource, MongoDBDatasource, TestDataSource }