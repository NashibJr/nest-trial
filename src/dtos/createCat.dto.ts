export class CreateUserDto {
  readonly fullName!: string;
  readonly email!: string;
  readonly address?: string;
  readonly password!: string;
}
