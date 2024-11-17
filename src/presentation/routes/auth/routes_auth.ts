import { Router } from "express";
import { AuthController } from "../../controllers/auth/auth.controller";
import { UserController } from "../../controllers/users/user.controller";

const userController = new UserController();
const authController = new AuthController();

export class AuthRoutes {

    static get routes(): Router {

        const router = Router();

        //Definir routes
        router.post('/createUser', userController.crearUser);
        router.post('/login', authController.login);

        return router;
    }

}