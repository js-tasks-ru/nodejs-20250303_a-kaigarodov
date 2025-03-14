import { IsIn, IsNotEmpty, IsString } from "class-validator";
import { Task, TaskStatus } from "../task.model";

export class TaskCreateDto implements Omit<Task, "id"> {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsIn(Object.values(TaskStatus))
  status: TaskStatus;
}
