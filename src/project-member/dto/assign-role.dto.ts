import { ProjectRole } from '@prisma/client';
import { IsDefined, IsEnum, IsNotEmpty } from 'class-validator';
import { UserIdDto } from '../../user/dto/user-id.dto';

export class AssignRoleDto extends UserIdDto {
  @IsDefined()
  @IsNotEmpty()
  @IsEnum(ProjectRole)
  role: ProjectRole;
}
