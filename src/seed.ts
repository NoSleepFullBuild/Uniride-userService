// src/seed.ts
import { AppDataSource } from "./app-data-source";
import { User } from "./entities/user/users.entity";

async function createDefaultUser() {
    try {
        const userRepo = AppDataSource.getRepository(User);
        const defaultUser = await userRepo.findOneBy({ username: "seed" });

        if (!defaultUser) {
            const newUser = userRepo.create({
                firstname: "seed",
                lastname: "seed",
                username: "seed",
                role: "seed",
                email: "seed@user.com",
                phoneNumber: '1234567890',
                createdBy: "system",
                updatedBy: "system",
            });

            await userRepo.save(newUser);
            console.log("Default user has been created!");
        }
    } catch (error) {
        console.error("Error creating default user:", error);
    }
}

export default createDefaultUser;
