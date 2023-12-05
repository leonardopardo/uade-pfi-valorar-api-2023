import { Between } from "typeorm";
import { Sentiment } from "../models/Sentiment";
import { MongoDBDatasource } from "../MyDataSoure";

export class SentimentService {
  private static sentimentRepository =
    MongoDBDatasource.getRepository(Sentiment);

  private static calculateAverageSentiment(data: Sentiment[]) {
    let totalPositivity = 0;
    let totalNegativity = 0;
    let totalNeutrality = 0;

    for (const item of data) {
      totalPositivity += item.sentiment_positive;
      totalNegativity += item.sentiment_negative;
      totalNeutrality += item.sentiment_neutral;
    }

    const numItems = data.length;
    const averagePositivity = totalPositivity / numItems;
    const averageNegativity = totalNegativity / numItems;
    const averageNeutrality = totalNeutrality / numItems;

    if (
      averagePositivity > averageNegativity &&
      averagePositivity > averageNeutrality
    ) {
      return "Positive";
    } else if (
      averageNegativity > averagePositivity &&
      averageNegativity > averageNeutrality
    ) {
      return "Negative";
    } else {
      return "Neutral";
    }
  }

  private static getRandomValuesFromArray<T>(array: T[], numberOfValues: number): T[] {
    if (numberOfValues > array.length) {
      throw new Error("Number of values requested exceeds the length of the array");
    }
  
    const shuffledArray = array.slice().sort(() => Math.random() - 0.5);
    return shuffledArray.slice(0, numberOfValues);
  }

  async getSentiment(): Promise<any> {
    try {
      const d = new Date()
    
      d.setDate(d.getDate() - 14)
      
      const news = await SentimentService.sentimentRepository.find();

      // Extraemos los URLs de las noticias
      const examples = [];
      
      for (let i of news) {
        if (i.created_at > d)
          examples.push(i.url);
      }

      // Calculamos el sentimiento en base a las noticias obtenidas
      const result = SentimentService.calculateAverageSentiment(examples);

      const static_object = {
        result: result,
        examples: SentimentService.getRandomValuesFromArray(examples, 5),
      };
      return static_object;

    } catch (err) {
      console.log(err);
    }
  }
}
