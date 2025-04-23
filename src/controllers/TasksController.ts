import { Request, Response } from "express";
import { TaskRepository } from "../repositories/TasksRepository";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

const repo = new TaskRepository();

export class TasksController {
  static async create(req: Request, res: Response) {
    try {
      const { title, description, status, deliveryDate, userId } = req.body;

      const task = await repo.createTask(title, description, status, deliveryDate, userId);
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar tarefa.", details: error });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const tasks = await repo.findAllTasks();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar tarefas", details: error });
    }
  }

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

  static async getByUserId(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.userId);
      const tasks = await repo.findTasksByUserId(userId);
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar tarefas do User", details: error });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const { title, description, status, deliveryDate, userId } = req.body;

      const fieldsToUpdate = { title, description, status, deliveryDate, userId };
      const updated = await repo.updateTask(id, fieldsToUpdate);

      if (!updated) return res.status(404).json({ message: "Tarefa não encontrada." });

      res.json({ message: "Tarefa atualizada.", updated });
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar tarefa", details: error });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const deleted = await repo.deleteTask(id);

      if (!deleted) return res.status(404).json({ message: "Tarefa não encontrada." });

      res.json({ message: "Tarefa deletada." });
    } catch (error) {
      res.status(500).json({ message: "Erro ao deletar tarefa", details: error });
    }
  }
}
