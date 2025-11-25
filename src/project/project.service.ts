import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from '../common/prisma/prisma.service';
import { Prisma, ProjectRole } from '@prisma/client';
import { CurrentUserType } from '../common/types/types';
import paginateData, { PaginateDto } from '../common/utils/paginate';

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createProjectDto: CreateProjectDto, user: CurrentUserType) {
    await this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const project = await tx.project.create({
        data: { ...createProjectDto, createdBy: user.id, updatedBy: user.id },
      });

      await tx.projectMember.create({
        data: {
          userId: user.id,
          projectId: project.id,
          role: ProjectRole.Admin,
          createdBy: user.id,
          updatedBy: user.id,
        },
      });
    });
  }

  async findAll(paginate: PaginateDto) {
    const pagination = paginateData(paginate);
    const [data, count] = await Promise.all([
      this.prisma.project.findMany({ ...pagination }),
      this.prisma.project.count(),
    ]);
    return { data, count };
  }

  findOne(id: string) {
    return `This action returns a #${id} project`;
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
    user: CurrentUserType,
  ) {
    await this.prisma.project.update({
      where: { id },
      data: { ...updateProjectDto, updatedBy: user.id },
    });
  }

  remove(id: string) {
    return `This action removes a #${id} project`;
  }
}
