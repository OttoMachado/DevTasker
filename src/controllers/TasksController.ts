import { Request, Response } from "express";
import { TaskRepository } from "../repositories/TasksRepository";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

const repo = new TaskRepository();

export class TasksController {
    
    //Cria tarefa nova
  static async create(req: Request, res: Response) {
    try {
      const { title, description, status, deliveryDate, userId } = req.body;

      const task = await repo.createTask(title, description, status, deliveryDate, userId);
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar tarefa", details: error });
    }
  }

  // metodo que pega os dados da tarefa
  static async getAll(req: Request, res: Response) {
    try {
      const tasks = await repo.findAllTasks();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar tarefas", details: error });
    }
  }

  // Pega a tarefa pelo ID
  static async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const task = await repo.findTaskById(id);
      if (!task) return res.status(404).json({ message: "Tarefa não encontrada." });

      res.json(task);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar tarefa", details: error });
    }
  }

  //Pega a tarefa pelo ID do user
  static async getByUserId(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.userId);
      const tasks = await repo.findTasksByUserId(userId);
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar tarefas do usuário", details: error });
    }
  }

  //Metodo pra atualizar a tarefa
  static async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const { title, description, status, deliveryDate, userId } = req.body;

      const fieldsToUpdate = { title, description, status, deliveryDate, userId };
      const updated = await repo.updateTask(id, fieldsToUpdate);

      if (!updated) return res.status(404).json({ message: "Tarefa não encontrada." });

      res.json({ message: "Tarefa atualizada com sucesso.", updated });
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar tarefa", details: error });
    }
  }

//Metodo pra deletar a tarefa
  static async delete(req: Request, res: Response) {
    try {
        //pega o id da tarefa q vai apagar
      const id = parseInt(req.params.id);
      const deleted = await repo.deleteTask(id);

      // esse é pra caso nao tenha achado a tarefa
      if (!deleted) return res.status(404).json({ message: "Tarefa não encontrada." });

      res.json({ message: "Tarefa deletada com sucesso." });
    } catch (error) {
      res.status(500).json({ message: "Erro ao deletar tarefa", details: error });
    }
  }
}
