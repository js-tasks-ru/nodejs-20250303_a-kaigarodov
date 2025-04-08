import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

import mongoose, { HydratedDocument } from "mongoose";
import { User } from "../../users/schemas/user.schemas";

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

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  holder: User;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
