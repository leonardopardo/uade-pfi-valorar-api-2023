import * as exec from "child_process";
import { timeStamp } from "console";
import { writeFileSync } from "fs";
import * as path from "path";

export class RentService {
  private path: string;

  constructor() {
    this.path = path.resolve(__dirname, process.env.PREDICTOR_BASE_PATH);
  }

  async execute(body: Object): Promise<any> {
    try {
      
      console.log(`> execute rent service... | ${new Date()}`)

      const timestamp = new Date().getTime();
      const filename = `${timestamp}.json`;

      writeFileSync(`${this.path}/Input/${filename}`, JSON.stringify(body));

      const result = exec.execSync(
        `python3 ${this.path}/predictor.py ${this.path}/Input/${filename}`
      );

      return result.toString();
    } catch (err) {
      console.log(err);
    }
  }
}
