import { Router } from "express";
import { TasksController } from "../controllers/TasksController"
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

const middleware = new AuthMiddleware();

const router = Router();

// Essa aqui é a autenticação de Rotas
router.use(middleware.validaToken);

// Essas são as Rotas do Crud 
router.post('/tasks', TasksController.create);
router.get('/tasks', TasksController.getAll);
router.get('/tasks/user/:userId', TasksController.getByUserId);
router.get('/tasks/:id', TasksController.getById);
router.put('/tasks/:id', TasksController.update);
router.delete('/tasks/:id', TasksController.delete);

export default router;
