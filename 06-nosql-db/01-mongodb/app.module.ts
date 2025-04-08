import { Module } from "@nestjs/common";
import { TasksModule } from "./tasks/tasks.module";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://127.0.0.1/05-db-02-mongodb"),
    TasksModule,
    UsersModule,
  ],
})
export class AppModule {}
