import { Controller, Get, Post, Body, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/user.dto";
import { User } from "./schemas/user.schema";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post("create")
  async create(@Body() createUserDto: CreateUserDto) {
    await this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get("all")
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
