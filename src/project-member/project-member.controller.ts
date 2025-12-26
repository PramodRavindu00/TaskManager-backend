import { Controller, Param, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ProjectRoleGuard } from '../common/guards/project.role.guard';
import type { CurrentUserType } from '../common/types/types';
import { AssignRoleDto } from './dto/assign-role.dto';
import { ProjectRoles } from '../common/decorators/project.role.decorator';
import { UserIdDto } from '../user/dto/user-id.dto';
import { ProjectMemberService } from './project-member.service';

@ApiBearerAuth()
@Controller('project-member')
@UseGuards(ProjectRoleGuard)
export class ProjectMemberController {
  constructor(private readonly projectMemberService: ProjectMemberService) {}
  @ProjectRoles('Admin', 'Manager')
  addMember(
    @Param('projectId', new ParseUUIDPipe()) projectId: string,
    dto: UserIdDto,
    user: CurrentUserType,
  ) {
    return this.projectMemberService.addMember(projectId, dto, user);
  }

  @ProjectRoles('Admin', 'Manager')
  assignRole(
    @Param('projectId', new ParseUUIDPipe()) projectId: string,
    dto: AssignRoleDto,
    user: CurrentUserType,
  ) {
    return this.projectMemberService.assignRole(projectId, dto, user);
  }

  @ProjectRoles('Admin', 'Manager')
  removeMember(
    @Param('projectId', new ParseUUIDPipe()) projectId: string,
    dto: UserIdDto,
    user: CurrentUserType,
  ) {
    return this.projectMemberService.removeMember(projectId, dto, user);
  }
}
