import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Task } from "./schemas/task.schema";
import { Model, ObjectId, RootFilterQuery, UpdateQuery } from "mongoose";
import { TasksFindAllQueryDto } from "./dto/tasks-find-all-query.dto";
import { UsersService } from "../users/users.service";

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private TaskModel: Model<Task>,
    private usersService: UsersService,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const { holderLogin, ...initialData } = createTaskDto;

    const holder = holderLogin
      ? await this.usersService.findByLogin(holderLogin)
      : undefined;

    const task = new this.TaskModel({
      ...initialData,
      holder,
    });

    return await task.save();
  }

  async findAll({ holderLogin }: TasksFindAllQueryDto) {
    const query: RootFilterQuery<Task> = {};

    const holder = holderLogin
      ? await this.usersService.findByLogin(holderLogin)
      : undefined;

    if (holder) {
      query.holder = holder;
    }

    return this.TaskModel.find(query).populate("holder").exec();
  }

  async findOne(id: ObjectId) {
    const task = await this.TaskModel.findById(id).populate("holder");

    if (!task) {
      throw new NotFoundException();
    }

    return task;
  }

  async update(id: ObjectId, { holderLogin, ...dto }: UpdateTaskDto) {
    const holder = holderLogin
      ? await this.usersService.findByLogin(holderLogin)
      : undefined;

    const unset: UpdateQuery<Task>["$unset"] = {};
    if (holderLogin === null) {
      unset.holder = "";
    }

    const updateData: UpdateQuery<Task> = {
      ...dto,
      holder,
      $unset: unset,
    };

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
}
