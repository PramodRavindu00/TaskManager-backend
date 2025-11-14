import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { map, Observable, tap } from 'rxjs';

@Injectable()
export class SetAuthCookie implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const res = ctx.getResponse<Response>();

    return next.handle().pipe(
      tap((data: { accessToken: string; refreshToken: string }) => {
        if (data && data.refreshToken) {
          res.cookie('refreshToken', data.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/auth/refresh',
            maxAge: 7 * 24 * 60 * 60 * 1000,
          });
        }
      }),
      map((data: { accessToken: string }) => {
        //map transforms the data
        return { accessToken: data.accessToken }; //only returning accessToken to the client
      }),
    );
  }
}
