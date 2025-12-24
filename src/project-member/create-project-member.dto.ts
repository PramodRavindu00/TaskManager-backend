import { IsDefined, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateProjectMemberDto {
  @IsDefined()
  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
