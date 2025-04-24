import { AppDataSource } from "../data-source";
import { Tasks } from "../models/Tasks";

export class TaskRepository {
  private repo = AppDataSource.getRepository(Tasks);

  //Cria a tarefa
  async createTask(title: string, description: string, status: string, deliveryDate: string, userId: number) {
    const task = new Tasks(title, description, status, deliveryDate, userId);
    return await this.repo.save(task);
  }

  //Busca por ID
  async findTaskById(id: number) {
    return await this.repo.findOne({ 
      where: { id }, 
      relations: ["user"] 
    });
  }

  //Esse metodo aqui Busca pelo ID do usuario
  async findTasksByUserId(userId: number) {
    return await this.repo.find({ 
      where: { user: { id: userId } },
      relations: ["user"]
    });
  }

  // Esse da update na task
  async updateTask(id: number, fields: Partial<Tasks>) {
    const task = await this.findTaskById(id);
    if (!task) return null;
    Object.assign(task, fields);
    return await this.repo.save(task);
  }

  // Esse deleta a task
  async deleteTask(id: number) {
    const task = await this.findTaskById(id);
    if (!task) return null;
    return await this.repo.remove(task);
  }

  // Busca todas as Tasks
  async findAllTasks() {
    return await this.repo.find({ relations: ["user"] });
  }
}
