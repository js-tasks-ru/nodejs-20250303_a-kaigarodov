import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schemas/user.schemas";
import { Model } from "mongoose";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(dto: CreateUserDto) {
    const user = new this.userModel(dto);
    return await user.save();
  }

  findAll() {
    return this.userModel.find().exec();
  }

  async extractUserByLogin(login?: string) {
    if (!login) return;

    return this.userModel.findOne({ login }).exec();
  }
}
