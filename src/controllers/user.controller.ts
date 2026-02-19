import { Body, Controller, Get, HttpCode, Param, Post } from "@nestjs/common";
import { CreateUserDto } from "src/dtos/createCat.dto";
import User from "src/models/user.model";
import UserService from "src/services/user.service";
import { type ParamsTypes } from "src/types/types";

@Controller("api/v1/users")
class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/create")
  @HttpCode(201)
  async create(
    @Body() userDto: CreateUserDto,
  ): Promise<CreateUserDto | { error: string }> {
    try {
      return await this.userService.create(userDto);
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : "Internal server error",
      };
    }
  }

  @Get("/all")
  @HttpCode(200)
  async getUsers() {
    return await this.userService.getUsers();
  }

  @Get("/:id")
  @HttpCode(200)
  async getUser(@Param() params: ParamsTypes): Promise<User | null> {
    return await this.userService.getUser(params.id);
  }
}

export default UserController;
