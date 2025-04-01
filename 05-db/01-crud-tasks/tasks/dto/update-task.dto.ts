import { PartialType, PickType } from "@nestjs/mapped-types";
import { Task } from "../entities/task.entity";

export class UpdateTaskDto extends PartialType(
  PickType(Task, ["description", "title", "isCompleted"]),
) {}
