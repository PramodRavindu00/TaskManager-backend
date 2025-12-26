import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../common/prisma/prisma.service';
import paginateData, { PaginateDto } from '../common/utils/paginate';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(paginate: PaginateDto) {
    const pagination = paginateData(paginate);
    const [data, count] = await Promise.all([
      this.prisma.user.findMany({ ...pagination, omit: { password: true } }),
      this.prisma.user.count(),
    ]);
    return { data: plainToInstance(UserResponseDto, data), count };
  }

  async findOne(id: string) {
    const data = await this.prisma.user.findUniqueOrThrow({
      where: { id },
      omit: { password: true },
    });
    return plainToInstance(UserResponseDto, data);
  }

  async update(id: string, dto: UpdateUserDto) {
    await this.prisma.user.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
