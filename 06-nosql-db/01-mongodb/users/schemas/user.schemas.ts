import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { IUser } from "../models/user.model";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User implements IUser {
  @Prop({ unique: true })
  login: string;

  @Prop()
  firstName: string;

  @Prop()
  secondName: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
