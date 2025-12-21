import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CustomRequest } from '../types/types';
import { PinoLogger } from 'nestjs-pino';
import { Reflector } from '@nestjs/core';

import { ROLES } from '../decorators/role.decorator';
import { UserRole } from '@prisma/client';
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly logger: PinoLogger,
    private reflector: Reflector,
  ) {
    this.logger.setContext(RoleGuard.name);
  }
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<CustomRequest>();
    const roles = this.reflector.get<UserRole[]>(ROLES, context.getHandler());

    // authorization wise public endpoint for all user roles
    if (!roles || roles.length === 0) {
      return true;
    }
    const userRole = req?.user?.role;

    if (!userRole || !roles.includes(userRole)) {
      this.logger.warn(
        { userRole, requiredRoles: roles },
        'Access denied due to insufficient user role',
      );
      throw new ForbiddenException("User doesn't have access to this endpoint");
    }
    return true;
  }
}
