// Create class UserService

import { AppDataSource } from "../app-data-source"
import { User } from '../entities/user/users.entity';

export class UserService {

    async getUsers() {
        try {
            const users = await AppDataSource.getRepository(User).find();
            return users;
        } catch (error) {
            throw new Error('Error while fetching users');
        }
    }

    async getUserById(id: number) {
        try {
            const user = await AppDataSource.getRepository(User).findOneBy({ id });
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async createUser(userData: { email: string; username: string; password: string; }) {
        try {
            const userExist = await AppDataSource.getRepository(User).findOneBy({ email: userData.email });
            if (userExist) {
                throw new Error('User already exists');
            }

            const newUser = AppDataSource.getRepository(User).create(userData);
            const savedUser = await AppDataSource.getRepository(User).save(newUser);
            return savedUser;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updateUser(id: number, updateData: Partial<User>) {
        try {
            const user = await AppDataSource.getRepository(User).findOneBy({ id });
            if (!user) {
                throw new Error('User not found');
            }

            AppDataSource.getRepository(User).merge(user, updateData);
            const updatedUser = await AppDataSource.getRepository(User).save(user);
            return updatedUser;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteUser(id: number) {
        try {
            const user = await AppDataSource.getRepository(User).findOneBy({ id });
            if (!user) {
                throw new Error('User not found');
            }

            await AppDataSource.getRepository(User).delete({ id });
            return { message: 'User deleted successfully' };
        } catch (error) {
            throw new Error(error.message);
        }
    }
    
}


