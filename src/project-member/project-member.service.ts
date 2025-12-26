import { Injectable } from '@nestjs/common';
import { UserIdDto } from '../user/dto/user-id.dto';
import { CurrentUserType } from '../common/types/types';
import { AssignRoleDto } from './dto/assign-role.dto';
import { PrismaService } from '../common/prisma/prisma.service';
import { MemberStatus, ProjectRole } from '@prisma/client';

@Injectable()
export class ProjectMemberService {
  constructor(private readonly prisma: PrismaService) {}
  async addMember(projectId: string, dto: UserIdDto, user: CurrentUserType) {
    await this.prisma.projectMember.create({
      data: {
        projectId: projectId,
        userId: dto.userId,
        createdBy: user.id,
        updatedBy: user.id,
        role: ProjectRole.Member,
      },
    });
  }
  async assignRole(
    projectId: string,
    dto: AssignRoleDto,
    user: CurrentUserType,
  ) {
    await this.prisma.projectMember.update({
      where: { id: projectId, userId: dto.userId },
      data: {
        role: dto.role,
        updatedBy: user.id,
      },
    });
  }
  async removeMember(projectId: string, dto: UserIdDto, user: CurrentUserType) {
    await this.prisma.projectMember.update({
      where: { id: projectId, userId: dto.userId },
      data: {
        status: MemberStatus.Removed,
        updatedBy: user.id,
      },
    });
  }
}
