import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@prisma/client';

export const SYSTEM_ROLES = 'SYSTEM_ROLES';
export const SystemRoles = (...roles: UserRole[]) =>
  SetMetadata(SYSTEM_ROLES, roles);
