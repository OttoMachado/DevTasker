import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { User } from "../models/User";

const middleware = new AuthMiddleware()

const router = Router();

router.post('/users', UserController.register);
router.get('/users', UserController.login);
router.get('/users', UserController.getAll);
router.get('/users/:id', UserController.getById);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.delete);

export default router;