import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { CustomRequest, JwtPayload } from '../types/types';
import { PrismaService } from '../prisma/prisma.service';
import { PinoLogger } from 'nestjs-pino';
import { Reflector } from '@nestjs/core';
import { PUBLIC } from '../decorators/public.decorator';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly logger: PinoLogger,
    private reflector: Reflector,
  ) {
    this.logger.setContext(AuthGuard.name);
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<CustomRequest>();
    const isPublicApi = this.reflector.get(PUBLIC, context.getHandler());

    if (isPublicApi) return true;

    const token = this.extractTokenFromHeader(req);
    if (!token) {
      throw new UnauthorizedException('Invalid Token');
    }
    try {
      const payLoad: JwtPayload = this.jwtService.verify(token); //if this fails moves to catch block

      //check the user in the access token is actually exists
      const user = await this.prisma.user.findUnique({
        where: { id: payLoad.userId },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          role: true,
        },
      });

      //access token is valid somehow , but user actually deleted
      if (!user) throw new UnauthorizedException('User not found');

      req.user = user;
      return true; // return true if no error
    } catch (error) {
      this.logger.error(error);
      throw new UnauthorizedException('Invalid Token');
    }
  }

  private extractTokenFromHeader(req: Request): string | undefined {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
