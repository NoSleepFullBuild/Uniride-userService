// Create class UserService

import { AppDataSource } from "../app-data-source"
import { User } from '../entities/user/user.entity';

export class UserService {

    async getUsers() {
        const users = await AppDataSource.getRepository(User).find()
        return users;
    }

    async getUser(id: number) {
        const user = await AppDataSource.getRepository(User).findOneBy({
            id: id
        })
        return user;
    }

    async createUser(user: User) {
        const userEntity = await AppDataSource.getRepository(User).create(user)
        const results = await AppDataSource.getRepository(User).save(userEntity)
        return results;
    }

    async updateUser(user: User){
        const userEntity = await AppDataSource.getRepository(User).findOneBy({
            id: user.id
        })
        
        AppDataSource.getRepository(User).merge(userEntity, user)

        const results = await AppDataSource.getRepository(User).save(userEntity)
        return results;
    }

    async deleteUser(id: number) {
        const results = await AppDataSource.getRepository(User).delete(id)
        return results;
    }
}


