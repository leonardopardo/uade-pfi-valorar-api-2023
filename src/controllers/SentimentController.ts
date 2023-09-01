import { Request, Response } from "express";


export class SentimentController {
  async index(req: Request, res: Response): Promise<any> {
    try {
      const static_object = {
        result: "Negative",
        examples: ["https://www.clarin.com/arq/construccion/anos-vigencia-ley-alquileres-1-000-departamentos-oferta-capital_0_Uno1qarEkO.html",
          "https://www.pagina12.com.ar/582649-luz-verde-en-el-senado-para-la-modificacion-de-la-ley-de-alq",
          "https://www.infobae.com/politica/2023/08/23/ley-de-alquileres-con-los-votos-justos-juntos-por-el-cambio-negocia-modificaciones-para-poder-aprobar-su-proyecto/"]
      }
      res.status(200).send(static_object);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}
