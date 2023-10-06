import { Sentiment } from "../models/Sentiment.mdb";
import { MongoDBDatasource } from "../MyDataSoure";

export class SentimentService{

    private static sentimentRepository = MongoDBDatasource.getRepository(Sentiment)

    async findAll(): Promise<Sentiment[]> {
        try {
            return SentimentService.sentimentRepository.find();
        } catch (err) {
          console.log(err);
        }
      }
}