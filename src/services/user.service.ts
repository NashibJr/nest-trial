import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "src/dtos/createCat.dto";
import User from "src/models/user.model";
import * as bcrypt from "bcrypt";
import { LoginDto } from "src/dtos/LoginDto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
class UserService {
  constructor(
    @InjectModel(User.name) private user: Model<User>,
    private jwtService: JwtService,
  ) {}

  create = async (
    userDto: CreateUserDto,
  ): Promise<Omit<User, "password"> & { message: string }> => {
    try {
      const hashed = await bcrypt.hash(userDto.password!, 10);
      const createdUser = await this.user.create({
        ...userDto,
        password: hashed,
      });

      return {
        ...createdUser.toJSON(),
        message: "User successfully created",
      };
    } catch (error) {
      throw new HttpException(
        error instanceof Error ? error.message : "Internal server error",
        400,
      );
    }
  };

  getUsers = async (): Promise<User[]> => {
    return await this.user.find();
  };

  getUser = async (id: string): Promise<User | null> => {
    return await this.user.findById(id);
  };

  login = async (
    loginDto: LoginDto,
  ): Promise<
    | (Omit<User, "password"> & { message: string; token: string })
    | { error: string }
  > => {
    try {
      const exists = await this.user.findOne({ email: loginDto.email });
      if (!exists) {
        return {
          error: "Invalid email or password",
        };
      }

      const isMatch = await bcrypt.compare(loginDto.password, exists.password);
      if (!isMatch) {
        return {
          error: "Invalid email or password",
        };
      }

      const token = await this.jwtService.signAsync({
        id: exists.id,
        email: exists.email,
      });

      return {
        ...exists.toJSON(),
        token,
        message: "Login successful",
      };
    } catch (error) {
      throw new HttpException(
        error instanceof Error ? error.message : "Internal server error",
        400,
      );
    }
  };
}

export default UserService;
