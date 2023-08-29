import * as exec from "child_process";
import * as path from "path";

export class RentService {
  private path: string;

  constructor() {
    this.path =  path.resolve(__dirname, "/Users/leonardopardo/Documents/Repos/pfi_anderson_pardo/Price");
  }

  async execute(body: Object): Promise<any> {
    try{
        const result = exec.execSync(`python3 ${this.path}/predictor.py ${this.path}/Input/model_test2.json`);
        return result.toString();
    }catch(err){
        console.log(err);
    }
  }
}
