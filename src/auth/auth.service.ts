import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { UserRole } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signup(signUpDto: SignUpDto) {
    const { email, password, ...rest } = signUpDto;
    const emailInUse = await this.prisma.user.findUnique({ where: { email } });
    if (emailInUse) {
      throw new BadRequestException('Email already in use');
    }
    const hashedPassword: string = await bcrypt.hash(password, 10);

    await this.prisma.user.create({
      data: { ...rest, email, password: hashedPassword },
    });
  }
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordMatching = await bcrypt.compare(password, user.password);

    if (!isPasswordMatching)
      throw new UnauthorizedException('Invalid credentials');
    return this.generateUserToken(user.id, user.userRole);
  }
  private generateUserToken(userId: string, role: UserRole) {
    const accessToken = this.jwtService.sign({ userId, role });
    const refreshToken = this.jwtService.sign(
      { userId, role },
      { expiresIn: '7d' },
    );

    return {
      accessToken,
      refreshToken,
    };
  }
  //   async refreshToken(token: string) {}
}
