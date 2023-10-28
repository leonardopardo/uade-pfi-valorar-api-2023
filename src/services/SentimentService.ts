import { Sentiment } from "../models/Sentiment.mdb";
import { MongoDBDatasource } from "../MyDataSoure";

export class SentimentService{

    private static sentimentRepository = MongoDBDatasource.getRepository(Sentiment)

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

    async getSentiment(): Promise<any> {
        try {
            const news = await SentimentService.sentimentRepository.find();

            // Extraemos los URLs de las noticias
            const examples = []
            for (const obj of news){
              examples.push(obj.url)
            }
        
			// Calculamos el sentimiento en base a las noticias obtenidas
			const result = await SentimentService.calculateAverageSentiment(news)

			const static_object = {
				result: result,
				examples: examples
			  }
			return static_object
        } catch (err) {
          console.log(err);
        }
      }
}