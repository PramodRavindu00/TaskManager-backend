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
import { AuthGuard } from '../common/guards/auth.guard';
import { PaginateDto } from '../common/utils/paginate';

@Controller('project')
@UseGuards(AuthGuard)
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
