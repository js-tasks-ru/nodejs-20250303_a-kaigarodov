import { Injectable } from "@nestjs/common";
import { Task } from "./task.model";
import { TaskUpdateDto } from "./dto/task-update.dto";
import { TaskCreateDto } from "./dto/task-create.dto";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private currentId: number = 0;

  getAllTasks(): Task[] {
    return [...this.tasks];
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(dto: TaskCreateDto): Task {
    const task = {
      id: this.getNextTaskId(),
      ...dto,
    };

    this.tasks.push(task);

    return task;
  }

  updateTask(id: string, dto: TaskUpdateDto): Task {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) return;

    for (const [key, value] of Object.entries(dto)) {
      task[key] = value;
    }

    return task;
  }

  deleteTask(id: string): Task {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) return;

    const task = this.tasks[taskIndex];
    this.tasks.splice(taskIndex, 1);

    return task;
  }

  private getNextTaskId(): string {
    const newId = this.currentId + 1;
    this.currentId = newId;
    return String(newId);
  }
}
