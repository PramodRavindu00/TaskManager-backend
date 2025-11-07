import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { AuthCookieInterceptor } from '../common/interceptors/auth-cookie.interceptor';
import { Cookies } from '../common/decorators/cookies';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signup(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UseInterceptors(AuthCookieInterceptor) //using refresh token cookie creating interceptors
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('refresh')
  @UseInterceptors(AuthCookieInterceptor)
  refresh(@Cookies('refreshToken') refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token provided');
    }
    return this.authService.refreshToken(refreshToken);
  }
}
