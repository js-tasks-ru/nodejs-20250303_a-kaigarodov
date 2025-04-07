import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Task } from "./schemas/task.schema";
import { Model, ObjectId } from "mongoose";
import { User } from "../users/schemas/user.schemas";
import { TasksFindAllQueryDto } from "./dto/tasks-find-all-query.dto";

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private TaskModel: Model<Task>,
    @InjectModel(User.name) private UserModel: Model<User>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const { holderLogin, ...initialData } = createTaskDto;

    const holder = await this.extractUserByLogin(holderLogin);

    const task = new this.TaskModel({
      ...initialData,
      holder,
    });

    return await task.save();
  }

  async findAll({ holderLogin }: TasksFindAllQueryDto) {
    const holder = await this.extractUserByLogin(holderLogin);

    return this.TaskModel.find({ holder }).exec();
  }

  async findOne(id: ObjectId) {
    const task = await this.TaskModel.findById(id);

    if (!task) {
      throw new NotFoundException();
    }

    return task;
  }

  async update(id: ObjectId, { holderLogin, ...dto }: UpdateTaskDto) {
    const holder = await this.extractUserByLogin(holderLogin);
    const updateData = { ...dto, holder };

    const task = await this.TaskModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!task) {
      throw new NotFoundException();
    }

    return task;
  }

  async remove(id: ObjectId) {
    const result = await this.TaskModel.findByIdAndDelete(id);

    if (!result) {
      throw new NotFoundException();
    }
  }

  private async extractUserByLogin(login?: string) {
    if (login === undefined) return;

    const holder = await this.UserModel.findOne({ login }).exec();

    if (!holder) {
      throw new NotFoundException(`user with login:${login} is not exist`);
    }

    return holder;
  }
}
