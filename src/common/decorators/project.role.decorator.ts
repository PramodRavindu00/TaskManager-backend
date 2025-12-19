import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@prisma/client';

export const PROJECT_ROLES = 'PROJECT_ROLES';
export const SystemRoles = (...roles: UserRole[]) =>
  SetMetadata(PROJECT_ROLES, roles);
