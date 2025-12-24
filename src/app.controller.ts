import {
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { Public } from './common/decorators/public.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Test Endpoints')
@Controller()
export class AppController {
  @ApiOperation({
    summary: 'Public test endpoint to check server is running',
  })
  @Get('public')
  @Public()
  publicHealth() {
    return {
      status: HttpStatus.OK,
      timestamp: new Date().toISOString(),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Protected test endpoint to check the authentication guard',
  })
  @Get('private')
  privateHealth() {
    throw new InternalServerErrorException('test Exception');
  }
}
