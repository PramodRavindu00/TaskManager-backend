import { UserRole } from '@prisma/client';
import { Request } from 'express';

export interface JwtPayload {
  userId: string;
  role: string;
}

export interface CurrentUserType {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
}

export interface CustomRequest extends Request {
  cookies: Record<string, string>;
  user?: CurrentUserType;
}
