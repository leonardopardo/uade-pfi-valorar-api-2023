import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { User } from "../models/UserMgmt/User.mdb";

export class UserController {
	private static service: UserService = new UserService();


	async index(req: Request, res: Response): Promise<any> {
		try{
			res.status(201).send("User Index")
		}catch(err){
			res.status(500).json({error: 'User Index Error'});
		}
	}

	async get(req: Request, res: Response): Promise<any> {
		try{
			const user: User = await UserController.service.get(req.query.username);
			if(user){
				res.status(201).send(user)
			}
			else{
				res.status(201).send("User not found")
			}
		}catch(err){
			if(err.code === '23505')
				res.status(400).json({error: 'El email ya existe.'});
			else
				res.status(500).json({error: 'Error al crear el usuario.'});
		}
	}

	async store(req: Request, res: Response): Promise<any> {
		try{
			const user: User = await UserController.service.store(req.body);
			res.status(201).send(user)
		}catch(err){
			if(err.code === '23505')
				res.status(400).json({error: 'El email ya existe.'});
			else
				res.status(500).json({error: 'Error al crear el usuario.'});
		}
	}
}
