import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { CurrentUserType } from '../common/types/types';
import { PaginateDto } from '../common/utils/paginate';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ProjectRoleGuard } from '../common/guards/project.role.guard';
import { ProjectRoles } from '../common/decorators/project.role.decorator';
import { Roles } from '../common/decorators/role.decorator';

@ApiBearerAuth()
@Controller('project')
@Roles('User')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiOperation({
    summary: 'Create new project',
  })
  @Post()
  create(
    @Body() createProjectDto: CreateProjectDto,
    @CurrentUser() user: CurrentUserType,
  ) {
    return this.projectService.create(createProjectDto, user);
  }

  @ApiOperation({
    summary: 'Return all projects',
  })
  @Get()
  findAll(paginate: PaginateDto) {
    return this.projectService.findAll(paginate);
  }

  @Get('my-projects')
  getAllUserProjects(@CurrentUser() user: CurrentUserType) {
    return this.projectService.getAllUserProjects(user);
  }

  @ApiOperation({
    summary: 'Update project data',
  })
  @Patch(':projectId')
  @UseGuards(ProjectRoleGuard)
  @ProjectRoles('Admin')
  update(
    @Param('projectId', new ParseUUIDPipe()) projectId: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @CurrentUser() user: CurrentUserType,
  ) {
    return this.projectService.update(projectId, updateProjectDto, user);
  }
}
