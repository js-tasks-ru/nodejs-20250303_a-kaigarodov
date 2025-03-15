import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TaskCreateDto } from "./dto/task-create.dto";
import { TaskUpdateDto } from "./dto/task-update.dto";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Get(":id")
  getTaskById(@Param("id") id: string) {
    const task = this.tasksService.getTaskById(id);

    if (!task) {
      throw new NotFoundException("task not found");
    }

    return task;
  }

  @Post()
  createTask(@Body() dto: TaskCreateDto) {
    const task = this.tasksService.createTask(dto);

    return task;
  }

  @Patch(":id")
  updateTask(@Param("id") id: string, @Body() dto: TaskUpdateDto) {
    const task = this.tasksService.updateTask(id, dto);

    if (!task) {
      throw new NotFoundException("task not found");
    }

    return task;
  }

  @Delete(":id")
  deleteTask(@Param("id") id: string) {
    const task = this.tasksService.deleteTask(id);

    if (!task) {
      throw new NotFoundException("task not found");
    }

    return task;
  }
}
