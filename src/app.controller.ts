import {
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './common/guards/auth.guard';

@Controller('health')
export class AppController {
  @Get('public')
  publicHealth() {
    return {
      status: HttpStatus.OK,
      timestamp: new Date().toISOString(),
    };
  }

  @UseGuards(AuthGuard)
  @Get('private')
  privateHealth() {
    throw new InternalServerErrorException('test Exception');
  }
}
