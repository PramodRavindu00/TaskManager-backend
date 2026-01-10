import { UserRole } from '@prisma/client';
import { CurrentUserType } from '../../src/common/types/types';

export const mockAdminUser: CurrentUserType = {
  id: 'user-1',
  firstName: 'john',
  lastName: 'doe',
  email: 'jhon@example.com',
  role: UserRole.Admin,
};

export const mockGeneralUser: CurrentUserType = {
  id: 'user-1',
  firstName: 'john',
  lastName: 'doe',
  email: 'jhon@example.com',
  role: UserRole.User,
};
