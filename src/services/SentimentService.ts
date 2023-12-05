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

  async getSentiment(): Promise<any> {
    try {
      const d = new Date()
      const today = new Date()
      d.setDate(d.getDate() - 14)
      const news = await SentimentService.sentimentRepository.find();

      //const news = await SentimentService.sentimentRepository.find()
      const slice = news.slice(0, 5);

      // Extraemos los URLs de las noticias
      const examples = [];
      for (const obj of slice) {
        examples.push(obj.url);
      }

      // Calculamos el sentimiento en base a las noticias obtenidas
      const result = SentimentService.calculateAverageSentiment(news);
      console.log(news)

      const static_object = {
        result: result,
        examples: examples,
      };
      return static_object;
    } catch (err) {
      console.log(err);
    }
  }
}
