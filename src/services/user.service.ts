import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "src/dtos/createCat.dto";
import User from "src/models/user.model";

@Injectable()
class UserService {
  constructor(@InjectModel(User.name) private user: Model<User>) {}

  create = async (
    userDto: CreateUserDto,
  ): Promise<User & { message: string }> => {
    try {
      const createdUser = await this.user.create(userDto);

      return { ...createdUser.toJSON(), message: "User successfully created" };
    } catch (error) {
      throw new HttpException(
        error instanceof Error ? error.message : "Internal server error",
        400,
      );
    }
  };
}

export default UserService;
