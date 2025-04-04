import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Task } from "./schemas/task.schema";
import { Model, ObjectId } from "mongoose";

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private TaskModel: Model<Task>) {}

  async create(createTaskDto: CreateTaskDto) {
    const task = new this.TaskModel(createTaskDto);
    return await task.save();
  }

  async findAll() {
    return this.TaskModel.find().exec();
  }

  async findOne(id: ObjectId) {
    const task = await this.TaskModel.findById(id);

    if (!task) throw new NotFoundException();

    return task;
  }

  async update(id: ObjectId, updateTaskDto: UpdateTaskDto) {
    const task = await this.TaskModel.findByIdAndUpdate(id, updateTaskDto, {
      new: true,
    });

    if (!task) throw new NotFoundException();

    return task;
  }

  async remove(id: ObjectId) {
    const result = await this.TaskModel.findByIdAndDelete(id);

    if (!result) throw new NotFoundException();
  }
}
