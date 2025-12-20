import {
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { Public } from './common/decorators/public.decorator';

@Controller('health')
export class AppController {
  @Get('public')
  @Public()
  publicHealth() {
    return {
      status: HttpStatus.OK,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('private')
  privateHealth() {
    throw new InternalServerErrorException('test Exception');
  }
}
