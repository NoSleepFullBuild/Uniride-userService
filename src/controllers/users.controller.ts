import { Request, Response } from 'express';
import { UserService } from '../services/users.service';

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async getUsers(req: Request, res: Response) {
        try {
            const users = await this.userService.getUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    async getUserById(req: Request, res: Response) {
        try {
            const user = await this.userService.getUserById(parseInt(req.params.id));
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    async createUser(req: Request, res: Response) {
        try {
            const user = await this.userService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    async updateUser(req: Request, res: Response) {
        try {
            const user = await this.userService.updateUser(parseInt(req.params.id), req.body);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    async deleteUser(req: Request, res: Response) {
        try {
            await this.userService.deleteUser(parseInt(req.params.id));
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            if (error.message === 'User not found') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }
    
}
