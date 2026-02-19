import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
class User {
  @Prop({ required: [true, "This field is required"] })
  fullName!: string;

  @Prop({
    unique: [true, "This email has an account associated with it"],
    required: [true, "This field is required"],
  })
  email!: string;

  @Prop()
  address!: string;

  @Prop({ required: [true, "This field is required"] })
  password!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export default User;
