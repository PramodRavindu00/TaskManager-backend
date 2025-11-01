import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../common/prisma/prisma.service';
import paginateData, { PaginateDto } from '../common/utils/paginate';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    await this.prisma.user.create({
      data: dto,
    });
  }

  async findAll(paginate: PaginateDto) {
    const pagination = paginateData(paginate);
    const [data, count] = await Promise.all([
      this.prisma.user.findMany({ ...pagination }),
      this.prisma.user.count(),
    ]);
    return { data, count };
  }

  async findOne(id: string) {
    return await this.prisma.user.findUniqueOrThrow({
      where: { id },
    });
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
