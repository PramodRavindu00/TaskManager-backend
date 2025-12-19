import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { SetAuthCookie } from '../common/interceptors/set-auth-cookie.interceptor';
import { Cookies } from '../common/decorators/cookies.decorator';
import { AuthGuard } from '../common/guards/auth.guard';
import type { CurrentUserType } from '../common/types/types';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ClearAuthCookie } from '../common/interceptors/clear-auth-cookie.interceptor';
import { Public } from '../common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  @Public()
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signup(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Public()
  @UseInterceptors(SetAuthCookie) //using refresh token cookie creating interceptors
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('refresh')
  @Public()
  @UseInterceptors(SetAuthCookie)
  refresh(@Cookies('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }

  @HttpCode(HttpStatus.OK)
  @Get('loggedUser')
  @UseGuards(AuthGuard)
  getLoggedUser(@CurrentUser() user: CurrentUserType) {
    return this.authService.getLoggedUser(user.id);
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  @UseGuards(AuthGuard)
  @UseInterceptors(ClearAuthCookie)
  logout() {
    return { message: 'logged Out' };
  }
}
