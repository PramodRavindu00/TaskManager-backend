import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { ProjectModule } from './project/project.module';
import { PrismaModule } from './common/prisma/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { Request, Response } from 'express';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRES_IN'),
        },
      }),
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        serializers: {
          req(req: Request) {
            return {
              method: req.method,
              url: req.url,
            };
          },
          res(res: Response) {
            return {
              statusCode: res.statusCode,
            };
          },
        },
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            singleLine: true,
            levelFirst: true,
          },
        },
      },
    }),
    UserModule,
    TaskModule,
    ProjectModule,
    PrismaModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
