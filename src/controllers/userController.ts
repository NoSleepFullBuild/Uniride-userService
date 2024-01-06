import { Request, Response } from 'express';
import { UserService } from '../services/userServices';

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async getUsers(req: Request, res: Response) {
        try {
            const users = await this.userService.getUsers();
            res.json(users);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async getUser(req: Request, res: Response) {
        try {
            const user = await this.userService.getUser(parseInt(req.params.id));
            if (user) {
                res.json(user);
            } else {
                res.status(404).send('User not found');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async createUser(req: Request, res: Response) {
        try {
            const user = await this.userService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const user = await this.userService.updateUser(req.body);
            res.json(user);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const result = await this.userService.deleteUser(parseInt(req.params.id));
            res.status(204).send(result);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}
