import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/user.dto";
import { User } from "./schemas/user.schema";
const bcrypt = require("bcrypt");
const uuid4 = require("uuid4");
const moment = require("moment");

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    let hash = await bcrypt.hashSync(createUserDto.password, 10);

    const user = {
      _id: uuid4(),
      name: createUserDto.name,
      email: createUserDto.email,
      password: hash,
      createDate: moment().format(),
    };

    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async findOne(email: string): Promise<User> {
    return await this.userModel.findOne({ email: email }).exec();
  }

  async findById(sub: string): Promise<User> {
    return await this.userModel
      .findById({ _id: sub })
      .select("-password")
      .exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().select("-password").exec();
  }
}
