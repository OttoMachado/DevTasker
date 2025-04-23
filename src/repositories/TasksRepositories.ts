import { AppDataSource } from "../data-source";
import { Task } from "../models/Tasks";

export class TaskRepository {
  private repo = AppDataSource.getRepository(Task);

  async createTask(title: string, description: string, status: string, deliveryDate: string, userId: number) {
    const task = new Task(title, description, status, deliveryDate, userId);
    return await this.repo.save(task);
  }

  async findTaskById(id: number) {
    return await this.repo.findOne({ 
      where: { id }, 
      relations: ["user"] 
    });
  }

  async findTasksByUserId(userId: number) {
    return await this.repo.find({ 
      where: { user: { id: userId } },
      relations: ["user"]
    });
  }

  async updateTask(id: number, fields: Partial<Task>) {
    const task = await this.findTaskById(id);
    if (!task) return null;
    Object.assign(task, fields);
    return await this.repo.save(task);
  }

  async deleteTask(id: number) {
    const task = await this.findTaskById(id);
    if (!task) return null;
    return await this.repo.remove(task);
  }

  async findAllTasks() {
    return await this.repo.find({ relations: ["user"] });
  }
}
