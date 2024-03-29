import * as express from "express"
import { UserController } from './controllers/users.controller';
import { AppDataSource } from "./app-data-source"
import createDefaultUser from "./seed";

require('dotenv').config();

AppDataSource
    .initialize()
    .then(async () => {
        await createDefaultUser();
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

const app = express()
app.use(express.json())

const userController = new UserController();

app.get('/api/users/healthcheck', (req, res) => {
    res.status(200).send('User service is running')
})

app.get('/api/users', userController.getUsers.bind(userController));
app.get('/api/users/:id', userController.getUserById.bind(userController));
app.post('/api/users', userController.createUser.bind(userController));
app.put('/api/users/:id', userController.updateUser.bind(userController));
app.delete('/api/users/:id', userController.deleteUser.bind(userController));
app.get('/api/users/whoIam/:email', userController.whoIam.bind(userController));

app.listen(Number(process.env.PORT), ()=> {
    console.log("User service is running on port " + process.env.PORT)
})