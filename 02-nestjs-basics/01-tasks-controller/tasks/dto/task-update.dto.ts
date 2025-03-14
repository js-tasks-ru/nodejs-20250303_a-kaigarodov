import { PartialType } from "@nestjs/mapped-types";
import { IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "tasks/task.model";
import { TaskCreateDto } from "./task-create.dto";

export class TaskUpdateDto extends PartialType(TaskCreateDto) {}
