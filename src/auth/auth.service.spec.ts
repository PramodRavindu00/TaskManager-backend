import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../common/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');
const bcryptMock = bcrypt as jest.Mocked<typeof bcrypt>;
const prismaMock = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
};
const jwtMock = {
  sign: jest.fn(),
  verify: jest.fn(),
};
describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: prismaMock },
        { provide: JwtService, useValue: jwtMock },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  describe('Sign Up', () => {
    it('throws error if email already in use', async () => {
      prismaMock.user.findUnique.mockResolvedValue({ id: 1 });
      const dto: SignUpDto = {
        email: 'test@gmail.com',
        password: '123456',
        firstName: 'jhon',
        lastName: 'doe',
      };
      await expect(service.signup(dto)).rejects.toThrow(BadRequestException);
    });

    it('creates user with hashed password', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);
      bcryptMock.hash.mockResolvedValue('hashed-password' as never);
      const dto: SignUpDto = {
        email: 'test@gmail.com',
        password: '123456',
        firstName: 'jhon',
        lastName: 'doe',
      };
      await service.signup(dto);

      expect(bcryptMock.hash).toHaveBeenCalledWith('123456', 10);
      expect(prismaMock.user.create).toHaveBeenLastCalledWith({
        data: expect.objectContaining({
          email: 'test@gmail.com',
          password: 'hashed-password',
        }) as unknown,
      });
    });
  });

  describe('Login', () => {
    const dto: LoginDto = {
      email: 'test@gmail.com',
      password: '123456',
    };

    it('should throw error for invalid email', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);
      await expect(service.login(dto)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw error for invalid password', async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        id: 1,
        password: 'hashedPassword',
      });

      bcryptMock.compare.mockResolvedValue(false as never);

      await expect(service.login(dto)).rejects.toThrow(UnauthorizedException);
      expect(bcryptMock.compare).toHaveBeenCalledWith(
        dto.password,
        'hashedPassword',
      );
    });

    it('should return access token and refresh token in successful login', async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        id: 1,
        password: 'hashedPassword',
      });

      bcryptMock.compare.mockResolvedValue(true as never);
      jwtMock.sign
        .mockReturnValueOnce('access-token')
        .mockReturnValueOnce('refresh-token');

      const result = await service.login(dto);
      expect(result).toEqual({
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
      });
      expect(bcryptMock.compare).toHaveBeenCalledWith(
        dto.password,
        'hashedPassword',
      );
    });
  });
});
