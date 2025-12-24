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

    const memberShip = await this.prisma.projectMember.findUnique({
      where: {
        projectId_userId: {
          projectId,
          userId: user.id,
        },
      },
      select: { role: true, status: true },
    });
    if (!memberShip || memberShip.status !== 'Active') {
      throw new ForbiddenException('Not a project member');
    }

    //resolve allowed project roles
    const projectRoles = this.reflector.get<ProjectRole[]>(
      PROJECT_ROLES,
      context.getHandler(),
    );
    // if no project roles were set it means accessible for all project roles
    if (!projectRoles || projectRoles.length === 0) {
      return true;
    }

    if (!memberShip?.role || !projectRoles.includes(memberShip?.role)) {
      throw new ForbiddenException(
        'Insufficient project role to access this resource',
      );
    }
    return true;
  }
}
