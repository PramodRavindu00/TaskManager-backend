import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CustomRequest } from '../types/types';
import { PinoLogger } from 'nestjs-pino';
import { Reflector } from '@nestjs/core';
import { PROJECT_ROLES } from '../decorators/project.role.decorator';
import { ProjectRole } from '@prisma/client';

@Injectable()
export class ProjectRoleGuard implements CanActivate {
  constructor(
    private readonly logger: PinoLogger,
    private reflector: Reflector,
  ) {
    this.logger.setContext(ProjectRoleGuard.name);
  }
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<CustomRequest>();
    const projectRoles = this.reflector.get<ProjectRole[]>(
      PROJECT_ROLES,
      context.getHandler(),
    );

    return true;
  }
}
