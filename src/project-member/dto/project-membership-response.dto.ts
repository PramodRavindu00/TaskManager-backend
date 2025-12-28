import { MemberStatus, ProjectRole } from '@prisma/client';
import { Exclude, Expose, Type } from 'class-transformer';
import { ProjectResponseDto } from '../../project/dto/project-response.dto';

@Exclude()
export class ProjectMemberShipResponseDto {
  @Expose()
  id: string;
  @Expose()
  userId: string;
  @Expose()
  projectId: string;
  @Expose()
  role: ProjectRole;
  @Expose()
  status: MemberStatus;
  @Expose()
  @Type(() => ProjectResponseDto)
  project: ProjectResponseDto;
}
