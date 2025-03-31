import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./entities/task.entity";
import { Repository } from "typeorm";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const result = await this.taskRepository.insert(createTaskDto);
    const [{ id }] = result.identifiers;

    return { id, ...createTaskDto };
  }

  async findAll() {
    return this.taskRepository.find();
  }

  async findOne(id: number) {
    const task = await this.taskRepository.findOneBy({ id });

    if (!task) throw new NotFoundException(`task with id=${id} does not exist`);

    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const result = await this.taskRepository.update(id, updateTaskDto);

    if (!result.affected)
      throw new NotFoundException(`task with id=${id} does not exist`);

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);

    if (!result.affected)
      throw new HttpException("Resource already deleted", HttpStatus.NOT_FOUND);
  }
}
