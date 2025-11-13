import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
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
    return {
      status: HttpStatus.OK,
      timestamp: new Date().toISOString(),
    };
  }
}
