import { Injectable } from "@nestjs/common";
import { Task, TaskStatus } from "./task.model";

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: "1",
      title: "Task 1",
      description: "First task",
      status: TaskStatus.PENDING,
    },
    {
      id: "2",
      title: "Task 2",
      description: "Second task",
      status: TaskStatus.IN_PROGRESS,
    },
    {
      id: "3",
      title: "Task 3",
      description: "Third task",
      status: TaskStatus.COMPLETED,
    },
    {
      id: "4",
      title: "Task 4",
      description: "Fourth task",
      status: TaskStatus.PENDING,
    },
    {
      id: "5",
      title: "Task 5",
      description: "Fifth task",
      status: TaskStatus.IN_PROGRESS,
    },
  ];

  getFilteredTasks(
    status?: TaskStatus,
    page?: number,
    limit?: number,
    sortBy?: keyof Pick<Task, "description" | "title">,
  ): Task[] {
    let tasks = [...this.tasks];

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (sortBy) {
      tasks.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
    }

    return this.getTasksByPage(tasks, page, limit);
  }

  getTasksByPage(task: Task[], page: number, limit?: number) {
    const from = (page - 1) * (limit ?? 0);
    const to = limit !== undefined ? limit + from : limit;

    return task.slice(from, to);
  }
}
