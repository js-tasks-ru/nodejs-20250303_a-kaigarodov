import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { ObjectId } from "mongoose";
import { ObjectIDPipe } from "../objectid/objectid.pipe";
import { TasksFindAllQueryDto } from "./dto/tasks-find-all-query.dto";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll(@Query() param: TasksFindAllQueryDto) {
    return this.tasksService.findAll(param);
  }

  @Get(":id")
  findOne(@Param("id", ObjectIDPipe) id: ObjectId) {
    return this.tasksService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id", ObjectIDPipe) id: ObjectId,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(":id")
  remove(@Param("id", ObjectIDPipe) id: ObjectId) {
    return this.tasksService.remove(id);
  }
}
