import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  description: string;
}
