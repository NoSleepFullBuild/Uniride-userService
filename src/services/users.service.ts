// Create class UserService

import e = require("express");
import { AppDataSource } from "../app-data-source"
import { User } from "@nosleepfullbuild/uniride-library/dist/entity/user/user.entity";

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

    async getUserByEmail(email: string) {
        try {
            const user = await AppDataSource.getRepository(User).findOneBy({ email });
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async createUser(data: { 
        authId: number,
        firstname: string, 
        lastname: string, 
        email: string; 
        username: string; 
        password: string; 
        role: string,
        phoneNumber: string, 
        token: string
    }) {

        try {
            const userExist = await AppDataSource.getRepository(User).findOneBy({ email: data.email });
            
            if (userExist) {
                throw new Error('User already exists');
            }

            const user = {
                authId: data.authId,
                email: data.email,
                firstname: data.firstname,
                lastname: data.lastname,
                username: data.username,
                phoneNumber: data.phoneNumber,
                createdBy: data.email,
                updatedBy:data.email,
                createdAt: new Date(),
                updatedAt: new Date()
            }

            console.log(user)

            const newUser = AppDataSource.getRepository(User).create(user);
            const savedUser = await AppDataSource.getRepository(User).save(newUser);
            return savedUser;

        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updateUser(id: number, updateData: Partial<User>) {
        try {
            const userExist = await AppDataSource.getRepository(User).findOneBy({ id });
            if (!userExist) {
                throw new Error('User not found');
            }

            const user = {
                ...userExist,
                updatedBy: "admin",
                updatedDate: new Date()
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
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async whoIam(email: string) {

        try {
            const user = await AppDataSource.getRepository(User).findOneBy({ email: email });
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            throw new Error(error.message);
        }

    }

    
}


