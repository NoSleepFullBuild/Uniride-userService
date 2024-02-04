// src/seed.ts
import { AppDataSource } from "./app-data-source";
import { User } from "./entities/user/users.entity";

async function createDefaultUser() {
    try {
        const userRepo = AppDataSource.getRepository(User);
        const defaultUser = await userRepo.findOneBy({ username: "admin" });

        if (!defaultUser) {
            const newUser = userRepo.create({
                firstname: "admin",
                lastname: "admin",
                username: "admin",
                email: "admin@admin.com",
                role: "admin",
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
