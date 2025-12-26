import { IsDefined, IsNotEmpty, IsUUID } from 'class-validator';

export class UUIDDto {
  @IsDefined()
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
