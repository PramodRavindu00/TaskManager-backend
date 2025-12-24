import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { SetAuthCookie } from '../common/interceptors/set-auth-cookie.interceptor';
import { Cookies } from '../common/decorators/cookies.decorator';
import type { CurrentUserType } from '../common/types/types';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ClearAuthCookie } from '../common/interceptors/clear-auth-cookie.interceptor';
import { Public } from '../common/decorators/public.decorator';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Create new User' })
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  @Public()
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signup(signUpDto);
  }
  @ApiOperation({ summary: 'Login to the system' })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Public()
  @UseInterceptors(SetAuthCookie) //using refresh token cookie creating interceptors
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @ApiOperation({
    summary: 'Refresh access token using the stored HTTP only cookie',
  })
  @HttpCode(HttpStatus.OK)
  @Get('refresh')
  @Public()
  @UseInterceptors(SetAuthCookie)
  refresh(@Cookies('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Return logged user data',
  })
  @HttpCode(HttpStatus.OK)
  @Get('loggedUser')
  getLoggedUser(@CurrentUser() user: CurrentUserType) {
    return this.authService.getLoggedUser(user.id);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Logout from the system',
  })
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  @UseInterceptors(ClearAuthCookie)
  logout() {
    return { message: 'logged Out' };
  }
}
