import { config } from "dotenv";
import express from "express";
import userRoutes from "./routes/userRoutes";
import { MongooseUtils } from "@uniride/library";

config();

const app = express();
const PORT = 3500;

async function startServer() {
  try {
    const mongoose = await MongooseUtils.openConnection();
    console.log(
      `Connected to MongoDB at ${mongoose.connection.host}:${mongoose.connection.port}`
    );

    app.use(express.json());

    app.use("/users", userRoutes);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Erreur lors du démarrage du serveur:", error);
  }
}

startServer().catch(console.error);
