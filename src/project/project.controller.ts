import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { CurrentUserType } from '../common/types/types';
import { PaginateDto } from '../common/utils/paginate';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ProjectRoleGuard } from '../common/guards/project.role.guard';
import { ProjectRoles } from '../common/decorators/project.role.decorator';

@ApiBearerAuth()
@UseGuards(ProjectRoleGuard)
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  create(
    @Body() createProjectDto: CreateProjectDto,
    @CurrentUser() user: CurrentUserType,
  ) {
    return this.projectService.create(createProjectDto, user);
  }

  @Get()
  findAll(paginate: PaginateDto) {
    return this.projectService.findAll(paginate);
  }

  @Get(':projectId')
  findOne(@Param('projectId', new ParseUUIDPipe()) projectId: string) {
    return this.projectService.findOne(projectId);
  }

  @Patch(':projectId')
  @ProjectRoles('Admin')
  update(
    @Param('projectId', new ParseUUIDPipe()) projectId: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @CurrentUser() user: CurrentUserType,
  ) {
    return this.projectService.update(projectId, updateProjectDto, user);
  }

  @Delete(':projectId')
  remove(@Param('projectId', new ParseUUIDPipe()) projectId: string) {
    return this.projectService.remove(projectId);
  }
}
