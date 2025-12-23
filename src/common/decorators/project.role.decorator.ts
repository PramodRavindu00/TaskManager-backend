import { Reflector } from '@nestjs/core';
import { ProjectRole } from '@prisma/client';

export const PROJECT_ROLES = Reflector.createDecorator<ProjectRole[]>();

export const ProjectRoles = (...roles: ProjectRole[]) => PROJECT_ROLES(roles);
