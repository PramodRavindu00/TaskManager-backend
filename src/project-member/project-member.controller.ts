import {
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ProjectRoleGuard } from '../common/guards/project.role.guard';
import type { CurrentUserType } from '../common/types/types';
import { AssignRoleDto } from './dto/assign-role.dto';
import { ProjectRoles } from '../common/decorators/project.role.decorator';
import { UserIdDto } from '../user/dto/user-id.dto';
import { ProjectMemberService } from './project-member.service';
import { Roles } from '../common/decorators/role.decorator';

@ApiBearerAuth()
@Controller('project-member')
@Roles('User') //users only
@UseGuards(ProjectRoleGuard)
export class ProjectMemberController {
  constructor(private readonly projectMemberService: ProjectMemberService) {}

  @ApiOperation({
    summary: 'Add member to the project',
  })
  @Post()
  @ProjectRoles('Admin', 'Manager')
  addMember(
    @Param('projectId', new ParseUUIDPipe()) projectId: string,
    dto: UserIdDto,
    user: CurrentUserType,
  ) {
    return this.projectMemberService.addMember(projectId, dto, user);
  }

  @ApiOperation({
    summary: 'Assign project roles',
  })
  @Patch(':projectId')
  @ProjectRoles('Admin', 'Manager')
  assignRole(
    @Param('projectId', new ParseUUIDPipe()) projectId: string,
    dto: AssignRoleDto,
    user: CurrentUserType,
  ) {
    return this.projectMemberService.assignRole(projectId, dto, user);
  }

  @ApiOperation({
    summary: 'Remove member from project',
  })
  @Patch(':projectId')
  @ProjectRoles('Admin', 'Manager')
  removeMember(
    @Param('projectId', new ParseUUIDPipe()) projectId: string,
    dto: UserIdDto,
    user: CurrentUserType,
  ) {
    return this.projectMemberService.removeMember(projectId, dto, user);
  }
}
