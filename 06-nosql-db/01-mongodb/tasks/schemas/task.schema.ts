import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

import { HydratedDocument } from "mongoose";

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop({ type: String, required: true, unique: true })
  @IsString()
  @IsNotEmpty()
  title: string;

  @Prop()
  @IsString()
  @IsNotEmpty()
  description: string;

  @Prop({ default: false })
  @IsOptional()
  @IsBoolean()
  isCompleted: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
