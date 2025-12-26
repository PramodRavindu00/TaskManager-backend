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

    //extract allowed roles from decorator check from method level then from class level
    const roles =
      this.reflector.get<UserRole[]>(ROLES, context.getHandler()) ||
      this.reflector.get<UserRole[]>(ROLES, context.getClass());

    // if no user roles were set it means accessible for all user roles
    if (!roles || roles.length === 0) {
      return true;
    }
    const user = req?.user;
    if (!user) {
      this.logger.error('User not found');
      throw new UnauthorizedException();
    }
    if (!user?.role || !roles.includes(user?.role)) {
      this.logger.warn(
        { receivedRoles: user?.role, requiredRoles: roles },
        'Access denied due to insufficient user role',
      );
      throw new ForbiddenException("User doesn't have access to this resource");
    }
    return true;
  }
}
