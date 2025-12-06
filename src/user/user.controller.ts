import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginateDto } from '../common/utils/paginate';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(@Query() paginate: PaginateDto) {
    return this.userService.findAll(paginate);
  }

  @Get(':userId')
  findOne(@Param('userId', new ParseUUIDPipe()) userId: string) {
    return this.userService.findOne(userId);
  }

  @Patch(':userId')
  update(
    @Param('userId', new ParseUUIDPipe()) userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(userId, updateUserDto);
  }

  @Delete(':userId')
  remove(@Param('userId', new ParseUUIDPipe()) userId: string) {
    return this.userService.remove(userId);
  }
}
