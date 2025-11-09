import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CustomRequest } from '../types/types';

export const Cookies = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<CustomRequest>();
    return data ? request.cookies?.[data] : request.cookies;
  },
);
