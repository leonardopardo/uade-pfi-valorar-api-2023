import { Request, Response } from "express";
import { SentimentService } from "../services/SentimentService";
import { Sentiment } from "../models/Sentiment.mdb";

export class SentimentController {

  private static service: SentimentService = new SentimentService();

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
  
    if (averagePositivity > averageNegativity && averagePositivity > averageNeutrality){return "Positive"}
    else if (averageNegativity > averagePositivity && averageNegativity > averageNeutrality){return "Negative"}
    else {return "Neutral"}

  }

  async index(req: Request, res: Response): Promise<any> {
    try {
      console.log("Execute sentiment service")
      const news = await SentimentController.service.findAll();

      // Extraemos los URLs de las noticias
      const examples = []
      for (const obj of news){
        examples.push(obj.url)
      }

      // Calculamos el sentimiento en base a las noticias obtenidas
      const result = await SentimentController.calculateAverageSentiment(news)

      const static_object = {
        result: result,
        examples: examples
      }
      res.status(200).send(static_object);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}
