import { Controller, Get, ParseEnumPipe, Query } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task, TaskSortBy, TaskStatus } from "./task.model";
import { ParseIntWithRangePipe } from "./pipes/parse-int-with-range.pipe";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query("status", new ParseEnumPipe(TaskStatus, { optional: true }))
    status?: TaskStatus,
    @Query(
      "page",
      new ParseIntWithRangePipe({ fieldName: "page", min: 1, optional: true }),
    )
    page?: number,
    @Query(
      "limit",
      new ParseIntWithRangePipe({ fieldName: "limit", min: 0, optional: true }),
    )
    limit?: number,
    @Query("sortBy", new ParseEnumPipe(TaskSortBy, { optional: true }))
    sortBy?: keyof Pick<Task, "description" | "title">,
  ) {
    return this.tasksService.getFilteredTasks(status, page, limit, sortBy);
  }
}
