import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ProjectRoleGuard } from '../common/guards/project.role.guard';

@ApiBearerAuth()
@Controller('project-member')
@UseGuards(ProjectRoleGuard)
export class ProjectMemberController {
  async addMember(projectId: string, dto: CreateProjectMemberDto, user: User) {}
}
