import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import UserController from "src/controllers/user.controller";
import User, { UserSchema } from "src/models/user.model";
import UserService from "src/services/user.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        global: true,
        signOptions: { expiresIn: "2h" },
        secret: configService.get<string>("JWT_SECRET"),
      }),
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
class UserModule {}

export default UserModule;
