import { User } from "../models/UserMgmt/User.mdb";
import * as bcrypt from 'bcryptjs';
import { MongoDBDatasource } from "../MyDataSoure";

export class UserService {

    private static repository = MongoDBDatasource.getRepository(User);

    public async get(username): Promise<User>{
        return await UserService.repository.findOne({where: {username: username}})
    }

    public async store(data): Promise<User>{
        if(await this.get(data.username))
            throw new Error("El usuario que intenta crear ya existe.")

        data.password = await this.hashPassword(data.password);
        
        return await UserService.repository.save(data);
    }

    public async addRequest(username, data, price): Promise<any>{
        const user = await UserService.repository.findOne({where: {username: username}})
        user.usage.usesThisMonth += 1
        data["date"] = new Date()
        data["price"] = price
        user.history.push(data)
        await UserService.repository.save(user)
    }

    private async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
}