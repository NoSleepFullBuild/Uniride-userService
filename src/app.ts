import * as express from "express"
import { UserController } from './controllers/userController';
import { AppDataSource } from "./app-data-source"

AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

const app = express()
app.use(express.json())

const userController = new UserController();

app.get('/users', userController.getUsers.bind(userController));
app.get('/users/:id', userController.getUser.bind(userController));
app.post('/users', userController.createUser.bind(userController));
app.put('/users', userController.updateUser.bind(userController));
app.delete('/users/:id', userController.deleteUser.bind(userController));

app.listen(3000)