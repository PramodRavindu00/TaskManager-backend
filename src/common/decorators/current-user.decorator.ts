import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CustomRequest } from '../types/types';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<CustomRequest>();
    return request?.user;
  },
);
