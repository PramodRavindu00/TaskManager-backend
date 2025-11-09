import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Logger } from 'nestjs-pino';
import { CustomRequest, JwtPayload } from '../types/types';
import { AuthService } from '../../auth/auth.service';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
    private readonly logger: Logger,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<CustomRequest>();
    const token = this.extractTokenFromHeader(req);
    if (!token) {
      throw new UnauthorizedException('Invalid Token');
    }
    try {
      const payLoad: JwtPayload = this.jwtService.verify(token); //if this fails moves to catch block

      //check the user in the access token is actually exists
      const user = await this.authService.getLoggedUser(payLoad.userId);

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
