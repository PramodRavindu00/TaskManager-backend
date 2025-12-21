import { Reflector } from '@nestjs/core';
import { UserRole } from '@prisma/client';

export const ROLES = Reflector.createDecorator<UserRole[]>();

//wrap the decorator to pass multiple parameters without wrapping as an array , but returns an array to allow multiple roles
export const Roles = (...roles: UserRole[]) => ROLES(roles);
