import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CustomRequest } from '../types/types';
import { PinoLogger } from 'nestjs-pino';
import { Reflector } from '@nestjs/core';
import { PROJECT_ROLES } from '../decorators/project.role.decorator';
import { ProjectRole } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectRoleGuard implements CanActivate {
  constructor(
    private readonly logger: PinoLogger,
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {
    this.logger.setContext(ProjectRoleGuard.name);
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<CustomRequest>();

    const user = req.user;
    if (!user) {
      this.logger.error('User not found');
      throw new UnauthorizedException();
    }
    const projectId = req.params.projectId;
    if (!projectId) {
      this.logger.error('Project context is missing');
      throw new ForbiddenException('Project context is missing');
    }

    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
      include: { members: true },
    });

    if (!project) {
      throw new ForbiddenException('Project not found');
    }

    //extract the current users membership from the project members array
    const projectMember = project?.members.find(
      (member) => member?.userId === user?.id,
    );

    if (projectMember?.status !== 'Active') {
      throw new ForbiddenException('Not a project member');
    }

    //extract allowed project roles from decorator  check from method level then from class level
    const projectRoles =
      this.reflector.get<ProjectRole[]>(PROJECT_ROLES, context.getHandler()) ||
      this.reflector.get<ProjectRole[]>(PROJECT_ROLES, context.getClass());
    // if no project roles were set it means accessible for all project roles
    if (!projectRoles || projectRoles.length === 0) {
      return true;
    }

    if (!projectRoles.includes(projectMember?.role)) {
      throw new ForbiddenException(
        `User's project role doesn't have access to this resource`,
      );
    }
    return true;
  }
}
