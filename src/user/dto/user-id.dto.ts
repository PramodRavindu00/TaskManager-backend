import { IsDefined, IsNotEmpty, IsUUID } from 'class-validator';

export class UserIdDto {
  @IsDefined()
  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
